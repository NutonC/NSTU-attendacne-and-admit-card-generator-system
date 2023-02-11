const teachersDatabase = require("../mongo-db/teachers.mongo");

async function findTeacher(filterQueryObj) {
  return await teachersDatabase.findOne(filterQueryObj);
}

async function registerTeacher(teacherData) {
  try {
    const teacher = await teachersDatabase.create(teacherData);
    return {
      ok: 1,
      teacher,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function teacherExistsWithId(teacherId) {
  try {
    return await teachersDatabase.findById(teacherId);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  registerTeacher,
  findTeacher,
  teacherExistsWithId,
};
