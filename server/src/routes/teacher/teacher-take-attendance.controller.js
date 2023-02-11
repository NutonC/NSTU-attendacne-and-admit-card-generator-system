const { findCourse } = require("../../models/course/course.model");
const { findSession } = require("../../models/session/session.model");
const { findUser } = require("../../models/user/user.model");
const {
  findStudent,
  getAllStudentsData,
} = require("../../models/student/student.model");
const {
  findAttendances,
  registerAttendance,
} = require("../../models/student-attendance/student-attendance.model");
const {
  registerCourseClass,
} = require("../../models/course-class/course-class.model");

async function httpGetAttendanceByCourseAndSession(req, res) {
  const { courseCode, session, createdAt } = req.query;
  const { versityId } = req.user;

  if (!courseCode || !session) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const today = new Date().toISOString().split("T")[0];
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

    let response,
      exist = true;

    response = await findAttendances({
      courseId: courseData._id,
      sessionId: sessionData._id,
      createdAt: createdAt || today,
    });

    if (!response || response.length < 1) {
      exist = false;
      response = await getAllStudentsData({
        sessionId: sessionData._id,
        currentSemesterId: courseData.semesterId,
        departmentId: courseData.departmentId,
        versityId,
      });
    }

    return res.status(200).json({
      data: {
        response,
        exist,
        createdAt: createdAt || today,
      },
      message: "Found data",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: "No attendance data found",
      message: "Something went wrong",
    });
  }
}

async function httpPostTakeStudentsAttendance(req, res) {
  const { courseCode, session, attendanceData, createdAt } = req.body;
  const { teacherId, versityId } = req.user;

  if (!courseCode || !session || !attendanceData) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const today = new Date().toISOString().split("T")[0];
    const course = await findCourse({ courseCode });
    if (!course) {
      return res.status(404).json({
        error: "Unable to take attendance",
        message: "Invalid course",
      });
    }

    const sessionData = await findSession({ session });
    if (!sessionData) {
      return res.status(404).json({
        error: "Unable to take attendance",
        message: "Invalid session",
      });
    }

    let totalAbsent = 0,
      totalPresent = 0;

    for await (const student of attendanceData) {
      const userId = await findUser({ email: student.email });
      const studentData = await findStudent({ userId: userId._id });

      if (student.status === true) {
        totalPresent += 1;
      } else {
        totalAbsent += 1;
      }

      await registerAttendance({
        courseId: course._id,
        sessionId: sessionData._id,
        studentId: studentData._id,
        semesterId: studentData.currentSemesterId,
        status: student.status,
        createdAt: createdAt || today,
      });
    }

    await registerCourseClass({
      courseId: course._id,
      sessionId: sessionData._id,
      teacherId,
      createdAt: createdAt || today,
      totalAbsent,
      totalPresent,
      versityId,
    });

    return res.status(200).json({
      data: {
        courseCode,
        session,
        attendanceData,
        createdAt: createdAt || today,
      },
      message: `Attendance taken for ${createdAt || today}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: "Unable to take attendance",
      message: "Something went wrong!",
    });
  }
}

module.exports = {
  httpPostTakeStudentsAttendance,
  httpGetAttendanceByCourseAndSession,
};
