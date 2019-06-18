import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { message } from 'antd';
import history from '@services/history';
import Routes from '@routes';
import { store } from './store';
import './global.less';

message.config({
  top: 60,
  duration: 8,
});

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>
);

export default Root;
