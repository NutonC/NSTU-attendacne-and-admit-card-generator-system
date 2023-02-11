const hashesDatabase = require("../mongo-db/hashes.mongo");

async function findHash(filterQueryObj) {
  return await hashesDatabase.findOne(filterQueryObj);
}

module.exports = {
  findHash,
};
