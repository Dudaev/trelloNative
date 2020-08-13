import { SET_AUTHOR, SET_TOKEN } from './types';

const authorReducer = (state = { email: '', name: '', password: '', token: '' }, action) => {
  switch (action.type) {
    case SET_AUTHOR:
      return action.author;
    case SET_TOKEN:
      return { ...state, token: action.token };
    default:
      return state;
  }
};

export default authorReducer;
