const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const auth = require('../middleware/auth');

const { getUser, login } = require('../controllers/auth');

// @route   GET api/auth
// @desc    Get auth user
// @access  Public
router.get('/', auth, getUser);

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

module.exports = router;
