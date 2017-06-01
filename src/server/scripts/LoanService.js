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

exports.insertLoan = function (type, dateStr) {
    var currentDate = dateStr || new Date().toFormat("YYYYMMDD");
    var remoteDir = dateStr || constant.ding_dang.overdue + currentDate;
    var entityName = 'overdue-' + currentDate;
    switch (type) {
        case "overdue":
            remoteDir = constant.ding_dang.overdue + currentDate;
            entityName = 'overdue-' + currentDate;
            break;
        case "repay":
            remoteDir = constant.ding_dang.repay + currentDate;
            entityName = 'repay-' + currentDate;
            break;
        default :
            console.log("Not support type");
            return false;
    }

    ftps.download(remoteDir, remoteDir, null).then(function () {
        console.log("开始入库...");
        let url = 'mongodb://127.0.0.1:27017/loan';
        mongoClient.connect(url, function (err, db) {
            console.log("Connected mongodb to server");

            switch (type) {
                case "overdue":
                    insertOverdue(db, entityName, config.localBaseDir + remoteDir, function () {
                        db.close();
                    });
                    break;
                case "repay":
                    insertRepays(db, entityName, config.localBaseDir + remoteDir, function () {
                        db.close();
                    });
                    break;
                default :
                    console.log("Not support type");
                    return false;
            }

        });
    }, function (err) {
        console.log(err);
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