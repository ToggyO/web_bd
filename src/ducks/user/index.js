import { combineReducers } from 'redux';

import ads from './ads';
import profile from './profile';
import reviews from './reviews';

export { adsTypes, adsActions, adsSelectors, adsSagas } from './ads';
export { profileTypes, profileActions, profileSelectors, profileSagas } from './profile';
export { reviewsTypes, reviewsActions, reviewsSelectors, reviewsSagas } from './reviews';

export default combineReducers({ ads, profile, reviews });
