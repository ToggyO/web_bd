import { combineReducers } from 'redux';
import buy from './buy/reducer';
import sell from './sell/reducer';
import searchParams from './searchParams/reducer';
import trade from './trade/reducer';

import * as tradesSelectors from './selectors';

export { tradesSelectors };

export default combineReducers({ buy, sell, searchParams, trade });
