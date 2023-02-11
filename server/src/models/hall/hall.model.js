const hallsDatabase = require("../mongo-db/halls.mongo");

const { versityExistsWithId } = require("../versity/versity.model");

async function registerHall(hallData) {
  const { versityId, hallCode } = hallData;
  try {
    const versityExists = await versityExistsWithId(versityId);
    if (!versityExists) {
      throw new Error("Unauthorized Versity");
    }

    const hallExists = await findHall({ hallCode, versityId });
    if (hallExists) {
      throw new Error("Hall already exists");
    }

    await hallsDatabase.create({ ...hallData, createdAt: new Date() });
    return {
      ok: 1,
      semester: hallData,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function findHalls(filterQueryObj) {
  return await hallsDatabase
    .find(filterQueryObj, {
      versityId: 0,
      _id: 0,
      __v: 0,
    })
    .sort({ createdAt: -1 }); //DESC order;
}

async function findHall(filterQueryObj) {
  return await hallsDatabase.findOne(filterQueryObj);
}

async function hallExistsWithId(hallId) {
  try {
    return await hallsDatabase.findById(hallId);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  registerHall,
  findHall,
  findHalls,
  hallExistsWithId,
};
