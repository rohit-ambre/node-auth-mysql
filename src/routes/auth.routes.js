const express = require('express')
const router = express.Router()

const { ValidateJWT } = require('../../utils/auth.utils')
const {
  validateRules,
  validate,
  SignUp,
  login,
  getAllUsers
} = require('../controllers/auth.controller')

router.post('/signup', validateRules('SignUp'), validate, SignUp)

router.post('/login', validateRules('login'), validate, login)

router.get('/users', ValidateJWT, getAllUsers)

module.exports = router
