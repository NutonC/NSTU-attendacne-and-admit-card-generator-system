const {
  registerSemester,
  findSemesters,
} = require("../../models/semester/semester.model");

async function httpPostSemester(req, res) {
  const { semesterNumber } = req.body;
  const { versityId } = req.user;

  if (!semesterNumber || !versityId || Number(semesterNumber) < 1) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  if (Number(semesterNumber) > 12) {
    return res.status(400).json({
      error: "Invalid Semester",
      message: "Semester can't be bigger than 12",
    });
  }

  try {
    const response = await registerSemester({ semesterNumber, versityId });
    if (response.ok === 1) {
      return res.status(200).json({
        data: semesterNumber,
        message: "Successfully added semester!",
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Failed to register semester!", message: err.message });
  }
}

async function httpGetSemester(req, res) {
  const { versityId } = req.user;

  try {
    const semesterData = await findSemesters({ versityId });

    if (!semesterData) {
      return res
        .status(404)
        .json({ error: "Semester not found", message: "No Semester!" });
    }

    return res
      .status(200)
      .json({ data: semesterData, message: "Semester found" });
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .json({ error: "Semester not found", message: "No Semester!" });
  }
}

module.exports = {
  httpPostSemester,
  httpGetSemester,
};
