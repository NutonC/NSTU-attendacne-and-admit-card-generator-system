const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const courseClassesSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.COURSE,
    required: true,
  },
  sessionId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.SESSION,
    required: true,
  },
  teacherId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.TEACHER,
    required: true,
  },
  versityId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.VERSITY,
    required: true,
  },
  totalPresent: {
    type: Number,
    required: true,
    default: 0,
  },
  totalAbsent: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  mongoModelConstatnts.COURSECLASS,
  courseClassesSchema
);
