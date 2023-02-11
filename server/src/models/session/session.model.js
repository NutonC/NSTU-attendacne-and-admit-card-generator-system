const sessionsDatabase = require("../mongo-db/sessions.mongo");

const { versityExistsWithId } = require("../versity/versity.model");

async function registerSession(sessionData) {
  const { versityId, session } = sessionData;

  try {
    const versityExists = await versityExistsWithId(versityId);
    if (!versityExists) {
      throw new Error("Unauthorized Versity");
    }

    const sessionExists = await findSession({ session, versityId });
    if (sessionExists) {
      throw new Error("Session already exists!");
    }

    await sessionsDatabase.create({ ...sessionData, createdAt: new Date() });

    return {
      ok: 1,
      session: sessionData,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function findSessions(filterQueryObj) {
  return await sessionsDatabase
    .find(filterQueryObj, {
      versityId: 0,
      _id: 0,
      __v: 0,
    })
    .sort({ createdAt: -1 }); //DESC order;
}

async function findSession(filterQueryObj) {
  return await sessionsDatabase.findOne(filterQueryObj);
}

async function sessionExistsWithId(sessionId) {
  try {
    return await sessionsDatabase.findById({ _id: sessionId });
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  registerSession,
  findSession,
  findSessions,
  sessionExistsWithId,
};
