const mongoose = require('mongoose');

const buildMongoPath = () => {
  let mongoPathConnection = 'mongodb://';
  if ((process.env.NODE_ENV !== 'development') && (process.env.NODE_ENV !== 'test')) {
    const authURI = `${encodeURIComponent(process.env.MONGODB_USERNAME)}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}`;
    mongoPathConnection += `${authURI}@`;
  }
  mongoPathConnection += `${process.env.MONGODB_URI}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE_NAME}`;
  return mongoPathConnection;
};

const buildOptions = () => {
  const result = {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 5
  };
  return result;
};

const logger = require('../utils/logger').create(`Mongo:${process.env.MONGODB_DATABASE_NAME}`);
mongoose.Promise = Promise;
mongoose.set('debug', true);
const mongoPathConnection = buildMongoPath();
const options = buildOptions();
logger.info(`Connecting to dabatase ${mongoPathConnection}...`);

const connect = mongoose.connect(mongoPathConnection, options);
connect
  .then(() => logger.info(`Connection to MONGODB ${mongoPathConnection} has been established successfully.`))
  .catch((err) => logger.error(`Unable to connect to the database MONGODB "${mongoPathConnection}": ${err}`));

module.exports = exports = connect;