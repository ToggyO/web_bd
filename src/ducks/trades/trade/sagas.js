import { takeLatest, call, put } from 'redux-saga/effects';
import { message } from 'antd';
import { ROUTES } from '@config/constants';
import history from '@services/history';
import api from '@services/api';
import * as types from './types';

function* postTrade(action) {
  try {
    const data = yield call(api.trades.postTrade, action.payload);
    yield put({ type: types.POST_TRADE_SUCCESS, payload: data });
    yield call(history.push, ROUTES.USER_DASHBOARD);
    yield call(message.success, 'Success! Your trade has been added');
  } catch (error) {
    yield put({ type: types.POST_TRADE_ERROR, payload: error });
  }
}

export function* postTradeSaga() {
  yield takeLatest(types.POST_TRADE_REQUEST, postTrade);
}

function* getTradeById(action) {
  try {
    const { data } = yield call(api.trades.getTradeById, action.payload);
    yield put({ type: types.GET_TRADE_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_TRADE_BY_ID_ERROR, payload: error });
    yield call(history.push, ROUTES.USER_DASHBOARD);
  }
}

export function* getTradeByIdSaga() {
  yield takeLatest(types.GET_TRADE_BY_ID_REQUEST, getTradeById);
}

function* editTrade(action) {
  try {
    const { data } = yield call(api.trades.editTrade, action.payload);
    yield put({ type: types.EDIT_TRADE_SUCCESS, payload: data });
    console.log(data.id);
    yield call(history.push, {
      pathname: ROUTES.USER_DASHBOARD,
      state: { id: data.id },
    });
    yield call(message.success, 'Success! Trade has been changed');
  } catch (error) {
    yield put({ type: types.EDIT_TRADE_ERROR, payload: error });
  }
}

export function* editTradeSaga() {
  yield takeLatest(types.EDIT_TRADE_REQUEST, editTrade);
}
