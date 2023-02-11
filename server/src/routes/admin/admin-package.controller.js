const {
  createSubscriptionPackage,
  updateSubscriptionPackage,
} = require("../../models/subscription-package/subscription-package.model");

async function httpsPostCreateSubsPackage(req, res) {
  const {
    packageName,
    packageType,
    packageDurationInDays,
    price,
    highlighted,
  } = req.body;

  if (!packageName || !packageType || !packageDurationInDays || !price) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const packageCreated = await createSubscriptionPackage({
      packageName,
      packageType,
      highlighted,
      packageDurationInDays,
      price,
    });

    if (packageCreated.ok === 1) {
      return res.status(200).json({
        data: { packageName, packageDurationInDays, price },
        message: "Package Creation Successful",
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "Package Creation Failed", message: err.message });
  }
}

async function httpPutUpdateSubsPackage(req, res) {
  const { packagename } = req.params;
  const packageData = req.body;

  try {
    await updateSubscriptionPackage(
      { packageName: packagename },
      {
        ...packageData,
      }
    );

    return res
      .status(200)
      .json({ data: { ...packageData }, message: "Package updated" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: "Failed to update package",
      message: "Something went wrong",
    });
  }
}

module.exports = {
  httpsPostCreateSubsPackage,
  httpPutUpdateSubsPackage,
};
