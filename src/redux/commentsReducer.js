import {
  REMOVE_CARD_COMMENTS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_FAILURE,
} from './types';

const commentsReducer = (
  state = {
    comments: [],
    isFetchingGetComments: false,
    errorGetComments: null,
    isFetchingAddComment: false,
    errorAddComment: null,
    isFetchingDeleteComment: false,
    errorDeleteComment: null,
    isFetchingUpdateComment: false,
    errorUpdateComment: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return { ...state, isFetchingGetComments: true };
    case GET_COMMENTS_FAILURE:
      return { ...state, errorGetComments: action.error, isFetchingGetComments: false };
    case GET_COMMENTS_SUCCESS:
      return { ...state, comments: action.comments.sort((a, b) => a.id - b.id), isFetchingGetComments: false };
    case ADD_COMMENT_REQUEST:
      return { ...state, isFetchingAddComment: true };
    case ADD_COMMENT_FAILURE:
      return { ...state, errorAddComment: action.error, isFetchingAddComment: false };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [
          ...state.comments,
          {
            id: action.id,
            body: action.body,
            created: action.created,
            userId: action.userId,
            cardId: action.cardId,
          },
        ],
        isFetchingAddComment: false,
      };
    case DELETE_COMMENT_REQUEST:
      return { ...state, isFetchingDeleteComment: true };
    case DELETE_COMMENT_FAILURE:
      return { ...state, errorDeleteComment: action.error, isFetchingDeleteComment: false };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(({ id }) => id !== action.id),
        isFetchingDeleteComment: false,
      };
    case REMOVE_CARD_COMMENTS:
      return { ...state, comments: state.comments.filter(comment => comment.cardId !== action.cardId) };
    case UPDATE_COMMENT_REQUEST:
      return { ...state, isFetchingUpdateComment: true };
    case UPDATE_COMMENT_FAILURE:
      return { ...state, errorUpdateComment: action.error, isFetchingUpdateComment: false };
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === action.id) {
            return { ...comment, body: action.body };
          }
          return comment;
        }),
        isFetchingUpdateComment: false,
      };
    default:
      return state;
  }
};
export default commentsReducer;
