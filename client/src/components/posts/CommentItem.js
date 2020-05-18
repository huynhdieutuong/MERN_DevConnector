import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { removeComment } from '../../redux/actions/post';

const CommentItem = ({
  comment: { _id, user, name, avatar, text, date },
  auth,
  post: { post },
  removeComment,
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
        {auth.user && auth.user._id === user && (
          <button
            onClick={() => removeComment(post._id, _id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
