const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const teacherEnrolledCoursesSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: mongoModelConstatnts.TEACHER,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: mongoModelConstatnts.COURSE,
    required: true,
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: mongoModelConstatnts.SESSION,
    required: true,
  },
  versityId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.VERSITY,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model(
  mongoModelConstatnts.TEACHERENROLLEDCOURSE,
  teacherEnrolledCoursesSchema
);
