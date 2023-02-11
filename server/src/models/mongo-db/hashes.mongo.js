const mongoose = require('mongoose');
const mongoModelConstatnts = require('./_constants.mongo');

const hashesSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: mongoModelConstatnts.USER,
        required: true
    }
});

module.exports = mongoose.model(mongoModelConstatnts.HASH, hashesSchema);