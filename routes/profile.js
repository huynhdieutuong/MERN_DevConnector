const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../middleware/auth');
const checkObjectId = require('../middleware/checkObjectId');

const {
  getCurrentProfile,
  createProfile,
  getProfiles,
  getProfile,
  deleteProfile,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
} = require('../controllers/profile');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, getCurrentProfile);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  createProfile
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', getProfiles);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', checkObjectId('user_id'), getProfile);

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, deleteProfile);

// @route   PUT api/profile/experience
// @desc    Add experience
// @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  addExperience
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience
// @access  Private
router.delete(
  '/experience/:exp_id',
  auth,
  checkObjectId('exp_id'),
  deleteExperience
);

// @route   PUT api/profile/education
// @desc    Add education
// @access  Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  addEducation
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education
// @access  Private
router.delete(
  '/education/:edu_id',
  auth,
  checkObjectId('edu_id'),
  deleteEducation
);

module.exports = router;
