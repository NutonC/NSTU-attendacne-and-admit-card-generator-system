const { getAllStudentsData } = require("../../models/student/student.model");
const { findCourse } = require("../../models/course/course.model");
const { findSession } = require("../../models/session/session.model");
const { findSemester } = require("../../models/semester/semester.model");
const {
  findAttendances,
} = require("../../models/student-attendance/student-attendance.model");

async function httpGetAllStudentAttendanceDataBySemester(req, res) {
  const { semesterNumber } = req.params;
  const { studentId, versityId } = req.user;

  if (!semesterNumber) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const semesterId = await findSemester({ semesterNumber, versityId });
    if (!semesterId) {
      return res
        .status(400)
        .json({
          error: "Unable to get student classes data",
          message: "invalid semester!",
        });
    }

    const studentAttendanceData = await findAttendances({
      studentId,
      semesterId: semesterId._id,
    });

    return res.status(200).json({
      data: studentAttendanceData,
      message: "Classes found!",
    });
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      error: "Unable to get student classes data",
      message: "Something went wrong!",
    });
  }
}

async function httpGetAllStudentByCourse(req, res) {
  //currently not in use
  const { courseCode, session } = req.query;
  const { versityId } = req.user;

  if (!courseCode || !session) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const courseData = await findCourse({ courseCode, versityId });
    if (!courseData) {
      return res
        .status(400)
        .json({ error: "No students found", message: "Invalid course code" });
    }
    const sessionData = await findSession({ session, versityId });
    if (!sessionData) {
      return res
        .status(400)
        .json({ error: "No students found", message: "Invalid session" });
    }

    const studentsData = await getAllStudentsData({
      sessionId: sessionData._id,
      currentSemesterId: courseData.semesterId,
      departmentId: courseData.departmentId,
      versityId,
    });

    return res
      .status(200)
      .json({ data: studentsData, message: "Students found!" });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "No students found", message: "Something went wrong" });
  }
}

module.exports = {
  httpGetAllStudentAttendanceDataBySemester,
  httpGetAllStudentByCourse,
};
