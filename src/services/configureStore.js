import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from '@ducks/auth/reducer';
import user from '@ducks/user/reducer';
import _global from '@ducks/_global';
import trades from '@ducks/trades';
import transactions from '@ducks/transactions';
import * as authSagas from '@ducks/auth/sagas';
import * as userSagas from '@ducks/user/sagas';
import { buyTradesSagas } from '@ducks/trades/buy';
import { sellTradesSagas } from '@ducks/trades/sell';
import { tradeSagas } from '@ducks/trades/trade';
import { tradesSagas } from '@ducks/trades/trades';
import { transactionSagas } from '@ducks/transactions/transaction';
import { transactionsSagas } from '@ducks/transactions/transactions';
import { saveTokens, saveUserName, logout } from '../middleware';

export default function configureStore() {
  const reducer = combineReducers({ _global, auth, user, trades, transactions });
  const sagas = {
    ...authSagas,
    ...userSagas,
    ...buyTradesSagas,
    ...sellTradesSagas,
    ...tradeSagas,
    ...tradesSagas,
    ...transactionSagas,
    ...transactionsSagas,
  };
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, saveTokens, saveUserName, logout];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  Object.values(sagas).forEach(saga => sagaMiddleware.run(saga));
  return store;
}
