const managementsDatabase = require("../mongo-db/managements.mongo");

async function registerManagement(managementData) {
  try {
    await managementsDatabase.create({
      ...managementData,
    });

    return {
      ok: 1,
      managementData,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function findManagements(filterQueryObj) {
  return await managementsDatabase
    .find(filterQueryObj)
    .sort({ createdAt: -1 }) //DESC order
    .exec();
}

async function findManagement(filterQueryObj) {
  return await managementsDatabase
    .findOne(filterQueryObj)
    .sort({ createdAt: -1 }) //DESC order
    .exec();
}

async function updateManagement(queryObj, updateObj) {
  return await managementsDatabase.findOneAndUpdate(queryObj, updateObj);
}

module.exports = {
  registerManagement,
  findManagement,
  findManagements,
  updateManagement,
};
