import {
  GET_CARDS_SUCCESS,
  GET_CARDS_REQUEST,
  GET_CARDS_FAILURE,
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
} from './types';

const cardsReducer = (
  state = {
    cards: [],
    isFetchingGetCards: false,
    errorGetCards: null,
    isFetchingAddCard: false,
    errorAddCard: null,
    isFetchingRemoveCard: false,
    errorRemoveCard: null,
    isFetchingUpdateCard: false,
    errorUpdateCard: null,
    isFetchingUpdateCardDescription: false,
    errorUpdateCardDescription: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_CARDS_REQUEST:
      return { ...state, isFetchingGetCards: true };
    case GET_CARDS_FAILURE:
      return { ...state, errorGetCards: action.error, isFetchingGetCards: false };
    case GET_CARDS_SUCCESS:
      return { ...state, cards: action.cards.sort((a, b) => a.id - b.id), isFetchingGetCards: false };
    case UPDATE_CARD_DESCRIPTION_REQUEST:
      return { ...state, isFetchingUpdateCardDescription: true };
    case UPDATE_CARD_DESCRIPTION_FAILURE:
      return { ...state, errorUpdateCardDescription: action.error, isFetchingUpdateCardDescription: false };
    case UPDATE_CARD_DESCRIPTION_SUCCESS:
      return {
        ...state,
        cards: state.cards.map(card => {
          if (card.id === action.id) {
            return { ...card, description: action.description };
          }
          return card;
        }),
        isFetchingUpdateCard: false,
      };
    case REMOVE_CARD_REQUEST:
      return { ...state, isFetchingRemoveCard: true };
    case REMOVE_CARD_FAILURE:
      return { ...state, errorRemoveCard: action.error, isFetchingRemoveCard: false };
    case REMOVE_CARD_SUCCESS:
      return { ...state, cards: state.cards.filter(({ id }) => id !== action.id), isFetchingRemoveCard: false };
    case UPDATE_CARD_REQUEST:
      return { ...state, isFetchingUpdateCard: true };
    case UPDATE_CARD_FAILURE:
      return { ...state, errorUpdateCard: action.error, isFetchingUpdateCard: false };
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.map(card => {
          if (card.id === action.id) {
            return { ...card, title: action.title };
          }
          return card;
        }),
        isFetchingUpdateCard: false,
      };
    case ADD_CARD_REQUEST:
      return { ...state, isFetchingAddCard: true };
    case ADD_CARD_FAILURE:
      return { ...state, errorAddCard: action.error, isFetchingAddCard: false };
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        cards: [
          ...state.cards,
          {
            id: action.id,
            title: action.title,
            description: action.description,
            checked: action.checked,
            columnId: action.column,
          },
        ],
        isFetchingAddCard: false,
      };
    default:
      return state;
  }
};
export default cardsReducer;
