import { GET_COlUMNS, ADD_LIST, REMOVE_LIST, UPDATE_LIST_TITLE } from './types';

const columnsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_COlUMNS:
            return action.columns;
        case ADD_LIST:
            return [...state, action.list];
        case REMOVE_LIST:
            return state.filter(({ id }) => id !== action.listId);
        case UPDATE_LIST_TITLE:
            return state.map(list => {
                if (list.id === action.listId) {
                return { ...list, title: action.title };
                }
                return card;
            });
        default:
            return state;
    }
};

export default columnsReducer;
