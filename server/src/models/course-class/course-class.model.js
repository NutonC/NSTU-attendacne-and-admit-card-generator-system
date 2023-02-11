const courseClassesDatabase = require("../mongo-db/course-classes.mongo");

async function findCourseClass(filterQueryObj) {
  return await courseClassesDatabase.findOne(filterQueryObj);
}

async function findCourseClasses(filterQueryObj) {
  return await courseClassesDatabase
    .find(filterQueryObj, {
      __v: 0,
      _id: 0,
      versityId: 0,
    })
    .populate({
      path: "courseId",
      select: "courseCode courseName courseCredit -_id",
    })
    .populate({
      path: "sessionId",
      select: "session -_id",
    })
    .populate({
      path: "teacherId",
      select: "-versityId -_id -__v",
      populate: [
        {
          path: "userId",
          select: "name email -_id",
        },
        {
          path: "departmentId",
          select: "departmentName departmentCode -_id",
        },
      ],
    })
    .sort({ createdAt: -1 })
    .exec();
}

async function registerCourseClass(courseClassData) {
  return await courseClassesDatabase.updateOne(
    {
      createdAt: courseClassData.createdAt,
      courseId: courseClassData.courseId,
      sessionId: courseClassData.sessionId,
      teacherId: courseClassData.teacherId,
    },
    courseClassData,
    {
      upsert: true,
    }
  );
}

module.exports = {
  findCourseClass,
  findCourseClasses,
  registerCourseClass,
};
