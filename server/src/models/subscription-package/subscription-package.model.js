const subscriptionPackagesDatabase = require("../mongo-db/subscription-packages.mongo");

async function findAllSubscriptionPackage() {
  return subscriptionPackagesDatabase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function findSubscriptionPackage(filterQueryObj) {
  return subscriptionPackagesDatabase.findOne(filterQueryObj);
}

async function createSubscriptionPackage(packageData) {
  const { packageName, packageType, packageDurationInDays, price } =
    packageData;

  try {
    const packageExists = await findSubscriptionPackage({
      packageName,
      packageType,
      packageDurationInDays,
      price,
    });
    console.log(packageExists);
    if (packageExists) {
      throw new Error("Package already exists!");
    }

    await subscriptionPackagesDatabase.create({ ...packageData });

    return {
      ok: 1,
      package: packageData,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function updateSubscriptionPackage(filterQueryObj, updateObj) {
  return await subscriptionPackagesDatabase.findOneAndUpdate(
    filterQueryObj,
    updateObj
  );
}

async function deleteSubscriptionPackage(filterQueryObj, updateObj) {
  return await subscriptionPackagesDatabase.findOneAndDelete(
    filterQueryObj,
    updateObj
  );
}

module.exports = {
  findAllSubscriptionPackage,
  findSubscriptionPackage,
  createSubscriptionPackage,
  deleteSubscriptionPackage,
  updateSubscriptionPackage,
};
