require('babel-polyfill')
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var PrettyError = require('pretty-error');
var mongo_express = require('mongo-express/lib/middleware');
var mongoExpressConfig = require('./config/MongoExpressConfig');
var configServer = require('./config/config').server;
var mongodbHelper = require("./utils/MongodbHelper")
    , urlRoutes = require("./routes.js");

const server = global.server = express();

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, OPTION, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Content-Range, X-Total-Count");
    res.header('Access-Control-Expose-Headers', 'X-Total-Count, Content-Range');
    next();
});
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use('/mongodb', mongo_express(mongoExpressConfig))

mongodbHelper.connect(function (error) {
    if (error) throw error;
});

server.on('close', function (errno) {
    mongodbHelper.disconnect(function (err) {
    });
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.use(function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});

server.get('/', (req, res, next) => {
    try {
        let statusCode = 200;
        res.status(statusCode);
        res.send("ok");
    } catch (err) {
        next(err);
    }
});

server.get('/upload', (req, res, next) => {
    var base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");
 
    require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
        console.log(err);
    });
});

urlRoutes.setRequestUrl(server);

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    // const template = require('./views/error.jade');
    const statusCode = err.status || 500;
    res.status(statusCode);
    res.json({
        code: 4000,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    });
});

// Launch the server
// -----------------------------------------------------------------------------
server.listen(configServer.port, () => {
    /* eslint-disable no-console */
    console.log(`The server is running at http://localhost:${configServer.port}/`);
});
