const dotenv = require('dotenv').config();
const env = dotenv.parsed;
const mongoose = require('mongoose');

const dbURI = `mongodb://${env.MONGO_USR}${(env.MONGO_USR !== null && env.MONGO_USR !== '') ? ":" : ""}${env.MONGO_PASS}${(env.MONGO_PASS !== null && env.MONGO_PASS !== '') ? "@" : ""}${env.MONGO_SERVER}:${env.MONGO_PORT}/${env.MONGO_DATABASE}`;

mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', function(err){
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', function(){
  console.log(`Mongoose disconnected`);
});

gracefulShutdown = function(msg, callback){
  mongoose.connection.close(function(){
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', function(){
  gracefulShutdown('nodemon restart', function(){
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function(){
  gracefulShutdown('app termination', function(){
    process.exit(0);
  })
});

process.on('SIGTERM', function(){
  gracefulShutdown('Heroku app shutdown', function(){
    process.exit(0);
  })
});