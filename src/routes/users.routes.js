const express = require('express')
const router = express.Router()

const { ValidateJWT } = require('../../utils/utils')
const { getAllUsers } = require('../controllers/user.controller')

router.get('/users', ValidateJWT, getAllUsers)

module.exports = router
