const { versityExistsWithId } = require("../../models/versity/versity.model");

async function checkVersityPermission(req, res, next) {
  const { versityId } = req.user;

  try {
    const versity = await versityExistsWithId(versityId);

    if (!versity) {
      return res
        .status(404)
        .json({ error: "Permission denied", message: "Invalid versity" });
    }

    req.user = {
      ...req.user,
      versityId: versity._id,
    };

    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ error: "Permission denied", message: "Invalid versity" });
  }
}

module.exports = {
  checkVersityPermission,
};
