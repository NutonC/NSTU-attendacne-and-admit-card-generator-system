const {
  registerCourse,
  findCourses,
} = require("../../models/course/course.model");
const { findDepartment } = require("../../models/department/department.model");
const { findSemester } = require("../../models/semester/semester.model");

async function httpPostCourse(req, res) {
  const {
    courseName,
    courseCode,
    courseCredit,
    semesterNumber,
    departmentCode,
  } = req.body;
  const { versityId } = req.user;

  if (
    !courseName ||
    !courseCode ||
    !courseCredit ||
    !semesterNumber ||
    !departmentCode
  ) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const department = await findDepartment({ departmentCode, versityId });
    const semester = await findSemester({ semesterNumber, versityId });
    console.log({ department, semester });

    const response = await registerCourse({
      courseName,
      courseCode,
      courseCredit,
      versityId,
      departmentId: department._id,
      semesterId: semester._id,
    });

    if (response.ok === 1) {
      return res.status(201).json({
        message: "Course added Successfully!",
        data: { courseName, courseCode, courseCredit },
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "Failed to add course", message: err.message });
  }
}

async function httpGetCourse(req, res) {
  const { versityId } = req.user;

  try {
    const courseData = await findCourses({ versityId });

    if (!courseData) {
      return res
        .status(404)
        .json({ error: "Course not found", message: "No courses!" });
    }

    return res.status(200).json({ data: courseData, message: "Courses found" });
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .json({ error: "Course not found", message: "No courses!" });
  }
}

module.exports = {
  httpPostCourse,
  httpGetCourse,
};
