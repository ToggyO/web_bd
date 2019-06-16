import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from '@ducks/auth/reducer';
import * as authSagas from '@ducks/auth/sagas';
import user from '@ducks/user/reducer';
import * as userSagas from '@ducks/user/sagas';
import _global from '@ducks/_global';
import { saveTokens, saveUserName, logout } from '../middleware';

export default function configureStore() {
  const reducer = combineReducers({ _global, auth, user });
  const sagas = { ...authSagas, ...userSagas };
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, saveTokens, saveUserName, logout];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  Object.values(sagas).forEach(saga => sagaMiddleware.run(saga));
  return store;
}
