const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const subscriptionsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.USER,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  subscriptionId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  mongoModelConstatnts.SUBSCRIPTION,
  subscriptionsSchema
);
