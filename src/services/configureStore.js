/* eslint-disable import/no-duplicates */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { saveTokens, saveUserData, renewCountryDataOnTokenRefresh, clearUserData } from '../middleware';

import _global from '@ducks/_global/reducer';
import ads from '@ducks/ads/reducer';
import auth from '@ducks/auth/reducer';
import chat from '@ducks/chat/reducer';
import me from '@ducks/me/reducer';
import trades from '@ducks/trades/reducer';
import user from '@ducks/user/reducer';

import { _globalSagas } from '@ducks/_global';
import { adSagas, adsSagas } from '@ducks/ads';
import { authSagas } from '@ducks/auth';
import { chatSagas } from '@ducks/chat';
import { meSagas } from '@ducks/me';
import { tradeSagas, tradesSagas, reviewSagas } from '@ducks/trades';
import { profileSagas, reviewsSagas } from '@ducks/user';

export default function configureStore() {
  const reducer = combineReducers({ _global, ads, auth, chat, me, trades, user });
  const sagas = {
    ..._globalSagas,
    ...adSagas,
    ...adsSagas,
    ...authSagas,
    ...chatSagas,
    ...meSagas,
    ...tradeSagas,
    ...tradesSagas,
    ...reviewSagas,
    ...profileSagas,
    ...reviewsSagas,
  };
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    saveTokens,
    saveUserData,
    renewCountryDataOnTokenRefresh,
    clearUserData,
  ];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  Object.values(sagas).forEach(saga => sagaMiddleware.run(saga));
  return store;
}
