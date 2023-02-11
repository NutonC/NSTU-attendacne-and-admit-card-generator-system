const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const hallsSchema = new mongoose.Schema({
  hallName: {
    type: String,
    lowercase: true,
    required: true,
  },
  hallCode: {
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

module.exports = mongoose.model(mongoModelConstatnts.HALL, hallsSchema);
