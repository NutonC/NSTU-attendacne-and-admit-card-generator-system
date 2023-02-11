const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const managementsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.USER,
    required: true,
  },
  versityId: {
    type: mongoose.Types.ObjectId,
    ref: mongoModelConstatnts.VERSITY,
    required: true,
  },
  generatedTokenIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: mongoModelConstatnts.REGISTRATIONTOKEN,
      required: true,
      default: [],
    },
  ],
});

module.exports = mongoose.model(
  mongoModelConstatnts.MANAGEMENT,
  managementsSchema
);
