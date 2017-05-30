"use strict";

var categoryModel = require('../models/Category.js');
var error = require('../utils/StatusResponse').error;
var success = require('../utils/StatusResponse').success;
var category = new categoryModel.Schema("category").model;

exports.create = function (req, res, next) {
    var categoryEntity = new category({name: req.body.name});
    categoryEntity.save(function (err, result) {
        if (err) {
            return next(err)
        }
        success(res, result);
    })
};

exports.delete = function (req, res, next) {
    category.deleteOne({"_id": req.params.id}, function (err, category) {
        success(res);
    });
};

exports.update = function (req, res, next) {
    category.findByIdAndUpdate({"_id": req.params.id},
        {name: req.body.name}
        , function (err, result) {
            if (err) {
                return next(err)
            }
            success(res, result);
        });
};

exports.findOne = function (req, res, next) {
    category.findOne({"_id": req.params.id}, function (err, result) {
        res.json(result)
    });
};

exports.pageList = function (req, res, next) {
    let _sort = req.query._sort || '_id';
    let _order = req.query._order || 'ASC';
    _sort = _order === 'ASC' ? _sort : '-' + _sort;
    let _start = req.query._start || 0;
    let _end = req.query._end || 10;
    let q = req.query.q || ".*";
    let countCondition = ".*" === q ? {} : {name: q};
    category.count(countCondition, function (err, count) {
        res.set('X-Total-Count', count);
        category.find({})
            .where('name', new RegExp('^' + q + '$', "i"))
            .skip(parseInt(_start))
            .limit(_end - _start)
            .sort(_sort)
            .exec(function (err, results) {
                if (err) next(err);
                res.json(results)
            });
    });
};



