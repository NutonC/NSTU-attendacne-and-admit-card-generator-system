const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const sessionsSchema = new mongoose.Schema({
  session: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
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
});

module.exports = mongoose.model(mongoModelConstatnts.SESSION, sessionsSchema);
