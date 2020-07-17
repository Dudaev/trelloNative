import { combineReducers } from 'redux';
import authorReducer from "./authorReducer";
import columnsReducer from "./columnsReducer";
import cardsReducer from "./cardsReduser";
import commentsReducer from "./commentsReduser";

const rootReducer = combineReducers({
  authorReducer,
  columnsReducer,
  cardsReducer,
  commentsReducer,
});
export default rootReducer;
