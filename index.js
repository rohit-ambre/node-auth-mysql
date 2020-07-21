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

    app.use('/api', routes)

    app.use('/', (req, res) => {
      res.send('<h3 style="text-align:center">This is a Boilerplate Express application with authentication with mysql Database</h3>')
    })

    app.use('*', (req, res) => {
      res.sendFile(path.join(__dirname, '/not_found.html'))
    })

    const server = app.listen(port, () => {
      logger.info(`server started on port ${port}`)
    })

    process.on('SIGINT', () => {
      logger.warn('SIGINT RECEIVED. Shutting down gracefully')
      server.close(() => {
        logger.info('💥 Process terminated!')
      })
    })
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })
