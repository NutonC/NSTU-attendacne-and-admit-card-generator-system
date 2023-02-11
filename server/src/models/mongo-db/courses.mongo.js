const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const coursesSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    lowercase: true,
    required: true,
  },
  courseCredit: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: mongoModelConstatnts.DEPARTMENT,
    required: true,
  },
  semesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: mongoModelConstatnts.SEMESTER,
    required: true,
  },
  versityId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.VERSITY,
    required: true,
  },
});

module.exports = mongoose.model(mongoModelConstatnts.COURSE, coursesSchema);
