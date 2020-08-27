import axios from 'axios';
import { AsyncStorage } from 'react-native';
import {
  SET_TOKEN,
  SET_COLUMNS,
  SET_CARDS,
  REMOVE_CARD_COMMENTS,
  SET_COMMENTS,
  SET_AUTHOR,
  SWITCH_CARD,
  SWITCH_LIST,
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

export const setAuthor = author => ({
  type: SET_AUTHOR,
  author,
});

export const removeCardComments = cardId => ({
  type: REMOVE_CARD_COMMENTS,
  cardId,
});

const storeData = async () => {
  try {
    await AsyncStorage.setItem('@storage_Key', '1');
  } catch (e) {
    // saving error
  }
};

export const getAuthUserData = (email, name, password, navigationMyDesc) => dispatch => {
  axios
    .post(`http://trello-purrweb.herokuapp.com/auth/sign-up`, {
      email,
      name,
      password,
    })
    .then(response => {
      dispatch(setAuthor(response.data));
      const token = `Bearer ${response.data.token}`;
      dispatch(setToken(token));
      navigationMyDesc();
      storeData();
    });
};

export const signInThunk = (email, password, navigationMyDesc) => dispatch => {
  axios
    .post(`http://trello-purrweb.herokuapp.com/auth/sign-in`, {
      email,
      password,
    })
    .then(response => {
      dispatch(setAuthor(response.data));
      const token = `Bearer ${response.data.token}`;
      dispatch(setToken(token));
      navigationMyDesc();
    });
};

export const getListsThunk = token => dispatch => {
  axios
    .get(`http://trello-purrweb.herokuapp.com/columns`, {
      headers: { Authorization: token },
    })
    .then(response => {
      dispatch(setColumns(response.data));
    });
};

export const addListThunk = (id, title, token) => dispatch => {
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
      dispatch(getListsThunk(token));
    });
};

export const removeListThunk = (id, token) => dispatch => {
  axios
    .delete(`http://trello-purrweb.herokuapp.com/columns/${id}`, {
      headers: { Authorization: token },
    })
    .then(() => {
      dispatch(getListsThunk(token));
    });
};

export const PutListThunk = (id, title, token) => dispatch => {
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
    .then(() => {
      dispatch(getListsThunk(token));
    });
};

export const getCardsThunk = token => dispatch => {
  axios
    .get(`http://trello-purrweb.herokuapp.com/cards`, {
      headers: { Authorization: token },
    })
    .then(response => {
      dispatch(setCards(response.data));
    });
};

export const addCardThunk = (title, description, checked, column, token) => dispatch => {
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
      dispatch(getCardsThunk(token));
    });
};

export const removeCardThunk = (id, token) => dispatch => {
  axios
    .delete(`http://trello-purrweb.herokuapp.com/cards/${id}`, {
      headers: { Authorization: token },
    })
    .then(() => {
      dispatch(removeCardComments(id));
      dispatch(getCardsThunk(token));
    });
};

export const PutCardThunk = (id, title, token) => dispatch => {
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
      dispatch(getCardsThunk(token));
    });
};

export const PutCardDescriptionThunk = (id, description, token) => dispatch => {
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
      dispatch(getCardsThunk(token));
    });
};

export const getCommentsThunk = token => dispatch => {
  axios
    .get(`http://trello-purrweb.herokuapp.com/comments`, {
      headers: { Authorization: token },
    })
    .then(response => {
      dispatch(setComments(response.data));
    });
};

export const addCommentThunk = (cardId, body, token) => dispatch => {
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
      dispatch(getCommentsThunk(token));
    });
};

export const deleteCommentThunk = (commentId, token) => dispatch => {
  axios
    .delete(`http://trello-purrweb.herokuapp.com/comments/${commentId}`, {
      headers: { Authorization: token },
    })
    .then(() => {
      dispatch(getCommentsThunk(token));
    });
};

export const PutCommentThunk = (CommentId, body, token) => dispatch => {
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
      dispatch(getCommentsThunk(token));
    });
};
