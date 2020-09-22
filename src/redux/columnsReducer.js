import {
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_FAILURE,
  GET_LISTS_SUCCESS,
  GET_LISTS_REQUEST,
  GET_LISTS_FAILURE,
  ADD_LIST_REQUEST,
  ADD_LIST_FAILURE,
  ADD_LIST_SUCCESS,
  REMOVE_LIST_REQUEST,
  REMOVE_LIST_FAILURE,
  REMOVE_LIST_SUCCESS,
} from './types';

const columnsReducer = (
  state = {
    columns: [],
    isFetchingUpdate: false,
    errorUpdate: null,
    isFetchingGetLists: false,
    errorGetLists: null,
    isFetchingAddList: false,
    errorAddList: null,
    isFetchingRemove: false,
    errorRemove: null,
  },
  action,
) => {
  switch (action.type) {
    case ADD_LIST_REQUEST:
      return { ...state, isFetchingAddList: true };
    case ADD_LIST_FAILURE:
      return { ...state, errorAddList: action.error, isFetchingAddList: false };
    case ADD_LIST_SUCCESS:
      return {
        ...state,
        columns: [...state.columns, { id: action.id, title: action.title, userId: action.userId }],
        isFetchingAddList: false,
      };
    case GET_LISTS_REQUEST:
      return { ...state, isFetchingGetLists: true };
    case GET_LISTS_FAILURE:
      return { ...state, errorGetLists: action.error, isFetchingGetLists: false };
    case GET_LISTS_SUCCESS:
      return { ...state, columns: action.columns.sort((a, b) => a.id - b.id), isFetchingGetLists: false };
    case UPDATE_LIST_REQUEST:
      return { ...state, isFetchingUpdate: true };
    case UPDATE_LIST_FAILURE:
      return { ...state, errorUpdate: action.error, isFetchingUpdate: false };
    case UPDATE_LIST_SUCCESS:
      return {
        ...state,
        columns: state.columns.map(column => {
          if (column.id === action.id) {
            return { ...column, title: action.title };
          }
          return column;
        }),
        isFetchingUpdate: false,
      };
    case REMOVE_LIST_REQUEST:
      return { ...state, isFetchingRemove: true };
    case REMOVE_LIST_FAILURE:
      return { ...state, errorUpdate: action.error, isFetchingRemove: false };
    case REMOVE_LIST_SUCCESS:
      return {
        ...state,
        columns: state.columns.filter(({ id }) => id !== action.id),
        isFetchingRemove: false,
      };
    default:
      return state;
  }
};

export default columnsReducer;
