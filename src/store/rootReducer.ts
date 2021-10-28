import { combineReducers } from '@reduxjs/toolkit';
import { reducer as notLoggedReducers } from '../slices/notLogged';
import { reducer as LoggedReducers } from '../slices/logged';

const rootReducer = combineReducers({
  notLogged: notLoggedReducers,
  Logged: LoggedReducers
});

export default rootReducer;
