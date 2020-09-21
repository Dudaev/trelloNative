import { SET_COLUMNS, UPDATE_LIST_SUCCESS, UPDATE_LIST_REQUEST, UPDATE_LIST_FAILURE } from './types';

const columnsReducer = (
  state = {
    columns: [],
    isFetching: false,
  },
  action,
) => {
  switch (action.type) {
    case SET_COLUMNS:
      return { ...state, columns: action.columns.sort((a, b) => a.id - b.id), isFetching: false };
    case UPDATE_LIST_REQUEST:
      return { ...state, isFetching: true };
    case UPDATE_LIST_FAILURE:
      console.log(action.error);
      return { ...state, isFetching: false };
    case UPDATE_LIST_SUCCESS:
      return {
        ...state,
        columns: state.columns.map(column => {
          if (column.id === action.id) {
            return { ...column, title: action.title };
          }
          return column;
        }),
        isFetching: false,
      };
    default:
      return state;
  }
};

export default columnsReducer;
