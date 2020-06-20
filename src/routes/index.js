const express = require('express')

const router = express.Router()

const authRoutes = require('./auth.routes')

// Auth routes
router.use('/auth', authRoutes)

module.exports = router
