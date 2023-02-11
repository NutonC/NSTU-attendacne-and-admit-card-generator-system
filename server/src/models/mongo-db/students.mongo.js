const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const studentsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.USER,
    required: true,
  },
  fathersName: {
    type: String,
    required: true,
  },
  mothersName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  studentUID: {
    type: String,
    default: undefined,
  },
  season: {
    type: String,
    lowercase: true,
    enum: {
      values: ["autumn", "spring", "summer"],
      message: "{VALUE} is not supported",
    },
    required: false,
  },
  versityId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.VERSITY,
    required: true,
  },
  departmentId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.DEPARTMENT,
    required: true,
  },
  semesterIds: [
    {
      type: mongoose.Types.ObjectId,
      ref: mongoModelConstatnts.SEMESTER,
      required: true,
    },
  ],
  currentSemesterId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.SEMESTER,
    required: true,
  },
  sessionId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.SESSION,
    required: true,
  },
  hallId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.HALL,
    required: false,
  },
});

module.exports = mongoose.model(mongoModelConstatnts.STUDENT, studentsSchema);
