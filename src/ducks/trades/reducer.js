import { combineReducers } from 'redux';

import trades from './trades/reducer';
import trade from './trade/reducer';
import review from './review/reducer';

export default combineReducers({ trades, trade, review });
