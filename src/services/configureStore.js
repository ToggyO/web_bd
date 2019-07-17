import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from '@ducks/auth/reducer';
import user from '@ducks/user/reducer';
import _global from '@ducks/_global';
import ads from '@ducks/ads';
import transactions from '@ducks/transactions';
import * as authSagas from '@ducks/auth/sagas';
import * as userSagas from '@ducks/user/sagas';
import { buyAdsSagas } from '@ducks/ads/buy';
import { sellAdsSagas } from '@ducks/ads/sell';
import { adSagas } from '@ducks/ads/ad';
import { adsSagas } from '@ducks/ads/ads';
import { transactionSagas } from '@ducks/transactions/transaction';
import { transactionsSagas } from '@ducks/transactions/transactions';
import { saveTokens, saveUserName, logout } from '../middleware';

export default function configureStore() {
  const reducer = combineReducers({ _global, auth, user, ads, transactions });
  const sagas = {
    ...authSagas,
    ...userSagas,
    ...buyAdsSagas,
    ...sellAdsSagas,
    ...adSagas,
    ...adsSagas,
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
