const express = require('express');

const router = express.Router();

const auth_routes = require('./auth.routes');

// Auth routes
router.use('/auth', auth_routes);

module.exports = router;
