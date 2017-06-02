var mongoose = require('../utils/AppMongoose').mongoose;
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: {type: String, match: /[a-z0-9]/, index: true}
});
mongoose.model('category', categorySchema);
module.exports.Schema = function (modelName) {
    return {model: mongoose.model(modelName)};
}
