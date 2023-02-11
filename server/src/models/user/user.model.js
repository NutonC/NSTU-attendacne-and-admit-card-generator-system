const mongoose = require("mongoose");
const usersDatabase = require("../mongo-db/users.mongo");
const hashesDatabase = require("../mongo-db/hashes.mongo");

async function registerUser(userData) {
  const { name, email, phone, gender, role, password } = userData;

  const userExists = await findUser({ email });
  if (userExists) {
    throw new Error("User already exists!");
  }

  const joined = new Date();

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();
  try {
    const opts = { session: mongoSession, new: true };
    const user = await usersDatabase.create(
      [{ name, email, phone, gender, role, joined }],
      opts
    );
    await hashesDatabase.create(
      [{ hash: password, userId: user[0]._id }],
      opts
    );

    await mongoSession.commitTransaction();
    return {
      ok: 1,
      user: user[0],
    };
  } catch (err) {
    await mongoSession.abortTransaction();
    throw new Error(err.message);
  } finally {
    mongoSession.endSession();
  }
}

async function findUsers(filterQueryObj) {
  return await usersDatabase.find(filterQueryObj);
}

async function findUser(filterQueryObj) {
  return await usersDatabase.findOne(filterQueryObj);
}

async function userExistsWithId(userId) {
  try {
    return await usersDatabase.findById(userId);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  registerUser,
  findUser,
  findUsers,
  userExistsWithId,
};
