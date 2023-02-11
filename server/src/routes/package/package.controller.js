const {
  findAllSubscriptionPackage,
} = require("../../models/subscription-package/subscription-package.model");

async function httpGetAllSubscriptionPackage(req, res) {
  try {
    const packages = await findAllSubscriptionPackage();

    if (packages.length < 1) {
      return res.status(404).json({
        error: "Unable to get packages",
        message: "No packages found",
      });
    }

    return res.status(200).json({ data: packages, message: "Found packages" });
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .json({ error: "Unable to get packages", message: "No packages found" });
  }
}

module.exports = {
  httpGetAllSubscriptionPackage,
};
