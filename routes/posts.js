const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../middleware/auth');
const checkObjectId = require('../middleware/checkObjectId');

const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  delCommentPost,
} = require('../controllers/posts');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  createPost
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getPosts);

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', checkObjectId('id'), getPost);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, checkObjectId('id'), deletePost);

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, checkObjectId('id'), likePost);

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, checkObjectId('id'), unlikePost);

// @route   PUT api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.put(
  '/comment/:id',
  [
    auth,
    checkObjectId('id'),
    [check('text', 'Text is required').not().isEmpty()],
  ],
  commentPost
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment on a post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  auth,
  checkObjectId('id'),
  checkObjectId('comment_id'),
  delCommentPost
);

module.exports = router;
