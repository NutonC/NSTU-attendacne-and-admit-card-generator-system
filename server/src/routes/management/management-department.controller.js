const {
  registerDepartment,
  findDepartments,
} = require("../../models/department/department.model");

async function httpPostDepartment(req, res) {
  const { departmentName, departmentCode } = req.body;
  const { versityId } = req.user;

  if (!departmentCode || !departmentName || !versityId) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const response = await registerDepartment({
      departmentName,
      departmentCode,
      versityId,
    });
    if (response.ok === 1) {
      return res.status(201).json({
        message: "Department added Successfully!",
        data: departmentName,
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(409)
      .json({ error: "Failed to register Department!", message: err.message });
  }
}

async function httpGetDepartment(req, res) {
  const { versityId } = req.user;

  try {
    const departmentData = await findDepartments({ versityId });

    if (!departmentData) {
      return res
        .status(404)
        .json({ error: "Department not found", message: "No Department!" });
    }

    return res
      .status(200)
      .json({ data: departmentData, message: "Department found" });
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .json({ error: "Department not found", message: "No Department!" });
  }
}

module.exports = {
  httpPostDepartment,
  httpGetDepartment,
};
