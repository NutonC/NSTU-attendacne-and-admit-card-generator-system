const { registerUser, findUser } = require("../../models/user/user.model");
const {
  registerManagement,
} = require("../../models/management/management.model");
const { registerTeacher } = require("../../models/teacher/teacher.model");
const { registerStudent } = require("../../models/student/student.model");
const {
  registerVersity,
  findVersity,
} = require("../../models/versity/versity.model");
const {
  departmentExistsWithId,
} = require("../../models/department/department.model");
const {
  semesterExistsWithId,
} = require("../../models/semester/semester.model");
const { sessionExistsWithId } = require("../../models/session/session.model");
const { hallExistsWithId } = require("../../models/hall/hall.model");
const {
  updateRegistrationToken,
  findValidRegestrationToken,
} = require("../../models/registration-token/registration-token.model");
const {
  findSubscriptionPackage,
} = require("../../models/subscription-package/subscription-package.model");
const {
  createSubscription,
} = require("../../models/subscription/subscription.model");

const { generateHash } = require("../../libs/hash.lib");
const { createAccessToken } = require("../../libs/jwt.lib");
const {
  convertDateToISOstring,
  getNextDateISOstring,
} = require("../../utils/date.util");

const CONFIG = require("../../config");

async function httpPostRegisterVersity(req, res) {
  const {
    versityName,
    versityWebsite,
    packageName,
    customerId,
    subscriptionId,
  } = req.body;

  if (
    !versityName ||
    !versityWebsite ||
    !packageName ||
    !customerId ||
    !subscriptionId
  ) {
    return res
      .status(400)
      .json({ error: "Wrong credentials!", message: "Fields can't be empty!" });
  }

  try {
    const subscriptionPackage = await findSubscriptionPackage({ packageName });

    if (!subscriptionPackage) {
      return res.status(400).json({
        error: "University Registration failed!",
        message: "Invalid package",
      });
    }

    if (versityWebsite !== "undefined") {
      const versityExists = await findVersity({ versityWebsite });
      if (versityExists) {
        return res.status(400).json({
          error: "University Registration failed!",
          message: "Versity already exists!",
        });
      }
    }

    const userExists = await findUser({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        error: "University Registration failed!",
        message: "User already exists",
      });
    }

    const { fromDayISO, nextDayISO } = getNextDateISOstring(
      new Date(),
      subscriptionPackage.packageDurationInDays
    );

    const success = await registerWithHandler(
      req,
      res,
      registerVersity,
      {
        versityName,
        versityWebsite,
        subscriptionPackageId: subscriptionPackage._id,
        subscriptionPackageEnrolled: fromDayISO,
        subscriptionPackageExpiry: nextDayISO,
      },
      Number(CONFIG.user_roles.versity)
    );

    if (success.ok === 1) {
      await createSubscription({
        userId: success.userId,
        customerId,
        subscriptionId,
      });

      res.clearCookie("tax");
      res.clearCookie("customer");

      return res.status(200).json({
        data: success.token,
        message: "Successfully Registered",
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "University Registration failed!", message: err.message });
  }
}

async function httpPostRegisterTeacher(req, res) {
  const { tokenCode } = req.body;

  if (!tokenCode) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const userExists = await findUser({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        error: "Teacher Registration failed!",
        message: "User already exists",
      });
    }

    const { tokenData } = await findValidRegestrationToken(tokenCode);
    const { departmentId, versityId } = tokenData;

    const departmentExists = await departmentExistsWithId(departmentId);
    if (!departmentExists) {
      return res.status(400).json({
        error: "Teacher Registration failed!",
        message: "Unauthorized department",
      });
    }

    const success = await registerWithHandler(
      req,
      res,
      registerTeacher,
      {
        departmentId,
        versityId,
      },
      Number(CONFIG.user_roles.teacher)
    );

    if (success.ok === 1) {
      return res.status(200).json({
        data: success.token,
        message: "Successfully Registered",
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "Teacher Registration failed!", message: err.message });
  }
}

async function httpPostRegisterStudent(req, res) {
  const { fathersName, mothersName, dateOfBirth, tokenCode } = req.body;

  if (!fathersName || !mothersName || !dateOfBirth || !tokenCode) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const userExists = await findUser({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        error: "Student Registration failed!",
        message: "User already exists",
      });
    }

    const { tokenData } = await findValidRegestrationToken(tokenCode);
    const { departmentId, semesterId, sessionId, versityId } = tokenData;

    const departmentExists = await departmentExistsWithId(departmentId);
    if (!departmentExists) {
      return res.status(400).json({
        error: "Student Registration failed!",
        message: "Unauthorized department",
      });
    }

    const semesterExists = await semesterExistsWithId(semesterId);
    if (!semesterExists) {
      return res.status(400).json({
        error: "Student Registration failed!",
        message: "Unauthorized semester",
      });
    }

    const sessionExists = await sessionExistsWithId(sessionId);
    if (!sessionExists) {
      return res.status(400).json({
        error: "Student Registration failed!",
        message: "Unauthorized session",
      });
    }

    // if (hallId && hallId !== "undefined") {
    //   const hallExists = await hallExistsWithId();
    //   if (!hallExists) {
    //     return res.status(400).json({
    //       error: "Student Registration failed!",
    //       message: "Unauthorized hall",
    //     });
    //   }
    // }

    const success = await registerWithHandler(
      req,
      res,
      registerStudent,
      {
        fathersName,
        mothersName,
        dateOfBirth,
        versityId,
        departmentId,
        semesterIds: [semesterId],
        currentSemesterId: semesterId,
        sessionId,
      },
      Number(CONFIG.user_roles.student)
    );

    if (success.ok === 1) {
      return res.status(200).json({
        data: success.token,
        message: "Successfully Registered",
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "Student Registration failed!", message: err.message });
  }
}

async function httpPostRegisterManagement(req, res) {
  const { tokenCode } = req.body;

  if (!tokenCode) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const userExists = await findUser({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        error: "Management Registration failed!",
        message: "User already exists",
      });
    }

    const { tokenData } = await findValidRegestrationToken(tokenCode);
    const { versityId } = tokenData;

    const versityExists = await findVersity({ _id: versityId });
    if (!versityExists) {
      return res.status(400).json({
        error: "Management Registration failed!",
        message: "Versity doesn't exists!",
      });
    }

    const success = await registerWithHandler(
      req,
      res,
      registerManagement,
      {
        versityId,
      },
      Number(CONFIG.user_roles.management)
    );

    if (success.ok === 1) {
      await updateRegistrationToken(
        { tokenCode },
        { tokenUseLeft: tokenData.tokenUseLeft - 1 }
      );

      return res.status(200).json({
        data: success.token,
        message: "Successfully Registered",
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "Management Registration failed!", message: err.message });
  }
}

async function registerWithHandler(req, res, model, credentials, role) {
  const { name, email, phone, gender, password } = req.body;

  if (!name || !email || !phone || !gender || !password) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const hash = await generateHash(password);
    const result = await registerUser({
      name,
      email,
      phone,
      gender,
      role,
      password: hash,
    });
    if (result.ok === 1) {
      await model({
        ...credentials,
        userId: result.user._id,
      });

      //todo: SEND REFRESHTOKEN COOKIE

      const token = createAccessToken({
        name: result.user.name,
        uid: result.user._id,
      });

      return {
        ok: 1,
        token: token,
        userId: result.user._id,
      };
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  httpPostRegisterVersity,
  httpPostRegisterStudent,
  httpPostRegisterTeacher,
  httpPostRegisterManagement,
};
