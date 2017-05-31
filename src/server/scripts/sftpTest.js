/**
 * Created by sky on 2017/5/27.
 */
require('date-utils');
var jsonfile = require('jsonfile')
var fs = require("fs");
var mongoClient = require('mongodb').MongoClient;
var ftps = require('./mirror/FtpsTools');
var config = require('./mirror/FtpConfig');
var constant = require('./mirror/AppConstant');
var currentDate = new Date().toFormat("YYYYMMDD");

var remoteDir = config.remoteBaseDir + constant.ding_dang.repay + currentDate;
var localDir = config.remoteBaseDir + constant.ding_dang.repay + currentDate;

console.log(remoteDir);
console.log(localDir);

ftps.download(remoteDir, localDir, null, function () {
    let url = 'mongodb://127.0.0.1:27017/loan';
    mongoClient.connect(url, function (err, db) {
        console.log("Connected mongodb to server");
        insertRepays(db, function () {
            db.close();
        });
    });
});

var insertRepays = function (db, callback) {
    var collection = db.collection('repay-' + currentDate);
    fs.readdir(path, function (err, files) {
        if (err) {
            console.log("error:\n" + err);
            return;
        }
        var countFile = 0;
        files.forEach(function (file) {
            var filePath = localDir + '/' + file;
            var str = fs.readFileSync(filePath).toString();
            var objData = JSON.parse(str.replace(/[\f\n\r\t]/g, ''))
            collection.insertMany(
                objData
                , function (err, result) {
                    callback(result);
                });
            countFile++;
        });
        console.log("解析文件总数:", countFile);
    })
};