import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { saveTokens, saveUserName, logout } from './middleware';
import auth, { authSagas } from './ducks/auth';
import user, { userSagas } from './ducks/user';

export function getStore() {
  const reducer = combineReducers({ auth, user });
  const sagas = { ...authSagas, ...userSagas };
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, saveTokens, saveUserName, logout];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  Object.values(sagas).forEach(saga => sagaMiddleware.run(saga));
  return store;
}
