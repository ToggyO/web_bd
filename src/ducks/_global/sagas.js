import { call, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';

import * as globalTypes from './types';

import * as messages from '@config';

function* permissionNotification() {
  yield call(notification.error, {
    message: '403 Error',
    description: messages.message403,
    duration: 10,
  });
}

export function* permissionNotificationSaga() {
  yield takeLatest(globalTypes.PERMISSION_NOTIFICATION, permissionNotification);
}
