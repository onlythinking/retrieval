module.exports = {
    server: {
        port: process.env.PORT || 8080,
        host: process.env.WEBSITE_HOSTNAME || `localhost:8080`,
    },
    mongodb: {
        db: 'loan',
        host: 'localhost',
        port: 27017,
        url: process.env.DATABASE_URL || 'mongodb://localhost:27017/loan'
    }
};

