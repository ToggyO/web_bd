import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { saveTokens, catchErrors } from './middleware';
import auth, { authSagas } from './ducks/auth';

export function getStore() {
  const reducer = combineReducers({ auth });
  const sagas = { ...authSagas };
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, saveTokens, catchErrors];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  Object.values(sagas).forEach(saga => sagaMiddleware.run(saga));
  return store;
}
