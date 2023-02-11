const { findManagement } = require("../../models/management/management.model");

async function checkManagementPermission(req, res, next) {
  const { userId } = req.user;

  try {
    const management = await findManagement({ userId });
    if (!management) {
      return res
        .status(404)
        .json({ error: "Permission denied", message: "Invalid user" });
    }

    req.user = {
      ...req.user,
      managementId: management._id,
    };

    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ error: "Permission denied", message: "Invalid user" });
  }
}

module.exports = {
  checkManagementPermission,
};
