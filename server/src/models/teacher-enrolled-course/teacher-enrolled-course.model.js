const teacherEnrolledCoursesDatabase = require("../mongo-db/teacher-enrolled-courses.mongo");

async function findTeacherEnrolledCourse(filterQueryObj) {
  return await teacherEnrolledCoursesDatabase.findOne(filterQueryObj);
}

async function findTeacherEnrolledCourses(filterQueryObj) {
  return await teacherEnrolledCoursesDatabase
    .find(filterQueryObj, {
      versityId: 0,
      teacherId: 0,
      _id: 0,
      __v: 0,
    })
    .populate({
      path: "sessionId",
      select: "session -_id",
    })
    .populate({
      path: "courseId",
      select: "courseName courseCode courseCredit -_id",
      populate: [
        {
          path: "departmentId",
          select: "departmentName departmentCode -_id",
        },
        {
          path: "semesterId",
          select: "semesterNumber -_id",
        },
      ],
    })
    .sort({ createdAt: -1 })
    .exec();
}

async function registerTeacherEnrolledCourse(courseData) {
  try {
    const response = await teacherEnrolledCoursesDatabase.create({
      ...courseData,
      createdAt: new Date(),
    });

    return {
      ok: 1,
      teacherEnrolledCourse: response,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  findTeacherEnrolledCourse,
  findTeacherEnrolledCourses,
  registerTeacherEnrolledCourse,
};
