const { validationResult } = require('express-validator');

const Post = require('../models/Post');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
exports.createPost = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const post = await Post.create({
      user: user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
    });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
