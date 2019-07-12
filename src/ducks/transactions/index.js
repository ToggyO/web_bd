import { combineReducers } from 'redux';
import transactions from './transactions/reducer';
import * as transactionsSelectors from './selectors';

export { transactionsSelectors };

export default combineReducers({ transactions });
