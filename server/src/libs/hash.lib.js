const bcrypt = require('bcryptjs');
const CONFIG = require('../config');

const saltRounds = CONFIG.hash.salt;

async function generateHash(pwd) {
    const hash = await bcrypt.hash(pwd, Number(saltRounds));
    return hash;
}

async function compareHash(pwd, hash) {
    const result = await bcrypt.compare(pwd, hash);
    return result;
}

module.exports = {
    generateHash,
    compareHash
}