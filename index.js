const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

require('dotenv').config();

// create express app
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.listen(process.env.NODE_PORT, () => {
  console.log(`server started on port ${process.env.NODE_PORT}`);
});
