import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPost } from '../../redux/actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(text);
    setText('');
  };

  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary'>
        <h3>Say Something...</h3>
      </div>
      <form className='form my-1' onSubmit={onSubmit}>
        <textarea
          placeholder='Create a post'
          rows='5'
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
