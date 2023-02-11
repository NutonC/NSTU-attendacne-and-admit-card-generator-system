const { randomBytes } = require("crypto");
const registrationTokensDatabase = require("../mongo-db/registration-tokens.mongo");
const { convertDateToISOstring } = require("../../utils/date.util");

async function createRandomToken() {
  //using recursion
  const token = randomBytes(2).toString("hex");
  const foundToken = await findRegistrationToken({ tokenCode: token });
  if (!foundToken) {
    return token;
  }
  return createRandomToken();
}

async function createRegistrationToken(tokenData) {
  try {
    const token = await createRandomToken();

    const tokenCreated = await registrationTokensDatabase.create({
      tokenCode: token,
      ...tokenData,
    });

    return {
      ok: 1,
      tokenData: tokenCreated,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function findRegistrationToken(filterQueryObj) {
  return await registrationTokensDatabase.findOne(filterQueryObj);
}

async function findRegistrationTokens(filterQueryObj) {
  return await registrationTokensDatabase
    .find(filterQueryObj, {
      versityId: 0,
      _id: 0,
      __v: 0,
      managementId: 0,
    })
    .populate({
      path: "departmentId",
      select: "departmentCode -_id",
    })
    .populate({
      path: "semesterId",
      select: "semesterNumber -_id",
    })
    .populate({
      path: "sessionId",
      select: "session -_id",
    })
    .sort({ createdAt: -1 })
    .exec();
}

async function findRegestrationTokenWithId(tokenId) {
  return await registrationTokensDatabase.findById(tokenId);
}

async function deleteRegistrationToken(filterQueryObj) {
  return await registrationTokensDatabase.findOneAndDelete(filterQueryObj);
}

async function updateRegistrationToken(filterQueryObj, updateObj) {
  return await registrationTokensDatabase.findOneAndUpdate(
    filterQueryObj,
    updateObj
  );
}

function calculateTokenExpiration(expiryDate) {
  const today = new Date();
  const todayISO = convertDateToISOstring(today);
  const expirationISO = convertDateToISOstring(expiryDate);

  return expirationISO === todayISO;
}

async function isManagementTokenExists(
  tokenType,
  departmentId,
  semesterId,
  sessionId
) {
  let tokenExists;
  if (tokenType === "teacher") {
    tokenExists = await findRegistrationToken({ tokenType, departmentId });
  } else {
    tokenExists = await findRegistrationToken({
      tokenType,
      departmentId,
      semesterId,
      sessionId,
    });
  }

  if (tokenExists?.expiredAt) {
    const isTokenExpired = calculateTokenExpiration(tokenExists.expiredAt);
    if (!isTokenExpired) {
      throw new Error("Previous token is not expired");
    }
  }

  return false;
}

async function findValidRegestrationToken(tokenCode) {
  try {
    const result = await findRegistrationToken({ tokenCode: tokenCode });
    if (!result) {
      throw new Error("Invalid token");
    }

    if (result?.tokenUseLeft < 1) {
      throw new Error("Token Expired");
    }

    if (result?.expiredAt) {
      const isTokenExpired = calculateTokenExpiration(result.expiredAt);

      if (isTokenExpired) {
        await deleteRegistrationToken({ _id: result._id, tokenCode });
        throw new Error("Token Expired");
      }
    }

    return {
      ok: 1,
      tokenValid: true,
      tokenData: result,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  createRegistrationToken,
  findRegistrationToken,
  findRegistrationTokens,
  updateRegistrationToken,
  deleteRegistrationToken,
  findValidRegestrationToken,
  findRegestrationTokenWithId,
  isManagementTokenExists,
};
