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

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort('-date');

    res.json(posts);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the post has already been liked
    const liked = post.likes.find(
      (like) => like.user.toString() === req.user.id
    );

    if (liked) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    // Like and save
    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the post has not yet been liked
    const liked = post.likes.find(
      (like) => like.user.toString() === req.user.id
    );

    if (!liked) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Unlike and save
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};
