const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const registrationTokensSchema = new mongoose.Schema({
  versityId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.VERSITY,
    required: true,
  },
  tokenCode: {
    type: String,
    lowercase: true,
    required: true,
  },
  tokenType: {
    type: String,
    enum: {
      values: ["management", "teacher", "student"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  tokenUseLeft: {
    type: Number,
    required: false,
    default: 3,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  expiredAt: {
    type: Date,
    required: false,
  },
  managementId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.MANAGEMENT,
    required: false,
  },
  departmentId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.DEPARTMENT,
    required: false,
  },
  semesterId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.SEMESTER,
    required: false,
  },
  sessionId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.SESSION,
    required: false,
  },
});

module.exports = mongoose.model(
  mongoModelConstatnts.REGISTRATIONTOKEN,
  registrationTokensSchema
);
