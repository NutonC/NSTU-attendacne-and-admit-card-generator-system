const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const studentAttendanceSchema = new mongoose.Schema({
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
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.STUDENT,
    required: true,
  },
  semesterId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.SEMESTER,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  mongoModelConstatnts.STUDENTATTENDANCE,
  studentAttendanceSchema
);
