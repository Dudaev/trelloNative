import { ADD_COMMENT, REMOVE_CARD_COMMENTS, REMOVE_COMMENT, SET_COMMENTS, UPDATE_COMMENT } from './types';

const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;
    case REMOVE_CARD_COMMENTS:
      return state.filter(comment => comment.cardId !== action.cardId);
    case ADD_COMMENT:
      return [...state, action.comment];
    case REMOVE_COMMENT:
      return state.filter(({ id }) => id !== action.commentId);
    case UPDATE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.commentId) {
          return { ...comment, body: action.body };
        }
        return comment;
      });
    default:
      return state;
  }
};
export default commentsReducer;
