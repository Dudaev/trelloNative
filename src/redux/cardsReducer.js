import { SET_CARDS } from './types';

const cardsReducer = (
  state = {
    cards: [],
    isFetching: false,
  },
  action,
) => {
  switch (action.type) {
    case SET_CARDS:
      return { ...state, cards: action.cards.sort((a, b) => a.id - b.id), isFetching: true };
    default:
      return state;
  }
};
export default cardsReducer;
