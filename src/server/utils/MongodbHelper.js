var dbUrl = require("../config/config").mongodb.url;
var mongoose = require('mongoose'),
    Admin = mongoose.mongo.Admin;
exports.connect = function (cb) {
    mongoose.connect(dbUrl);
}
exports.mongoose = function () {
    return mongoose;
}
exports.disconnect = function (cb) {
    return mongoose.disconnect(cb);
}
exports.createConnection = function (callback, returnFunc) {
    var connection = mongoose.createConnection(dbUrl);
    connection.on('open', function () {
        callback(connection, Admin, returnFunc);
    });
}