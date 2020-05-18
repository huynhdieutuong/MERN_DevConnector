import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  DELETE_POST,
  UPDATE_LIKES,
  GET_POST,
  UPDATE_COMMENTS,
} from '../types';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addPost = (text) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  text = text.trim() === '' ? null : text.trim();

  try {
    const res = await axios.post('/api/posts', { text }, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch(setAlert('Please say something...', 'danger'));
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    const msg = err.response.data.msg;

    if (msg) {
      dispatch(setAlert(msg, 'danger'));
    }
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    const msg = err.response.data.msg;

    if (msg) {
      dispatch(setAlert(msg, 'danger'));
    }
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    const msg = err.response.data.msg;

    if (msg) {
      dispatch(setAlert(msg, 'danger'));
    }
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addComment = (id, text) => async (dispatch) => {
  text = text.trim() === '' ? null : text.trim();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/api/posts/comment/${id}`, { text }, config);

    dispatch({
      type: UPDATE_COMMENTS,
      payload: res.data,
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    const msg = err.response.data.msg;

    if (msg) {
      dispatch(setAlert(msg, 'danger'));
    }
  }
};

export const removeComment = (id, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${id}/${commentId}`);

    dispatch({
      type: UPDATE_COMMENTS,
      payload: res.data,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    const msg = err.response.data.msg;

    if (msg) {
      dispatch(setAlert(msg, 'danger'));
    }
  }
};
