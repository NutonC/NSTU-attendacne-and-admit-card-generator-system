const coursesDatabase = require("../mongo-db/courses.mongo");

async function registerCourse(coursesData) {
  const { courseCode, versityId } = coursesData;
  try {
    const courseExists = await findCourse({ courseCode, versityId });
    if (courseExists) {
      throw new Error("Course already exists");
    }

    await coursesDatabase.create({
      ...coursesData,
      createdAt: new Date(),
    });

    return {
      ok: 1,
      coursesData,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function findCourses(filterQueryObj) {
  return await coursesDatabase
    .find(filterQueryObj, {
      versityId: 0,
      _id: 0,
      __v: 0,
    })
    .populate({
      path: "departmentId",
      select: "departmentCode -_id",
    })
    .populate({
      path: "semesterId",
      select: "semesterNumber -_id",
    })
    .sort({ createdAt: -1 }) //DESC order
    .exec();
}

async function findCourse(filterQueryObj) {
  return await coursesDatabase.findOne(filterQueryObj);
}

module.exports = {
  findCourses,
  findCourse,
  registerCourse,
};
