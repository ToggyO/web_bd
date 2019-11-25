import { combineReducers } from 'redux';

import ads, { adsTypes, adsActions, adsSelectors, adsSagas } from './ads';
import profile, { profileTypes, profileActions, profileSelectors, profileSagas } from './profile';
// import reviews, { reviewsTypes, reviewsActions, reviewsSelectors, reviewsSagas } from './reviews';

export { adsTypes, adsActions, adsSagas, adsSelectors };
export { profileTypes, profileActions, profileSagas, profileSelectors };
// export { reviewsTypes, reviewsActions, reviewsSagas, reviewsSelectors };

export default combineReducers({ ads, profile });
