import axios from 'axios';
import {
  SET_EMAIL,
  SET_NAME,
  SET_PASSWORD,
  SET_TOKEN,
  SET_COLUMNS,
  ADD_CARD,
  REMOVE_CARD,
  SHOW_CARD_DETAIL,
  UPDATE_CARD_TITLE,
  ADD_DESCRIPTION,
  ADD_LIST,
  REMOVE_LIST,
  UPDATE_LIST_TITLE,
  SET_CARDS,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_COMMENT,
  REMOVE_CARD_COMMENTS,
  SET_COMMENTS,
  SET_AUTHOR,
} from './types';

export const setEmail = email => ({
  type: SET_EMAIL,
  email,
});

export const setPassword = password => ({
  type: SET_PASSWORD,
  password,
});

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const setName = name => ({
  type: SET_NAME,
  name,
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

export const addCard = card => ({
  type: ADD_CARD,
  card,
});

export const removeCard = cardId => ({
  type: REMOVE_CARD,
  cardId,
});

export const UpdateShowCardDetail = cardId => ({
  type: SHOW_CARD_DETAIL,
  cardId,
});

export const UpdateCardTitle = (cardId, title) => ({
  type: UPDATE_CARD_TITLE,
  cardId,
  title,
});

export const addDescription = (description, cardId) => ({
  type: ADD_DESCRIPTION,
  description,
  cardId,
});

export const addList = list => ({
  type: ADD_LIST,
  list,
});

export const removeList = listId => ({
  type: REMOVE_LIST,
  listId,
});

export const updateLIstTitle = (listId, title) => ({
  type: UPDATE_LIST_TITLE,
  listId,
  title,
});

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment,
});

export const removeComment = commentId => ({
  type: REMOVE_COMMENT,
  commentId,
});

export const updateComment = (commentId, body) => ({
  type: UPDATE_COMMENT,
  commentId,
  body,
});

export const removeCardComments = cardId => ({
  type: REMOVE_CARD_COMMENTS,
  cardId,
});

export const getAuthUserData = (email, name, password, navigationMyDesc) => dispatch => {
  axios
    .post(`http://trello-purrweb.herokuapp.com/auth/sign-up`, {
      email,
      name,
      password,
    })
    .then(response => {
      const token = `Bearer ${response.data.token}`;
      dispatch(setToken(token));
      navigationMyDesc();
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
