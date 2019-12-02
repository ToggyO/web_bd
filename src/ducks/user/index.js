import { combineReducers } from 'redux';

import profile from './profile';
import reviews from './reviews';

export { profileTypes, profileActions, profileSelectors, profileSagas } from './profile';
export { reviewsTypes, reviewsActions, reviewsSelectors, reviewsSagas } from './reviews';

export default combineReducers({ profile, reviews });
