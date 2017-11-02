module.exports = {
    server: {
        port: process.env.PORT || 8889,
        host: process.env.NODE_ENV === 'production' ? `127.0.0.1` : `127.0.0.1`
    },
    mongodb: {
        db: 'loan',
        host: 'localhost',
        port: 27017,
        url: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/loan'
    }
};

