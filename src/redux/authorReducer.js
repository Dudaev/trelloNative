import { SET_EMAIL, SET_NAME, SET_PASSWORD, SET_TOKEN } from './types';

const authorReducer = (state = { email: '', name: '', password: '', token: '' }, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.email };
    case SET_PASSWORD:
      return { ...state, password: action.password };
    case SET_TOKEN:
      return { ...state, token: action.token };
    case SET_NAME:
      return { ...state, name: action.name };
    default:
      return state;
  }
};

export default authorReducer;
