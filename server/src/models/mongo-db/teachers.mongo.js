const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const teachersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.USER,
    required: true,
  },
  teacherTitle: {
    type: String,
    required: false,
  },
  teacherUID: {
    type: String,
    default: undefined,
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
});

module.exports = mongoose.model(mongoModelConstatnts.TEACHER, teachersSchema);
