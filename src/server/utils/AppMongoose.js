/**
 * Created by sky on 2017/5/30.
 * 全局实例
 */
var mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));
exports.mongoose = mongoose;