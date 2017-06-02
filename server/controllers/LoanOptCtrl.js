"use strict";

var loanOptModel = require('../models/LoanOpt.js');
var loanService = require('../scripts/LoanService.js');
var error = require('../utils/StatusResponse').error;
var success = require('../utils/StatusResponse').success;
var loanOpt = new loanOptModel.Schema("loanOpt").model;

exports.create = function (req, res, next) {

    let dataType = req.body.dataType;
    let fileDate = req.body.fileDate;
    // todo
    loanService.insertLoan(dataType, fileDate);
    var userEntity = new loanOpt(
        {
            dataType: dataType,
            fileDate: fileDate,
            operator: 'system'
        }
    );
    userEntity.save(function (err, result) {
        if (err) {
            return next(err)
        }
        res.json(result._id);
        //success(res, result);
    })
};

exports.delete = function (req, res, next) {
    loanOpt.deleteOne({"_id": req.params.id}, function (err, user) {
        success(res);
    });
};

exports.update = function (req, res, next) {
    return success(res, "ok");
};

exports.findOne = function (req, res, next) {
    loanOpt.findOne({"_id": req.params.id}, function (err, user) {
        res.json(user)
    });
};

exports.pageList = function (req, res, next) {
    let _sort = req.query._sort || '_id';
    let _order = req.query._order || 'ASC';
    _sort = _order === 'ASC' ? _sort : '-' + _sort;
    let _start = req.query._start || 0;
    let _end = req.query._end || 10;
    let q = req.query.q || ".*";
    let dataType = req.query.dataType || ".*";
    let countCondition = ".*" === dataType ? {} : {dataType: dataType};
    loanOpt.count(countCondition, function (err, count) {
        res.set('X-Total-Count', count);
        loanOpt.find({})
            .where('dataType', new RegExp('^' + dataType + '$', "i"))
            .skip(parseInt(_start))
            .limit(_end - _start)
            .sort(_sort)
            .exec(function (err, results) {
                if (err) next(err);
                res.json(results)
            });
    });
};


