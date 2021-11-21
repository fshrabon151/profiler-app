import { combineReducers } from 'redux';
import { authReducer, userReducer } from './auth';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
});
