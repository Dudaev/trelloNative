import { combineReducers } from 'redux';
import authorReducer from './authorReducer';
import columnsReducer from './columnsReducer';
import cardsReducer from './cardsReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
  authorReducer,
  columnsReducer,
  cardsReducer,
  commentsReducer,
});
export default rootReducer;
