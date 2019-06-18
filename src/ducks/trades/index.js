import { combineReducers } from 'redux';
import buy from './buy/reducer';
import sell from './sell/reducer';

export default combineReducers({ buy, sell });
