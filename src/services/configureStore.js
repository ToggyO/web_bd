/* eslint-disable import/no-duplicates */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { saveTokens, saveUserData, renewCountryDataOnTokenRefresh, clearUserData } from '../middleware';

import _global from '@ducks/_global';
import ads from '@ducks/ads';
import auth from '@ducks/auth';
import chat from '@ducks/chat';
import me from '@ducks/me';
import trades from '@ducks/trades';
import user from '@ducks/user';

import adds from '@ducks/adds';

import { _globalSagas } from '@ducks/_global';
import { adSagas, adsSagas } from '@ducks/ads';
import { authSagas } from '@ducks/auth';
import { chatSagas } from '@ducks/chat';
import { meSagas } from '@ducks/me';
import { tradeSagas, tradesSagas, reviewSagas } from '@ducks/trades';
import { profileSagas, reviewsSagas } from '@ducks/user';

import { addsSagas } from '@ducks/adds';

export default function configureStore() {
  const reducer = combineReducers({ _global, ads, auth, chat, me, trades, user, adds });
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

    ...addsSagas,
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
