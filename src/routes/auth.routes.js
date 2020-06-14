const express = require('express');

const router = express.Router();

const { test } = require('../controllers/auth.controller');

router.get('/', test);

module.exports = router;
