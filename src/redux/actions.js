import {
  SET_EMAIL, SET_NAME, SET_PASSWORD, SET_TOKEN, GET_COlUMNS, ADD_CARD, REMOVE_CARD, SHOW_CARD_DETAIL, UPDATE_CARD_TITLE, ADD_DESCRIPTION, ADD_LIST, REMOVE_LIST, UPDATE_LIST_TITLE, GET_CARDS,
} from './types';


export const SetEmail = email => ({
  type: SET_EMAIL,
  email,
});
export const SetPassword = password => ({
  type: SET_PASSWORD,
    password,
});
export const SetToken = token => ({
  type: SET_TOKEN,
    token,
});
export const SetName = name => ({
  type: SET_NAME,
  name,
});
export const getColumns = columns => ({
  type: GET_COlUMNS,
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

export const UpdateCardTitle = (cardId, updatedTitle) => ({
  type: UPDATE_CARD_TITLE,
  cardId,
  updatedTitle,
});
export const AddDescription = (addedDescription, cardId) => ({
  type: ADD_DESCRIPTION,
  addedDescription,
  cardId,
});
export const addList = (list) => ({
  type: ADD_LIST,
  list,
});
export const removeList = (listId) => ({
  type: REMOVE_LIST,
  listId,
});
export const updateLIstTitle = (listId, title) => ({
  type: UPDATE_LIST_TITLE,
  listId,
  title,
});

