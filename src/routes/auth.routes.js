const express = require('express')

const router = express.Router()

const {
  validateRules,
  validate,
  SignUp,
  login
} = require('../controllers/auth.controller')

router.post('/signup', validateRules('SignUp'), validate, SignUp)

router.post('/login', validateRules('login'), validate, login)

module.exports = router
