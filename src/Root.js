import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { message } from 'antd';
import history from '@services/history';
import Routes from '@routes';
import { ScrollToTop } from '@components/ScrollToTop';
import { store } from './store';
import './global.less';

message.config({
  top: 68,
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
