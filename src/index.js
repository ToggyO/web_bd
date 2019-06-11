/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { message } from 'antd';
import history from 'src/services/history';
import { BitcoinsDirectRoutes } from 'src/routes';
import { getStore } from './store';

import './global.less';

message.config({
  top: 60,
  duration: 8,
});

const store = getStore();
// if (!checkTokens()) logout();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <BitcoinsDirectRoutes />
    </Router>
  </Provider>,
  document.getElementById('root')
);
