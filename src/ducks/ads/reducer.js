import { combineReducers } from 'redux';

import ad from './ad/reducer';
import ads from './ads/reducer';
export default combineReducers({ ad, ads });
