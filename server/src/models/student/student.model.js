const studentsDatabase = require("../mongo-db/students.mongo");

async function findStudent(filterQueryObj) {
  return await studentsDatabase.findOne(filterQueryObj);
}

async function getAllStudentsData(filterQueryObj) {
  return await studentsDatabase
    .find(filterQueryObj, {
      versityId: 0,
      _id: 0,
      __v: 0,
    })
    .populate({
      path: "userId",
      select: "name email gender -_id",
    })
    .populate({
      path: "departmentId",
      select: "departmentName departmentCode -_id",
    })
    .populate({
      path: "semesterIds",
      select: "semesterNumber -_id",
    })
    .populate({
      path: "currentSemesterId",
      select: "semesterNumber -_id",
    })
    .populate({
      path: "sessionId",
      select: "session -_id",
    })
    .exec();
}

async function getStudnetData(filterQueryObj) {
  return await studentsDatabase
    .findOne(filterQueryObj, {
      userId: 0,
      _id: 0,
      __v: 0,
    })
    .populate({
      path: "semesterIds",
      select: "semesterNumber -_id",
    })
    .populate({
      path: "sessionId",
      select: "session -_id",
    })
    .populate({
      path: "departmentId",
      select: "departmentName departmentCode -_id",
    })
    .populate({
      path: "versityId",
      select: "versityName versityWebsite",
    })
    .populate({
      path: "currentSemesterId",
      select: "semesterNumber -_id",
    })
    .exec();
}

async function registerStudent(studentData) {
  try {
    const student = await studentsDatabase.create(studentData);
    return {
      ok: 1,
      student,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  registerStudent,
  findStudent,
  getStudnetData,
  getAllStudentsData,
};
