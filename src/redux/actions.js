import axios from 'axios';
import { AsyncStorage } from 'react-native';
import {
  SET_TOKEN,
  REMOVE_CARD_COMMENTS,
  SET_AUTHOR,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_FAILURE,
  UPDATE_LIST_SUCCESS,
  SING_UP_REQUEST,
  SING_UP_FAILURE,
  SING_IN_REQUEST,
  SING_IN_FAILURE,
  GET_LISTS_REQUEST,
  GET_LISTS_FAILURE,
  GET_LISTS_SUCCESS,
  ADD_LIST_REQUEST,
  ADD_LIST_FAILURE,
  ADD_LIST_SUCCESS,
  REMOVE_LIST_REQUEST,
  REMOVE_LIST_FAILURE,
  REMOVE_LIST_SUCCESS,
  GET_CARDS_REQUEST,
  GET_CARDS_FAILURE,
  GET_CARDS_SUCCESS,
  ADD_CARD_REQUEST,
  ADD_CARD_FAILURE,
  ADD_CARD_SUCCESS,
  REMOVE_CARD_REQUEST,
  REMOVE_CARD_FAILURE,
  REMOVE_CARD_SUCCESS,
  UPDATE_CARD_REQUEST,
  UPDATE_CARD_FAILURE,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_DESCRIPTION_REQUEST,
  UPDATE_CARD_DESCRIPTION_FAILURE,
  UPDATE_CARD_DESCRIPTION_SUCCESS,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_FAILURE,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_FAILURE,
  UPDATE_COMMENT_SUCCESS,
} from './types';

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const setAuthor = (id, email, name, token) => ({
  type: SET_AUTHOR,
  id,
  email,
  name,
  token,
});

export const removeCardComments = cardId => ({
  type: REMOVE_CARD_COMMENTS,
  cardId,
});

export const updateListRequest = () => ({
  type: UPDATE_LIST_REQUEST,
});

export const updateListFailure = error => ({
  type: UPDATE_LIST_FAILURE,
  error,
});

export const updateListSuccess = (id, title) => ({
  type: UPDATE_LIST_SUCCESS,
  id,
  title,
});

export const getListsRequest = () => ({
  type: GET_LISTS_REQUEST,
});

export const getListsFailure = error => ({
  type: GET_LISTS_FAILURE,
  error,
});

export const getListsSuccess = columns => ({
  type: GET_LISTS_SUCCESS,
  columns,
});

export const signUpRequest = () => ({
  type: SING_UP_REQUEST,
});

export const signUpFailure = error => ({
  type: SING_UP_FAILURE,
  error,
});

export const signInRequest = () => ({
  type: SING_IN_REQUEST,
});

export const signInFailure = error => ({
  type: SING_IN_FAILURE,
  error,
});

const storeData = async () => {
  try {
    await AsyncStorage.setItem('token', '1');
  } catch (e) {
    // saving error
  }
};

export const addListRequest = () => ({
  type: ADD_LIST_REQUEST,
});

export const addListFailure = error => ({
  type: ADD_LIST_FAILURE,
  error,
});

export const addListSuccess = (id, title, userId) => ({
  type: ADD_LIST_SUCCESS,
  id,
  title,
  userId,
});

export const removeListRequest = () => ({
  type: REMOVE_LIST_REQUEST,
});

export const removeListFailure = error => ({
  type: REMOVE_LIST_FAILURE,
  error,
});

export const removeListSuccess = id => ({
  type: REMOVE_LIST_SUCCESS,
  id,
});

export const getCardsRequest = () => ({
  type: GET_CARDS_REQUEST,
});

export const getCardsFailure = error => ({
  type: GET_CARDS_FAILURE,
  error,
});

export const getCardsSuccess = cards => ({
  type: GET_CARDS_SUCCESS,
  cards,
});

export const addCardRequest = () => ({
  type: ADD_CARD_REQUEST,
});

export const addCardFailure = error => ({
  type: ADD_CARD_FAILURE,
  error,
});

export const addCardSuccess = (title, description, checked, column, id) => ({
  type: ADD_CARD_SUCCESS,
  title,
  description,
  checked,
  column,
  id,
});

export const removeCardRequest = () => ({
  type: REMOVE_CARD_REQUEST,
});

export const removeCardFailure = error => ({
  type: REMOVE_CARD_FAILURE,
  error,
});

