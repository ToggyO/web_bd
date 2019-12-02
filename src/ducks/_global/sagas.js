import { call, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';

import * as globalTypes from './types';

function* permissionNotification(action) {
  yield call(notification.error, {
    message: '403 Error',
    description: action.payload,
    duration: 10,
  });
}

export function* permissionNotificationSaga() {
  yield takeLatest(globalTypes.PERMISSION_NOTIFICATION, permissionNotification);
}
