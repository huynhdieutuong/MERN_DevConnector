import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPost } from '../../redux/actions/post';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

const Post = ({ match, getPost, post: { post, loading } }) => {
  useEffect(() => {
    getPost(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>

      <PostItem showActions={false} post={post} />

      <CommentForm />

      {/* Comments */}
      <div className='posts'>
        {post.comments.length > 0 &&
          post.comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
