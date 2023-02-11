const { userExistsWithId } = require("../../models/user/user.model");
const {
  findManagement,
  updateManagement,
} = require("../../models/management/management.model");
const {
  findDepartment,
  departmentExistsWithId,
} = require("../../models/department/department.model");
const {
  findSemester,
  semesterExistsWithId,
} = require("../../models/semester/semester.model");
const {
  findSession,
  sessionExistsWithId,
} = require("../../models/session/session.model");
const {
  findVersity,
  versityExistsWithId,
} = require("../../models/versity/versity.model");
const {
  findRegistrationToken,
  createRegistrationToken,
  findValidRegestrationToken,
  findRegistrationTokens,
  isManagementTokenExists,
} = require("../../models/registration-token/registration-token.model");
const { getNextDateISOstring } = require("../../utils/date.util");

async function httpPostCreateToken(req, res) {
  const { tokenType, departmentCode } = req.body;
  const { userId } = req.user;

  if (!tokenType) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  const allowedTokenTypes = ["management", "teacher", "student"];
  if (!allowedTokenTypes.includes(tokenType)) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Invalid token type!" });
  }

  try {
    const user = await userExistsWithId(userId);
    if (!user) {
      return res.status(400).json({
        error: "Registration Token creation failed!",
        message: "Invalid user!",
      });
    }

    if (tokenType === "management") {
      const versity = await findVersity({ userId });

      const managementTokenExistsWithVersityId = await findRegistrationToken({
        versityId: versity._id,
        tokenType,
      });

      if (managementTokenExistsWithVersityId) {
        return res.status(400).json({
          error: "Registration Token creation failed!",
          message: "Management token already exists!",
        });
      }

      const versityTokenCreated = await createRegistrationToken({
        versityId: versity._id,
        tokenType,
        tokenUseLeft: 3, //For now limiting to 3
      });

      if (versityTokenCreated.ok === 1) {
        const { tokenCode, tokenType, tokenUseLeft } =
          versityTokenCreated.tokenData;

        return res.status(200).json({
          message: "Success creating Registration token",
          data: {
            tokenCode,
            tokenType,
            tokenUseLeft,
          },
        });
      }
    }

    let result;

    const management = await findManagement({ userId });
    const department = await findDepartment({
      departmentCode,
      versityId: management.versityId,
    });

    // const { hallId } = await findHall({
    //   hallName,
    //   versityId: management.versityId,
    // });

    const { fromDayISO, nextDayISO } = getNextDateISOstring(new Date(), 10); //For now expiration set to 10

    if (tokenType === "teacher") {
      const isTokenExists = await isManagementTokenExists(
        tokenType,
        department._id
      );
      if (!isTokenExists) {
        result = await createRegistrationToken({
          versityId: management.versityId,
          managementId: management._id,
          departmentId: department._id,
          tokenType,
          createdAt: fromDayISO,
          expiredAt: nextDayISO,
        });
      }
    }

    if (tokenType === "student") {
      const { semesterNumber, session } = req.body;
      const semesterData = await findSemester({
        semesterNumber,
        versityId: management.versityId,
      });
      const sessionData = await findSession({
        session,
        versityId: management.versityId,
      });

      const isTokenExists = await isManagementTokenExists(
        tokenType,
        department._id,
        semesterData._id,
        sessionData._id
      );
      if (!isTokenExists) {
        result = await createRegistrationToken({
          versityId: management.versityId,
          managementId: management._id,
          departmentId: department._id,
          tokenType,
          semesterId: semesterData._id,
          sessionId: sessionData._id,
          createdAt: fromDayISO,
          expiredAt: nextDayISO,
        });
      }
    }

    if (result.ok === 1) {
      const { tokenCode, tokenType, createdAt, expiredAt } = result.tokenData;

      if (tokenType === "student" || tokenType === "management") {
        await updateManagement(
          {
            _id: management._id,
          },
          {
            $push: { generatedTokenIds: result.tokenData._id },
          }
        );
      }

      return res.status(200).json({
        message: "Success creating Registration token",
        data: {
          tokenCode,
          tokenType,
          createdAt,
          expiredAt,
        },
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: "Registration Token creation failed!",
      message: err.message,
    });
  }
}

async function httpGetToken(req, res) {
  const { tokencode } = req.params;

  try {
    const result = await findValidRegestrationToken(tokencode);

    if (!result.tokenValid) {
      return res
        .status(400)
        .json({ error: "Invalid Token", message: "Token Expired" });
    }

    const { tokenType, tokenCode, versityId } = result.tokenData;
    const versityData = await versityExistsWithId(versityId);
    const { versityName } = versityData;

    let data;

    if (tokenType === "management") {
      const { tokenUseLeft } = result.tokenData;
      data = {
        tokenType,
        tokenCode,
        tokenUseLeft,
        versityName,
      };
    } else {
      const { tokenCreated, tokenExpiration, departmentId } = result.tokenData;

      const departmentData = await departmentExistsWithId(departmentId);
      const { departmentCode, departmentName } = departmentData;

      if (tokenType === "teacher") {
        data = {
          tokenType,
          tokenCode,
          tokenCreated,
          tokenExpiration,
          versityName,
          departmentCode,
          departmentName,
        };
      }

      if (tokenType === "student") {
        const { semesterId, sessionId } = result.tokenData;
        const semesterData = await semesterExistsWithId(semesterId);
        const { semesterNumber } = semesterData;
        const sessionData = await sessionExistsWithId(sessionId);
        const { session } = sessionData;

        data = {
          tokenType,
          tokenCode,
          tokenCreated,
          tokenExpiration,
          versityName,
          departmentCode,
          departmentName,
          semesterNumber,
          session,
        };
      }
    }

    return res.status(200).json({ data: data, message: "Token found!" });
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .json({ error: "Token not found", message: "Invalid token" });
  }
}

async function httpGetManagementTokens(req, res) {
  const { versityId, managementId } = req.user;
  const { tokenType } = req.query;

  try {
    let tokens;
    if (tokenType) {
      tokens = await findRegistrationTokens({
        managementId,
        versityId,
        tokenType,
      });
    } else {
      tokens = await findRegistrationTokens({ managementId, versityId });
    }

    if (!tokens) {
      return res
        .status(404)
        .json({ error: "Token not found", message: "Invalid token" });
    }

    return res.status(200).json({
      data: tokens,
      message: "Management tokens found!",
    });
  } catch {
    console.error(err);
    return res
      .status(404)
      .json({ error: "Token not found", message: "Invalid token" });
  }
}

module.exports = {
  httpPostCreateToken,
  httpGetToken,
  httpGetManagementTokens,
};
