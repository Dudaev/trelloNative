import { SET_AUTHOR, SET_TOKEN } from './types';

const authorReducer = (
  state = {
    email: '',
    name: '',
    password: '',
    token: 'null',
    isFetching: false,
  },
  action,
) => {
  switch (action.type) {
    case SET_AUTHOR:
      return action.author;
    case SET_TOKEN:
      return { ...state, token: action.token, isFetching: true };
    default:
      return state;
  }
};

export default authorReducer;
