import { combineReducers } from 'redux';

import trades from './trades/reducer';
import trade from './trade/reducer';
import review from './review/reducer';
import * as tradesSelectors from './selectors';
import * as reviewSelectors from './review/selectors';

export { reviewActions } from './review';
export { tradeActions } from './trade';
export { tradesActions } from './trades';

export { reviewSagas } from './review';
export { tradeSagas } from './trade';
export { tradesSagas } from './trades';

export { tradesSelectors, reviewSelectors };

export default combineReducers({ trades, trade, review });
