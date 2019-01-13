require('./config/config');
const express = require('express');
const app = express();
const http = require('http');
const logger =  require('./utils/logger');
const bodyParser = require('body-parser');
require('./db/mongo');


// Logging unhandled promises rejection
process.on('unhandledRejection', (reason, p) => {
  logger.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});


app.use(require('cors')());
app.use(bodyParser.json());

app.use('/', require('./routes'));
http.createServer(app).listen(process.env.PORT, () => {
  logger.debug(`${process.env.NODE_ENV} environment. Listening on port ${process.env.PORT}`);
});

module.exports = {
  app
};
