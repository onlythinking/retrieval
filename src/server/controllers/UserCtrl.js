"use strict";

var userModel = require('../models/User.js');
var error = require('../utils/StatusResponse').error;
var success = require('../utils/StatusResponse').success;
var crypt = require('../utils/Crypt');
var user = new userModel.Schema("user").model;

exports.create = function (req, res, next) {
    var userEntity = new user({username: req.body.username, password: req.body.password});
    userEntity.avatar = "https://robohash.org/" + crypt.sha1(req.body.username) + ".png";
    userEntity.save(function (err, result) {
        if (err) {
            return next(err)
        }
        success(res, result);
    })
};

exports.delete = function (req, res, next) {
    user.deleteOne({"_id": req.params.id}, function (err, user) {
        success(res);
    });
};

exports.update = function (req, res, next) {
    user.findByIdAndUpdate({"_id": req.params.id},
        {username: req.body.username, email: req.body.email}
        , function (err, result) {
            if (err) {
                return next(err)
            }
            success(res, result);
        });
};

exports.findOne = function (req, res, next) {
    user.findOne({"_id": req.params.id}, function (err, user) {
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
    let username = req.query.username || ".*";
    let countCondition = ".*" === username ? {} : {username: username};
    user.count(countCondition, function (err, count) {
        res.set('X-Total-Count', count);
        user.find({})
            .where('username', new RegExp('^' + username + '$', "i"))
            .skip(parseInt(_start))
            .limit(_end - _start)
            .sort(_sort)
            .exec(function (err, results) {
                if (err) next(err);
                res.json(results)
            });
    });
};


