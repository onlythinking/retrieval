/**
 * Created by sky on 2017/5/27.
 */
require('date-utils');
var jsonfile = require('jsonfile');
var fs = require("fs");
var mongoClient = require('mongodb').MongoClient;
var ftps = require('./FtpsTools');
var config = require('./FtpConfig');
var constant = require('./AppConstant');

exports.insertLoan = function (dataType, channelType, dateStr) {
    var currentDate = dateStr || new Date().toFormat("YYYYMMDD");
    var remoteDir = dateStr || constant.ding_dang.overdue + currentDate;
    var entityName = 'overdue-dd-' + currentDate;

    switch (dataType) {
        case "overdue":
            remoteDir = 'dingdang' === channelType ? constant.ding_dang.overdue + currentDate :
            constant.by_online.overdue + currentDate;
            entityName = 'dingdang' === channelType ? 'overdue-dd-' + currentDate :
            'overdue-xs-' + currentDate;
            break;
        case "repay":
            remoteDir = 'dingdang' === channelType ? constant.ding_dang.repay + currentDate :
            constant.by_online.repay + currentDate;
            entityName = 'dingdang' === channelType ? 'repay-dd-' + currentDate :
            'repay-xs-' + currentDate;
            break;
        default :
            console.log("Not support type");
            return false;
    }

    return new Promise(function (resolve, reject) {
        ftps.download(remoteDir, remoteDir, null).then(function () {
            console.log("开始入库...");
            let url = 'mongodb://127.0.0.1:27017/loan';
            mongoClient.connect(url, function (err, db) {
                console.log("Connected mongodb to server");
                switch (dataType) {
                    case "overdue":
                        insertOverdue(db, entityName, config.localBaseDir + remoteDir, function () {
                            db.close();
                        });
                        break;
                    case "repay":
                        if ('dingdang' === channelType) {
                            insertRepays(db, entityName, config.localBaseDir + remoteDir, function () {
                                db.close();
                            });
                        } else {
                            insertXsRepays(db, entityName, config.localBaseDir + remoteDir, function () {
                                db.close();
                            });
                        }
                        break;
                    default :
                        console.log("Not support type");
                        return false;
                }
                resolve();
            });
        }, function (err) {
            console.log(err);
            reject(err);
        });
    });
};

var insertOverdue = function (db, entityName, fileDir, callback) {
    var collection = db.collection(entityName);
    fs.readdir(fileDir, function (err, files) {
        if (err) {
            console.log("error:\n" + err);
            return;
        }
        var countFile = 0;
        files.forEach(function (file) {
            var filePath = fileDir + '/' + file;
            var str = fs.readFileSync(filePath).toString();
            var objData = JSON.parse(str.replace(/[\f\n\r\t]/g, ''));
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

var insertRepays = function (db, entityName, fileDir, callback) {
    var collection = db.collection(entityName);
    fs.readdir(fileDir, function (err, files) {
        if (err) {
            console.log("error:\n" + err);
            return;
        }
        var countFile = 0;
        files.forEach(function (file) {
            var filePath = fileDir + '/' + file;
            var str = fs.readFileSync(filePath).toString();
            var objData = JSON.parse(str.replace(/[\f\n\r\t]/g, '')).actual_collection_data;
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

var insertXsRepays = function (db, entityName, fileDir, callback) {
    var collection = db.collection(entityName);
    fs.readdir(fileDir, function (err, files) {
        if (err) {
            console.log("error:\n" + err);
            return;
        }
        var countFile = 0;
        files.forEach(function (file) {
            var filePath = fileDir + '/' + file;
            var str = fs.readFileSync(filePath).toString();
            var objData = JSON.parse(str.replace(/[\f\n\r\t]/g, ''));
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