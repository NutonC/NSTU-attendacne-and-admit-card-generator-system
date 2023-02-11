const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const versitiesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.USER,
    required: true,
  },
  versityName: {
    type: String,
    required: true,
  },
  versitySerial: {
    type: String,
    required: true,
  },
  versityWebsite: {
    type: String,
    lowercase: true,
    required: true,
    default: undefined,
  },
  subscriptionPackageId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.SUBSCRIPTIONPACKAGE,
    required: true,
  },
  subscriptionPackageExpiry: {
    type: Date,
    required: true,
  },
  subscriptionPackageEnrolled: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model(mongoModelConstatnts.VERSITY, versitiesSchema);
