import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { message } from 'antd';

import { store } from './store';

import history from '@services/history';

import Routes from '@routes';

import { ScrollToTop } from '@components/ScrollToTop';
import './styles/index.less';

message.config({
  top: 48,
  duration: 4,
});

const Root = () => (
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <ScrollToTop>
        <Routes />
      </ScrollToTop>
    </Router>
  </Provider>
);

export default Root;
