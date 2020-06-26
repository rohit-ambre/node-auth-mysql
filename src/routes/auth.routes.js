const express = require('express')
const router = express.Router()

const {
  validateRules,
  validate,
  signup,
  login
} = require('../controllers/auth.controller')

router.post('/signup', validateRules('signup'), validate, signup)

router.post('/login', validateRules('login'), validate, login)

module.exports = router
