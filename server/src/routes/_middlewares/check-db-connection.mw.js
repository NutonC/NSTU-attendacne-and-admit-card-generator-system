const mongoose = require('mongoose');

function checkDbConnection(req, res, next) {
    console.log('DB Connection', mongoose.connection.readyState)
    if(mongoose.connection.readyState === 0) {
        return res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong!' });
    }
    return next();
}

module.exports = {
    checkDbConnection
}