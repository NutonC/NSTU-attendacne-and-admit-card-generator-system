const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

//Currently not in use
const studentEnrolledCoursesSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.STUDENT,
    required: true,
  },
  courseIds: [
    {
      type: mongoose.Types.ObjectId,
      ref: mongoModelConstatnts.COURSE,
      required: true,
    },
  ],
});

module.exports = mongoose.model(
  mongoModelConstatnts.STUDENTENROLLEDCOURSE,
  studentEnrolledCoursesSchema
);
