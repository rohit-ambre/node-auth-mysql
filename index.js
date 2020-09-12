const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const { swaggerDocument, swaggerOptions } = require('./swagger.config')
const db = require('./src/models')
const routes = require('./src/routes')

// Modules
const logger = require('./winston-config')

require('dotenv').config()

let port = process.env.NODE_PORT
if (isNaN(parseInt(port))) {
  port = 3000
}
// create express app
const app = express()

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(helmet())

if (process.env.NODE_ENV !== 'production') {
  // app.use(morgan('dev'));
  app.use(
    morgan('dev', {
      stream: logger.stream
      // only log error responses
      // skip: (req, res) => {
      //     return res.statusCode < 400;
      // },
    })
  )
}

const swaggerDocs = swaggerJSDoc(swaggerDocument)
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, swaggerOptions)
)

db.sequelize.sync()
  .then(() => {
    logger.info('We are connected to the database')
  })
  .catch((err) => {
    console.error(`Unable to connect to the database:' ${err.stack}`)
    throw new Error(`Unable to connect to the database:' ${err.message}`)
  })

app.use('/api', routes)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
});

// error handler middleware
app.use((error, req, res, next) => {
  logger.error(`Error occured: ${error}`)
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

const server = app.listen(port, () => {
  logger.info(`server started on port ${port}`)
})

process.on('SIGINT', () => {
  logger.warn('SIGINT RECEIVED. Shutting down gracefully')
  server.close(() => {
    logger.info('💥 Process terminated!')
  })
})