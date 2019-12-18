import { call, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';

import * as globalTypes from './types';

function* errorNotification(action) {
  yield call(notification.error, {
    message: action.payload.title,
    description: action.payload.message,
    duration: 6,
  });
}

export function* errorNotificationSaga() {
  yield takeLatest(globalTypes.ERROR_NOTIFICATION, errorNotification);
}
