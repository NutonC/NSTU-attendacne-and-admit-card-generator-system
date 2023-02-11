const { findTeacher } = require("../../models/teacher/teacher.model");

async function checkTeacherPermission(req, res, next) {
  const { userId } = req.user;

  try {
    const teacher = await findTeacher({ userId });

    if (!teacher) {
      return res
        .status(404)
        .json({ error: "Permission denied", message: "Invalid teacher" });
    }

    req.user = {
      ...req.user,
      teacherId: teacher._id,
    };

    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ error: "Permission denied", message: "Invalid teacher" });
  }
}

module.exports = {
  checkTeacherPermission,
};
