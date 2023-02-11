const studentAttendanceDatabase = require("../mongo-db/student-attendance.mongo");

async function findAttendance(filterQueryObj) {
  return await studentAttendanceDatabase.findOne(filterQueryObj);
}

async function findAttendances(filterQueryObj) {
  return await studentAttendanceDatabase
    .find(filterQueryObj, {
      __v: 0,
      _id: 0,
    })
    .populate({
      path: "courseId",
      select: "courseCode courseName courseCredit -_id",
    })
    .populate({
      path: "semesterId",
      select: "semesterNumber -_id",
    })
    .populate({
      path: "sessionId",
      select: "session -_id",
    })
    .populate({
      path: "studentId",
      select: "-semesterIds -sessionId -versityId -_id -__v",
      populate: [
        {
          path: "userId",
          select: "name email -_id",
        },
        {
          path: "departmentId",
          select: "departmentName departmentCode -_id",
        },
        {
          path: "currentSemesterId",
          select: "semesterNumber -_id",
        },
      ],
    })
    .sort({ createdAt: -1 })
    .exec();
}

async function registerAttendance(attendanceData) {
  try {
    const attendance = await studentAttendanceDatabase.updateOne(
      {
        createdAt: attendanceData.createdAt,
        courseId: attendanceData.courseId,
        sessionId: attendanceData.sessionId,
        studentId: attendanceData.studentId,
      },
      attendanceData,
      {
        upsert: true,
      }
    );

    return {
      ok: 1,
      attendance,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  findAttendance,
  findAttendances,
  registerAttendance,
};
