import { combineReducers } from 'redux';

import profile from './profile';
import reviews from './reviews';

export default combineReducers({ profile, reviews });
