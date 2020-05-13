const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const Profile = require('../models/Profile');
const User = require('../models/User');

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
  async (req, res) => {
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
  }
);

module.exports = router;
