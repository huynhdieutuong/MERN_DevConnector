import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const CommentItem = ({ comment: { _id, user, name, avatar, text, date } }) => {
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
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentItem;
