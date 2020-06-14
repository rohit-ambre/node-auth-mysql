const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const db = require('./src/models');
const routes = require('./src/routes');

// Modules
const logger = require('./winston-config');

require('dotenv').config();

// create express app
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

if (process.env.NODE_ENV !== 'production') {
  // app.use(morgan('dev'));
  app.use(
    morgan('dev', {
      stream: logger.stream,
      // only log error responses
      // skip: (req, res) => {
      //     return res.statusCode < 400;
      // },
    })
  );
}

db.sequelize
  .sync()
  .then(() => {
    logger.info('We are connected to the database');

    app.use('/api', routes);

    app.listen(process.env.NODE_PORT, () => {
      logger.info(`server started on port ${process.env.NODE_PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