export const removeCardSuccess = id => ({
  type: REMOVE_CARD_SUCCESS,
  id,
});

export const updateCardRequest = () => ({
  type: UPDATE_CARD_REQUEST,
});

export const updateCardFailure = error => ({
  type: UPDATE_CARD_FAILURE,
  error,
});

export const updateCardSuccess = (id, title) => ({
  type: UPDATE_CARD_SUCCESS,
  id,
  title,
});

export const updateCardDescriptionRequest = () => ({
  type: UPDATE_CARD_DESCRIPTION_REQUEST,
});

export const updateCardDescriptionFailure = error => ({
  type: UPDATE_CARD_DESCRIPTION_FAILURE,
  error,
});

export const updateCardDescriptionSuccess = (id, description) => ({
  type: UPDATE_CARD_DESCRIPTION_SUCCESS,
  id,
  description,
});

export const getCommentsRequest = () => ({
  type: GET_COMMENTS_REQUEST,
});

export const getCommentsFailure = error => ({
  type: GET_COMMENTS_FAILURE,
  error,
});

export const getCommentsSuccess = comments => ({
  type: GET_COMMENTS_SUCCESS,
  comments,
});

export const addCommentRequest = () => ({
  type: ADD_COMMENT_REQUEST,
});

export const addCommentFailure = error => ({
  type: ADD_COMMENT_FAILURE,
  error,
});

export const addCommentSuccess = (id, body, created, userId, cardId) => ({
  type: ADD_COMMENT_SUCCESS,
  id,
  body,
  created,
  userId,
  cardId,
});

export const deleteCommentRequest = () => ({
  type: DELETE_COMMENT_REQUEST,
});

export const deleteCommentFailure = error => ({
  type: DELETE_COMMENT_FAILURE,
  error,
});

export const deleteCommentSuccess = id => ({
  type: DELETE_COMMENT_SUCCESS,
  id,
});

export const signUp = (email, name, password, navigationMyDesc) => dispatch => {
  dispatch(signUpRequest());
  axios
    .post(`http://trello-purrweb.herokuapp.com/auth/sign-up`, {
      email,
      name,
      password,
    })
    .catch(error => {
      dispatch(signUpFailure(error));
    })
    .then(response => {
      dispatch(setAuthor((response.data.id, response.data.email, response.data.name, response.data.token)));
      const token = `Bearer ${response.data.token}`;
      dispatch(setToken(token));
      navigationMyDesc();
      storeData();
    });
};

export const signIn = (email, password, navigationMyDesc) => dispatch => {
  dispatch(signInRequest());
  axios
    .post(`http://trello-purrweb.herokuapp.com/auth/sign-in`, {
      email,
      password,
    })
    .catch(error => {
      dispatch(signInFailure(error));
    })
    .then(response => {
      dispatch(setAuthor(response.data.id, response.data.email, response.data.name, response.data.token));
      const token = `Bearer ${response.data.token}`;
      dispatch(setToken(token));
      navigationMyDesc();
    });
};

export const getLists = () => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(getListsRequest());
  axios
    .get(`http://trello-purrweb.herokuapp.com/columns`, {
      headers: { Authorization: token },
    })
    .catch(error => {
      dispatch(getListsFailure(error));
    })
    .then(response => {
      dispatch(getListsSuccess(response.data));
    });
};

export const addList = (id, title) => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(addListRequest());
  axios
    .post(
      `http://trello-purrweb.herokuapp.com/columns`,
      {
        id,
        title,
      },
      {
        headers: { Authorization: token },
      },
    )
    .catch(error => {
      dispatch(addListFailure(error));
    })
    .then(response => {
      dispatch(addListSuccess(+response.data.id, response.data.title, +response.data.user));
    });
};

export const removeList = id => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(removeListRequest());
  axios
    .delete(`http://trello-purrweb.herokuapp.com/columns/${id}`, {
      headers: { Authorization: token },
    })
    .catch(error => {
      dispatch(removeListFailure(error));
    })
    .then(() => {
      dispatch(removeListSuccess(id));
    });
};

export const updateList = (id, title) => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(updateListRequest());
  axios
    .put(
      `http://trello-purrweb.herokuapp.com/columns/${id}`,
      {
        title,
      },
      {
        headers: { Authorization: token },
      },
    )
    .catch(error => {
      dispatch(updateListFailure(error));
    })
    .then(response => {
      dispatch(updateListSuccess(+response.data.id, response.data.title));
    });
};

