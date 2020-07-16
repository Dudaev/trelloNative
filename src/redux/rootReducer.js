import { combineReducers } from 'redux';
import authorReducer from "./authorReducer";
import columnsReducer from "./columnsReducer";
import cardsReducer from "./cardsReduser";

const rootReducer = combineReducers({
  authorReducer,
  columnsReducer,
  cardsReducer,
});
export default rootReducer;
