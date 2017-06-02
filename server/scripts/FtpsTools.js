/**
 * Created by sky on 2017/5/31.
 */
const FTPS = require('ftps');
const config = require('./FtpConfig');
var ftps = new FTPS({
    host: config.host,
    username: config.username,
    password: config.password,
    protocol: 'sftp', // Optional, values : 'ftp', 'sftp', 'ftps', ... default: 'ftp'
    port: config.port,
    retryInterval: 5,
    retryMultiplier: 1
});

exports.ftps = ftps;

exports.download = function (remoteDir, localDir, filter) {
    return new Promise(function (resolve, reject) {
        ftps.mirror({
            remoteDir: config.remoteBaseDir + remoteDir,
            localDir: config.localBaseDir + localDir,
            filter: filter || /\.json$/,
            parallel: true
        }).exec(
            function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            }
        )
    });
};

exports.upload = function (remoteDir, localDir, filter) {
    return new Promise(function (resolve, reject) {
        ftps.mirror({
            remoteDir: config.remoteBaseDir + remoteDir,
            localDir: config.localBaseDir + localDir,
            filter: filter || /\.json$/,
            upload: true
        }).exec(
            function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            }
        )
    });
};