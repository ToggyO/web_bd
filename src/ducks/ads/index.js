import { combineReducers } from 'redux';

import ad from './ad/reducer';
import ads from './ads/reducer';

export { adActions } from './ad';
export { adsActions } from './ads';

export { adTypes } from './ad';
export { adsTypes } from './ads';

export { adSagas } from './ad';
export { adsSagas } from './ads';

export { adSelectors } from './ad';
export { adsSelectors } from './ads';

export default combineReducers({ ad, ads });
