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
  GET_CARDS,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_COMMENT,
  REMOVE_CARD_COMMENTS,
} from './types';
import axios from "axios";

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

export const getCards = cards => ({
  type: GET_CARDS,
  cards,
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

export const setColumnsThunk = (token) => {
  return (dispatch) => {
      axios
          .get(`http://trello-purrweb.herokuapp.com/columns`, {
            headers: { Authorization: token },
          })
          .then(response => {
            dispatch(setColumns(response.data));
          });
  }
}

export const getAuthUserData = (email, name, password, navigationMyDesc ) => {
  return (dispatch) => {
    axios
        .post(`http://trello-purrweb.herokuapp.com/auth/sign-up`, {
          email,
          name,
          password,
        })
        .then(response => {
          let token = `Bearer ${response.data.token}`
          dispatch(setToken(token));
          navigationMyDesc();
        });
  }
}

