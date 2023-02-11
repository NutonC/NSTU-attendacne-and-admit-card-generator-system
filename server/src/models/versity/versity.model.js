const versitiesDatabase = require("../mongo-db/versities.mongo");

async function registerVersity(versityData) {
  try {
    const newVersitySerial = (await getLatestVersitySerialNumber()) + 1;

    await versitiesDatabase.create({
      ...versityData,
      versitySerial: newVersitySerial,
    });

    return {
      versity: versityData,
      ok: 1,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function findVersity(filterQueryObj) {
  return await versitiesDatabase.findOne(filterQueryObj);
}

async function versityExistsWithId(versityId) {
  try {
    return await versitiesDatabase.findById(versityId);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getLatestVersitySerialNumber() {
  const latestVersityNumber = await versitiesDatabase
    .findOne()
    .sort("-versityNumber"); //sort is built in function of mongo, to sort in desending order '-' is added infront of property

  const DEFAULT_VERSITY_NUMBER = 0;
  if (!latestVersityNumber || latestVersityNumber.versitySerial === NaN)
    return DEFAULT_VERSITY_NUMBER;

  return latestVersityNumber.versitySerial;
}

module.exports = {
  registerVersity,
  versityExistsWithId,
  findVersity,
};