export const getCards = () => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(getCardsRequest());
  axios
    .get(`http://trello-purrweb.herokuapp.com/cards`, {
      headers: { Authorization: token },
    })
    .catch(error => {
      dispatch(getCardsFailure(error));
    })
    .then(response => {
      dispatch(getCardsSuccess(response.data));
    });
};

export const addCard = (title, description, checked, column) => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(addCardRequest());
  axios
    .post(
      `http://trello-purrweb.herokuapp.com/cards`,
      {
        title,
        description,
        checked,
        column,
      },
      {
        headers: { Authorization: token },
      },
    )
    .catch(error => {
      dispatch(addCardFailure(error));
    })
    .then(response => {
      dispatch(
        addCardSuccess(
          response.data.title,
          response.data.description,
          !!response.data.checked,
          response.data.column,
          +response.data.id,
        ),
      );
    });
};

export const removeCard = id => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(removeCardRequest());
  axios
    .delete(`http://trello-purrweb.herokuapp.com/cards/${id}`, {
      headers: { Authorization: token },
    })
    .catch(error => {
      removeCardFailure(error);
    })
    .then(() => {
      dispatch(removeCardSuccess(id));
      dispatch(removeCardComments(id));
    });
};

export const updateCard = (id, title) => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(updateCardRequest());
  axios
    .put(
      `http://trello-purrweb.herokuapp.com/cards/${id}`,
      {
        title,
      },
      {
        headers: { Authorization: token },
      },
    )
    .catch(error => {
      dispatch(updateCardFailure(error));
    })
    .then(response => {
      dispatch(updateCardSuccess(response.data.id, response.data.title));
    });
};

export const updateCardDescription = (id, description) => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(updateCardDescriptionRequest());
  axios
    .put(
      `http://trello-purrweb.herokuapp.com/cards/${id}`,
      {
        description,
      },
      {
        headers: { Authorization: token },
      },
    )
    .catch(error => {
      updateCardDescriptionFailure(error);
    })
    .then(response => {
      dispatch(updateCardDescriptionSuccess(response.data.id, response.data.description));
    });
};

export const getComments = () => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(getCommentsRequest());
  axios
    .get(`http://trello-purrweb.herokuapp.com/comments`, {
      headers: { Authorization: token },
    })
    .catch(error => {
      getCommentsFailure(error);
    })
    .then(response => {
      dispatch(getCommentsSuccess(response.data));
    });
};

export const addComment = (cardId, body) => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(addCommentRequest());
  axios
    .post(
      `http://trello-purrweb.herokuapp.com/cards/${cardId}/comments`,
      {
        body,
      },
      {
        headers: { Authorization: token },
      },
    )
    .catch(error => {
      addCommentFailure(error);
    })
    .then(response => {
      dispatch(
        addCommentSuccess(
          response.data.id,
          response.data.body,
          response.data.created,
          response.data.user.id,
          response.data.card.id,
        ),
      );
    });
};

export const deleteComment = commentId => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(deleteCommentRequest());
  axios
    .delete(`http://trello-purrweb.herokuapp.com/comments/${commentId}`, {
      headers: { Authorization: token },
    })
    .catch(error => {
      addCommentFailure(error);
    })
    .then(() => {
      dispatch(deleteCommentSuccess(commentId));
    });
};

export const updateCommentRequest = () => ({
  type: UPDATE_COMMENT_REQUEST,
});

export const updateCommentFailure = error => ({
  type: UPDATE_COMMENT_FAILURE,
  error,
});

export const updateCommentSuccess = (id, body) => ({
  type: UPDATE_COMMENT_SUCCESS,
  id,
  body,
});

export const updateComment = (CommentId, body) => (dispatch, getState) => {
  const { token } = getState().authorReducer;
  dispatch(updateCommentRequest());
  axios
    .put(
      `http://trello-purrweb.herokuapp.com/comments/${CommentId}`,
      {
        body,
      },
      {
        headers: { Authorization: token },
      },
    )
    .catch(error => {
      updateCommentFailure(error);
    })
    .then(response => {
      dispatch(updateCommentSuccess(response.data.id, response.data.body));
    });
};
