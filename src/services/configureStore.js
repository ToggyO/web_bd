/* eslint-disable import/no-duplicates */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { saveTokens, saveUserData, renewCountryDataOnTokenRefresh, clearUserData } from '../middleware';

import _global from '@ducks/_global';
import auth from '@ducks/auth/reducer';
import me from '@ducks/me/reducer';
import ads from '@ducks/ads';
import trades from '@ducks/trades';
import chat from '@ducks/chat/reducer';

import * as authSagas from '@ducks/auth/sagas';
import * as meSagas from '@ducks/me/sagas';

import { globalSagas } from '@ducks/_global';
import { buyAdsSagas } from '@ducks/ads/buy';
import { sellAdsSagas } from '@ducks/ads/sell';
import { adSagas } from '@ducks/ads/ad';
import { adsSagas } from '@ducks/ads/ads';
import { tradeSagas } from '@ducks/trades/trade';
import { tradesSagas } from '@ducks/trades/trades';
import { chatSagas } from '@ducks/chat';

export default function configureStore() {
  const reducer = combineReducers({ _global, auth, me, ads, trades, chat });
  const sagas = {
    ...globalSagas,
    ...authSagas,
    ...meSagas,
    ...buyAdsSagas,
    ...sellAdsSagas,
    ...adSagas,
    ...adsSagas,
    ...tradeSagas,
    ...tradesSagas,
    ...chatSagas,
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
