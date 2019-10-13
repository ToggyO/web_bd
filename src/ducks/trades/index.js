import { combineReducers } from 'redux';

import trades from './trades/reducer';
import trade from './trade/reducer';
import * as tradesSelectors from './selectors';

export { tradesSelectors };

export default combineReducers({ trades, trade });
