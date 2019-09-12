import { combineReducers } from 'redux';
import buy from './buy/reducer';
import sell from './sell/reducer';
import search from './search/reducer';
import ad from './ad/reducer';
import ads from './ads/reducer';

import * as adsSelectors from './selectors';

export { adsSelectors };

export default combineReducers({ buy, sell, search, ad, ads });
