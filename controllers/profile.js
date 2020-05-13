const { validationResult } = require('express-validator');

const Profile = require('../models/Profile');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
exports.createProfile = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  profileFields.social = {};

  const normalFields = /company|website|location|bio|status|githubusername/;
  const socialFields = /youtube|facebook|twitter|instagram|linkedin/;

  for (let field in req.body) {
    if (normalFields.test(field)) {
      profileFields[field] = req.body[field];
    }

    if (socialFields.test(field)) {
      profileFields.social[field] = req.body[field];
    }

    if (field === 'skills') {
      profileFields.skills = req.body.skills
        .split(',')
        .map((skill) => skill.trim());
    }
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};
