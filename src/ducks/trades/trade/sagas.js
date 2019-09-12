import { takeLatest, put, call } from 'redux-saga/effects';
import api from '@services/api';
import { message, Modal } from 'antd';
import history from '@services/history';
import { ROUTES } from '@config/constants';
import { catchFromPath } from '@utils/index';
import * as types from './types';
import { tradesActions } from '../trades';

function* initiateTrade(action) {
  try {
    const { data } = yield call(api.trades.initiate, action.payload);
    yield put({ type: types.INITIATE_SUCCESS, payload: data });
    history.push(`${ROUTES.TRADES.ROOT}/${data.order}`);
  } catch (error) {
    yield call(message.error, error.response.data.errors[0].message, 3);
    yield put({ type: types.INITIATE_ERROR, payload: error });
  }
}

export function* initiateTradeSaga() {
  yield takeLatest(types.INITIATE_REQUEST, initiateTrade);
}

function* getTradeById(action) {
  try {
    const { data } = yield call(api.trades.getTradeById, action.payload);
    const {
      trade: { chat, ...rest },
      direction,
    } = data;
    yield put({ type: types.GET_BY_ID_SUCCESS, payload: { trade: rest, direction } });
  } catch (error) {
    yield call(history.push, ROUTES[404]);
    yield put({ type: types.GET_BY_ID_ERROR, payload: error });
  }
}

export function* getTradeByIdSaga() {
  yield takeLatest(types.GET_BY_ID_REQUEST, getTradeById);
}

function* confirmTrade(action) {
  try {
    const { data } = yield call(api.trades.confirm, action.payload);
    yield put({ type: types.CONFIRM_SUCCESS, payload: data });
    yield put({
      type: types.GET_BY_ID_REQUEST,
      payload: catchFromPath(history.location.pathname, 'trades'),
    });
  } catch (error) {
    yield call(message.error, error.response.data.errors[0].message, 3);
    yield put({ type: types.CONFIRM_ERROR, payload: error });
  }
}

export function* confirmTradeSaga() {
  yield takeLatest(types.CONFIRM_REQUEST, confirmTrade);
}

function* fiatSent(action) {
  try {
    const { data } = yield call(api.trades.fiatSent, action.payload);
    yield put({ type: types.FIAT_SENT_SUCCESS, payload: data });
    yield put({ type: types.GET_BY_ID_REQUEST, payload: data.trade.id });
  } catch (error) {
    yield put({ type: types.FIAT_SENT_ERROR, payload: error });
  }
}

export function* fiatSentSaga() {
  yield takeLatest(types.FIAT_SENT_REQUEST, fiatSent);
}

function* fiatReceived(action) {
  try {
    const { data } = yield call(api.trades.fiatReceived, action.payload);
    yield put({ type: types.FIAT_RECEIVED_SUCCESS, payload: data });
    yield put({ type: types.GET_BY_ID_REQUEST, payload: data.trade.id });
  } catch (error) {
    yield put({ type: types.FIAT_RECEIVED_ERROR, payload: error });
  }
}

export function* fiatReceivedSaga() {
  yield takeLatest(types.FIAT_RECEIVED_REQUEST, fiatReceived);
}

function* deleteNewTradeRequest(action) {
  try {
    const { data } = yield call(api.trades.deleteTraderqvst, action.payload);
    yield put({ type: types.DELETE_NEW_SUCCESS, payload: data });

    yield call(Modal.destroyAll);
    yield call(history.push, ROUTES.DASHBOARD.REQUESTS);
    yield put(tradesActions.getNewTradesRequest());

    yield call(message.success, 'Deleted!', 2);
  } catch (error) {
    yield put({ type: types.DELETE_NEW_ERROR, payload: error });
  }
}

export function* deleteNewTradeRequestSaga() {
  yield takeLatest(types.DELETE_NEW_REQUEST, deleteNewTradeRequest);
}

function* cancelTradeRequest(action) {
  try {
    const { data } = yield call(api.trades.cancelTrade, action.payload);
    yield put({ type: types.CANCEL_SUCCESS, payload: data });

    yield call(Modal.destroyAll);

    if (history.location.pathname === ROUTES.DASHBOARD.ACTIVE) {
      yield put(tradesActions.getActiveTradesRequest());
    } else {
      yield put({ type: types.GET_BY_ID_REQUEST, payload: data.trade.id });
    }

    yield call(message.success, 'Canceled!', 2);
  } catch (error) {
    yield put({ type: types.CANCEL_ERROR, payload: error });
  }
}

export function* cancelTradeRequestSaga() {
  yield takeLatest(types.CANCEL_REQUEST, cancelTradeRequest);
}