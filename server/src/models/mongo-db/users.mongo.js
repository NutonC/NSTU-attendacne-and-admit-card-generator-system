const mongoose = require("mongoose");
const mongoModelConstatnts = require("./_constants.mongo");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
  joined: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  tokenVersion: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model(mongoModelConstatnts.USER, usersSchema);
