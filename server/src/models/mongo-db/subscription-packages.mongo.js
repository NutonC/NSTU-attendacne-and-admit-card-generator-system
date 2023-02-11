const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const subscriptionPackagesSchema = new mongoose.Schema({
  packageName: {
    type: String,
    lowercase: true,
    required: true,
  },
  packageType: {
    type: String,
    lowercase: true,
    required: true,
  },
  packageDurationInDays: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  highlighted: {
    type: Boolean,
    required: false,
  },
  cuponCode: {
    type: String,
    required: false,
  },
  cuponCodeExpiry: {
    type: Date,
    required: false,
  },
  priceOffPercentage: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model(
  mongoModelConstatnts.SUBSCRIPTIONPACKAGE,
  subscriptionPackagesSchema
);
