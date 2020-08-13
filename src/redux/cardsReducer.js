import { SET_CARDS } from './types';

const cardsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CARDS:
      return action.cards.sort((a, b) => a.id - b.id);
    default:
      return state;
  }
};
export default cardsReducer;
