/**
 * Created by sky on 2017/5/31.
 */
var mysql = require('mysql');

// http://nodejs.org/docs/v0.6.5/api/fs.html#fs.writeFile
var fs = require('fs');
var _ = require('lodash');
var humps = require('humps');
var streamToMongoDB = require("stream-to-mongo-db").streamToMongoDB;

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '172.16.30.33',
    user: 'test',
    password: 'test',
    database: 'test'
});

var outputDBConfig = {dbURL: "mongodb://localhost:27017/test", collection: "c_ur_oth_call_dtl"};
var writableStream = streamToMongoDB(outputDBConfig);
var page = 0;
var size = 100000;
var sql = "SELECT *, DATE_FORMAT(INST_DATE,'%Y%m%d') CUR_TIME FROM c_ur_oth_call_dtl WHERE DATE_FORMAT(INST_DATE,'%Y%m%d') = ? LIMIT ? , ?";
var dateStr = '20170412';

batchQuery(page, size);

function batchQuery(page, size) {
    pool.query({
        sql,
        timeout: 1000000
    }, [dateStr, page * size, size])
        .stream()
        .pipe(writableStream);
}
