const config = require('config');
const axios = require('axios');
const { validationResult } = require('express-validator');

const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');

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
      if (req.body[field].trim() !== '') {
        profileFields[field] = req.body[field];
      }
    }

    if (socialFields.test(field)) {
      if (req.body[field].trim() !== '') {
        profileFields.social[field] = req.body[field];
      }
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

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
exports.deleteProfile = async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndDelete({ user: req.user.id });

    // Remove user
    await User.findByIdAndDelete(req.user.id);

    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

// @route   PUT api/profile/experience
// @desc    Add experience
// @access  Private
exports.addExperience = async (req, res) => {
  // Validate
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // If not profile
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    // Build new Experience
    const newExp = {};
    for (let field in req.body) {
      if (field !== 'current') {
        if (req.body[field].trim() !== '') {
          newExp[field] = req.body[field];
        }
      } else {
        newExp[field] = req.body[field];
      }
    }

    // Save experience
    profile.experience.unshift(newExp);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience
// @access  Private
exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // If not profile
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    // Delete experience
    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

// @route   PUT api/profile/education
// @desc    Add education
// @access  Private
exports.addEducation = async (req, res) => {
  // Validate
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // If not profile
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    // Build new education
    const newEdu = {};
    for (let field in req.body) {
      if (field !== 'current') {
        if (req.body[field].trim() !== '') {
          newEdu[field] = req.body[field];
        }
      } else {
        newEdu[field] = req.body[field];
      }
    }

    // Save education
    profile.education.unshift(newEdu);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education
// @access  Private
exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // If not profile
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    // Delete education
    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
exports.github = async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });

    res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'No Github profile found' });
  }
};
