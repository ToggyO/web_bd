import { combineReducers } from 'redux';
import user from './user/reducer';
import other from './other/reducer';

export default combineReducers({ user, other });
