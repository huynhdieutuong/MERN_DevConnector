import { GET_POSTS, POST_ERROR } from '../types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        posts: [],
        post: null,
        loading: false,
      };
    default:
      return state;
  }
}
