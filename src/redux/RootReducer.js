import {combineReducers} from 'redux';
import userInfoReducer from './Reducer';

const rootReducer = combineReducers({
  //   themeReducer: themeReducer,
  userInfoReducer,
});

export default rootReducer;
