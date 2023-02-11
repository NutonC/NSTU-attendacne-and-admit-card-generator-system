const semestersDatabase = require("../mongo-db/semesters.mongo");

const { versityExistsWithId } = require("../versity/versity.model");

async function registerSemester(semesterData) {
  const { versityId, semesterNumber } = semesterData;
  try {
    const versityExists = await versityExistsWithId(versityId);
    if (!versityExists) {
      throw new Error("Unauthorized Versity");
    }

    const semesterExists = await findSemester({
      semesterNumber,
      versityId,
    });
    if (semesterExists) {
      throw new Error("Semester already exists!");
    }

    await semestersDatabase.create({ ...semesterData, createdAt: new Date() });
    return {
      ok: 1,
      semester: semesterData,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function findSemesters(filterQueryObj) {
  return await semestersDatabase
    .find(filterQueryObj, {
      versityId: 0,
      _id: 0,
      __v: 0,
    })
    .sort({ createdAt: -1 }); //DESC order;
}

async function findSemester(filterQueryObj) {
  return await semestersDatabase.findOne(filterQueryObj);
}

async function semesterExistsWithId(semesterId) {
  try {
    return await semestersDatabase.findById(semesterId);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  registerSemester,
  findSemester,
  findSemesters,
  semesterExistsWithId,
};
