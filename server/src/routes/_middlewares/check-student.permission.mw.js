const { findStudent } = require("../../models/student/student.model");

async function checkStudentPermission(req, res, next) {
  const { userId } = req.user;

  try {
    const student = await findStudent({ userId });

    if (!student) {
      return res
        .status(404)
        .json({ error: "Permission denied", message: "Invalid student" });
    }

    req.user = {
      ...req.user,
      studentId: student._id,
    };

    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ error: "Permission denied", message: "Invalid student" });
  }
}

module.exports = {
  checkStudentPermission,
};
