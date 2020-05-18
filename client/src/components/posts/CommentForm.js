import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addComment } from '../../redux/actions/post';

const CommentForm = ({ addComment, post: { post } }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(post._id, text);
    setText('');
  };

  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary'>
        <h3>Leave A Comment</h3>
      </div>
      <form onSubmit={onSubmit} className='form my-1'>
        <textarea
          name='text'
          rows='5'
          placeholder='Comment on this post'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type='submit' className='btn btn-dark my-1'>
          Submit
        </button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
