import { SET_COLUMNS } from './types';

const columnsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_COLUMNS:
      return action.columns.sort((a, b) => a.id - b.id);
    default:
      return state;
  }
};

export default columnsReducer;
