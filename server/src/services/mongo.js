const mongoose = require('mongoose');
const CONFIG = require('../config');

const MONGO_URL = CONFIG.mongo.db_url;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is Ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
};

async function mongoDisconnect() {
    await mongoose.disconnect();
};

module.exports = {
    mongoConnect,
    mongoDisconnect
};