const subscriptionDatabase = require("../mongo-db/subscriptions.mongo");

async function findAllSubscription(filterQueryObj) {
  return subscriptionDatabase.find(filterQueryObj, {
    _id: 0,
    __v: 0,
  });
}

async function findSubscription(filterQueryObj) {
  return subscriptionDatabase.findOne(filterQueryObj);
}

async function createSubscription(subscriptionData) {
  const { userId, customerId, subscriptionId } = subscriptionData;

  try {
    const subscriptionExists = await findSubscription({
      userId,
      customerId,
      subscriptionId,
    });

    if (subscriptionExists) {
      throw new Error("Package already exists!");
    }

    await subscriptionDatabase.create({ ...subscriptionData });

    return {
      ok: 1,
      subscription: subscriptionData,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function updateSubscription(filterQueryObj, updateObj) {
  return await subscriptionDatabase.findOneAndUpdate(filterQueryObj, updateObj);
}

async function deleteSubscription(filterQueryObj, updateObj) {
  return await subscriptionDatabase.findOneAndDelete(filterQueryObj, updateObj);
}

module.exports = {
  findAllSubscription,
  findSubscription,
  createSubscription,
  deleteSubscription,
  updateSubscription,
};
