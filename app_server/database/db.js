const mongoose = require('mongoose');
const readLine = require('readline');
const host = process.env.DB_HOST || '127.0.0.1'
const dbURI = `mongodb://${host}/travlr`;

mongoose.set{ 'useUnifiedTopology', true };

const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        useNewUrlParse: true,
        useCreateIndex: true,
        useUnifiedTopology: true,

    }), 1000);
}

mongoose.connection.on('connected', () => {
    console.log('connected');
});

mongoose.connection.on('error', err => {
    console.log('error: ' + err);
    return connect();
});

mongoose.connection.on('disconnected', () => {
    console.log('disconnected');
});

const gracefulShutdown = (msg, callback) => {

};

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

connect();

// bring in Mongoose Schema
require('./travlr');