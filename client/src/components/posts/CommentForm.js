import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = (props) => {
  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary'>
        <h3>Leave A Comment</h3>
      </div>
      <form className='form my-1'>
        <textarea
          name='text'
          rows='5'
          placeholder='Comment on this post'
        ></textarea>
        <button type='submit' className='btn btn-dark my-1'>
          Submit
        </button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {};

export default CommentForm;
