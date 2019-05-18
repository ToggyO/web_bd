import { combineReducers } from 'redux';
import data from './data/reducer';
import scenes from './scenes/reducer';

export default combineReducers({ data, scenes });
