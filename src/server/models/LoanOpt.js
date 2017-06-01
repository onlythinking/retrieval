var mongoose = require('../utils/AppMongoose').mongoose;
var Schema = mongoose.Schema;

var userSchema = new Schema({
    batchNo: {type: String},
    dataType: String,
    fileDate: String,
    operator: String,
    createDate: {type: Date, default: Date.now}
});
mongoose.model('loanOpt', userSchema);
module.exports.Schema = function (modelName) {
    return {model: mongoose.model(modelName)};
}
