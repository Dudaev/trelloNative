import axios from 'axios';
import { AsyncStorage } from 'react-native';
import {
  SET_TOKEN,
  SET_COLUMNS,
  SET_CARDS,
  REMOVE_CARD_COMMENTS,
  SET_COMMENTS,
  SET_AUTHOR,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_FAILURE,
  UPDATE_LIST_SUCCESS,
  SING_UP_REQUEST,
  SING_UP_FAILURE,
  SING_IN_REQUEST,
  SING_IN_FAILURE,
} from './types';

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const setColumns = columns => ({
  type: SET_COLUMNS,
  columns,
});

export const setCards = cards => ({
  type: SET_CARDS,
  cards,
});

export const setComments = comments => ({
  type: SET_COMMENTS,
  comments,
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

export const getLists = token => dispatch => {
  axios
    .get(`http://trello-purrweb.herokuapp.com/columns`, {
      headers: { Authorization: token },
    })
    .then(response => {
      dispatch(setColumns(response.data));
    });
};

export const addList = (id, title, token) => dispatch => {
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
    .then(() => {
      dispatch(getLists(token));
    });
};

export const removeList = (id, token) => dispatch => {
  axios
    .delete(`http://trello-purrweb.herokuapp.com/columns/${id}`, {
      headers: { Authorization: token },
    })
    .then(() => {
      dispatch(getLists(token));
    });
};

export const updateList = (id, title, token) => dispatch => {
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
    .then(() => {
      dispatch(updateListSuccess(id, title));
    });
};

export const getCards = token => dispatch => {
  axios
    .get(`http://trello-purrweb.herokuapp.com/cards`, {
      headers: { Authorization: token },
    })
    .then(response => {
      dispatch(setCards(response.data));
    });
};

export const addCard = (title, description, checked, column, token) => dispatch => {
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
    .then(() => {
      dispatch(getCards(token));
    });
};

export const removeCard = (id, token) => dispatch => {
  axios
    .delete(`http://trello-purrweb.herokuapp.com/cards/${id}`, {
      headers: { Authorization: token },
    })
    .then(() => {
      dispatch(removeCardComments(id));
      dispatch(getCards(token));
    });
};

export const updateCard = (id, title, token) => dispatch => {
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
    .then(() => {
      dispatch(getCards(token));
    });
};

export const updateCardDescription = (id, description, token) => dispatch => {
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
    .then(() => {
      dispatch(getCards(token));
    });
};

export const getComments = token => dispatch => {
  axios
    .get(`http://trello-purrweb.herokuapp.com/comments`, {
      headers: { Authorization: token },
    })
    .then(response => {
      dispatch(setComments(response.data));
    });
};

export const addComment = (cardId, body, token) => dispatch => {
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
    .then(() => {
      dispatch(getComments(token));
    });
};

export const deleteComment = (commentId, token) => dispatch => {
  axios
    .delete(`http://trello-purrweb.herokuapp.com/comments/${commentId}`, {
      headers: { Authorization: token },
    })
    .then(() => {
      dispatch(getComments(token));
    });
};

export const updateComment = (CommentId, body, token) => dispatch => {
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
    .then(() => {
      dispatch(getComments(token));
    });
};
