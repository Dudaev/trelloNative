import { ADD_CARD, ADD_DESCRIPTION, REMOVE_CARD, SHOW_CARD_DETAIL, UPDATE_CARD_TITLE, SET_CARDS } from './types';

const cardsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CARDS:
      return action.cards;
    case ADD_CARD:
      return [...state, action.card];
    case REMOVE_CARD:
      return state.filter(({ id }) => id !== action.cardId);
    case SHOW_CARD_DETAIL:
      return state.map(card => {
        if (card.id === action.cardId) {
          return { ...card, showCardDetail: !card.showCardDetail };
        }
        return card;
      });
    case UPDATE_CARD_TITLE:
      return state.map(card => {
        if (card.id === action.cardId) {
          return { ...card, name: action.title };
        }
        return card;
      });
    case ADD_DESCRIPTION:
      return state.map(card => {
        if (card.id === action.cardId) {
          return { ...card, description: action.description };
        }
        return card;
      });
    default:
      return state;
  }
};
export default cardsReducer;
