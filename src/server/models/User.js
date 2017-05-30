var mongoose = require('../utils/AppMongoose').mongoose;
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, match: /[a-z0-9]/, index: true},
    password: String,
    avatar: String,
    email: String,
    createDate: {type: Date, default: Date.now}
});
mongoose.model('user', userSchema);
module.exports.Schema = function (modelName) {
    return {model: mongoose.model(modelName)};
}
