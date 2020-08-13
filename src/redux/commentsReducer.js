import { REMOVE_CARD_COMMENTS, SET_COMMENTS } from './types';

const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments.sort((a, b) => a.id - b.id);
    case REMOVE_CARD_COMMENTS:
      return state.filter(comment => comment.cardId !== action.cardId);
    default:
      return state;
  }
};
export default commentsReducer;
