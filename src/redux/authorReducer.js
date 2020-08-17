import { SET_AUTHOR, SET_TOKEN } from './types';

const authorReducer = (
  state = {
    email: '',
    name: '',
    password: '',
    token: 'Bearer 5e750d435ea2a08ff2a64654592b4a94453293e3a70fcf8bcc06ff2c3945a512',
  },
  action,
) => {
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
