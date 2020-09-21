import { SET_AUTHOR, SET_TOKEN, SING_UP_REQUEST, SING_UP_FAILURE, SING_IN_REQUEST, SING_IN_FAILURE } from './types';

const authorReducer = (
  state = {
    id: '',
    email: '',
    name: '',
    token: 'null',
    isFetchingUp: false,
    isFetchingIn: false,
    errorUp: null,
    errorIn: null,
  },
  action,
) => {
  switch (action.type) {
    case SING_UP_REQUEST:
      return { ...state, isFetchingUp: true };
    case SING_UP_FAILURE:
      console.log(action.error);
      return { ...state, errorUp: action.error, isFetchingUp: false };
    case SING_IN_REQUEST:
      return { ...state, isFetchingIn: true };
    case SING_IN_FAILURE:
      console.log(action.error);
      return { ...state, errorIn: action.error, isFetchingIn: false };
    case SET_AUTHOR:
      return {
        ...state,
        id: action.id,
        email: action.email,
        name: action.name,
        token: action.token,
        isFetchingUp: false,
        isFetchingIn: false,
      };
    case SET_TOKEN:
      return { ...state, token: action.token };
    default:
      return state;
  }
};

export default authorReducer;
