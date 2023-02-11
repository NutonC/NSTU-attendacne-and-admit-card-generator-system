const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const departmentsSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
  },
  departmentCode: {
    type: String,
    lowercase: true,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  versityId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.VERSITY,
    required: true,
  },
});

module.exports = mongoose.model(
  mongoModelConstatnts.DEPARTMENT,
  departmentsSchema
);
