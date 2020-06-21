const logger = require('../../winston-config')
const db = require('../models')

module.exports.getAllUsers = (req, res) => {
  db.user.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(users => {
      res.status(200).json({ status: true, data: users })
    })
    .catch(err => {
      logger.error(`DB Error: ${err.message}`)
      res.status(500).json({
        status: false,
        message: 'some error occured',
        error: err
      })
    })
}
