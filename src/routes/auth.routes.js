const express = require('express');

const router = express.Router();

const {
  validateRules,
  validate,
  SignUp,
} = require('../controllers/auth.controller');

router.post('/signup', validateRules('SignUp'), validate, SignUp);

module.exports = router;
