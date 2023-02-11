const {
  findTeacherEnrolledCourse,
  registerTeacherEnrolledCourse,
  findTeacherEnrolledCourses,
} = require("../../models/teacher-enrolled-course/teacher-enrolled-course.model");
const { findCourse } = require("../../models/course/course.model");
const { findSession } = require("../../models/session/session.model");

async function httpPostEnrollCourse(req, res) {
  const { courseCode, session } = req.body;
  const { versityId, teacherId } = req.user;

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
        .json({ error: "Unable to enroll course", message: "Invalid course!" });
    }

    const sessionData = await findSession({ session, versityId });
    if (!sessionData) {
      return res.status(400).json({
        error: "Unable to enroll course",
        message: "Invalid session!",
      });
    }

    const courseAlreadyEnrolled = await findTeacherEnrolledCourse({
      courseId: courseData._id,
      sessionId: sessionData._id,
      teacherId,
      versityId,
    });
    if (courseAlreadyEnrolled) {
      return res.status(400).json({
        error: "Unable to enroll course",
        message: "Already enrolled!",
      });
    }

    const response = await registerTeacherEnrolledCourse({
      courseId: courseData._id,
      sessionId: sessionData._id,
      teacherId,
      versityId,
    });

    if (response.ok === 1) {
      return res.status(200).json({
        data: { courseCode, session },
        message: "Successfully enrolled!",
      });
    }
  } catch (err) {
    console.error(err);
    return res.res(400).json({
      error: "Unable to enroll course",
      message: "something went wrong!",
    });
  }
}

async function httpGetEnrollCourse(req, res) {
  const { versityId, teacherId } = req.user;

  try {
    const enrolledCourses = await findTeacherEnrolledCourses({
      versityId,
      teacherId,
    });

    if (!enrolledCourses) {
      return res.status(404).json({
        error: "Unable to get enrolled course data",
        message: "not found!",
      });
    }

    return res.status(200).json({
      data: enrolledCourses,
      message: "Found enrolled course data",
    });
  } catch (err) {
    console.error(err);
    return res.res(400).json({
      error: "Unable to get enrolled course data",
      message: "something went wrong!",
    });
  }
}

module.exports = {
  httpPostEnrollCourse,
  httpGetEnrollCourse,
};
