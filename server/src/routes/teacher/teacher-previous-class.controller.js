const { findCourse } = require("../../models/course/course.model");
const { findSession } = require("../../models/session/session.model");
const {
  findCourseClasses,
} = require("../../models/course-class/course-class.model");

async function httpGetPreviousCourseClasses(req, res) {
  const { courseCode, session } = req.query;
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

    const response = await findCourseClasses({
      courseId: courseData._id,
      sessionId: sessionData._id,
      teacherId,
      versityId,
    });

    return res.status(200).json({
      data: response,
      message: "Found Classes data",
    });
  } catch (err) {
    console.error(err);
    return res.res(400).json({
      error: "Unable to get course classes",
      message: "something went wrong!",
    });
  }
}

module.exports = {
  httpGetPreviousCourseClasses,
};
