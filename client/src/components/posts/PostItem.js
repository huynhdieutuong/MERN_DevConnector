import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const PostItem = ({
  post: { _id, avatar, name, text, user, likes, comments, date },
}) => {
  return (
    <div className='post bg-whitee my-1 p-1'>
      <div>
        <Link to={`/profiles/${user}`}>
          <img src={avatar} alt='' className='round-img' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button className='btn'>
          <i className='fas fa-thumbs-up'></i>{' '}
          <span>{likes.length > 0 && likes.length}</span>
        </button>
        <button className='btn'>
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/posts/${_id}`} className='btn btn-primary'>
          Discussion {comments.length > 0 && comments.length}
        </Link>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;
