const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const semestersSchema = new mongoose.Schema({
  semesterNumber: {
    type: Number,
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

module.exports = mongoose.model(mongoModelConstatnts.SEMESTER, semestersSchema);
