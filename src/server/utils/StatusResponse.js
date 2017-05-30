/**
 * Created by sky on 2017/5/30.
 */
exports.error = function (res, code, message) {
    if (!code) {
        code = 4000
    }
    res.status(400);
    res.json({
        code: code,
        message: message
    })
};

exports.success = function (res, data) {
    res.json({
        code: 0,
        message: "ok",
        data: data
    })
};

exports.pageResponse = function (req, res, model, cb) {
    // /api/users?_sort=id&_order=DESC&_start=0&_end=25
    // /api/users?username=fdf&_sort=id&_order=DESC&_start=0&_end=25
    // api/users?_sort=id&_order=DESC&_start=25&_end=50

    let _sort = req.query._sort;
    let _order = req.query._order;
    let _start = req.query._start;
    let _end = req.query._end;

    model.count({}, function (err, count) {
        res.set('X-Total-Count', count)

    })

};