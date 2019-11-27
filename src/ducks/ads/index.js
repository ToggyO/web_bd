import { combineReducers } from 'redux';

import ad from './ad/reducer';
import ads from './ads/reducer';
import buy from './buy/reducer';
import sell from './sell/reducer';
import search from './search/reducer';

import * as adsSelectors from './selectors';
import * as searchSelectors from './search/selectors';

export { adActions } from './ad';
export { adsActions } from './ads';
export { buyAdsActions } from './buy';
export { sellAdsActions } from './sell';
export { searchActions } from './search';

export { adSagas } from './ad';
export { adsSagas } from './ads';
export { buyAdsSagas } from './buy';
export { sellAdsSagas } from './sell';

export { adsSelectors };
export { searchSelectors };

export default combineReducers({ buy, sell, search, ad, ads });
