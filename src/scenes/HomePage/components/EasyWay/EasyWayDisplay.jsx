import React from 'react';
import { Button, Icon } from 'antd';
import ROUTES from 'src/routes';
import history from 'src/services/history';
import InnovationImg from 'src/assets/innovation.svg';
import './style.less';

const handleSignUpClick = () => {
  history.push({ pathname: ROUTES.LOGIN, state: { toSignUp: true } });
};

const EasyWay = () => (
  <div className="easy-way">
    <div className="easy-way__left">
      <h1 className="easy-way__heading">Easy way to trade bitcoin</h1>
      <Button type="primary" className="easy-way__btn primary-btn" onClick={handleSignUpClick}>
        <Icon type="user-add" />
        Sign up for free
      </Button>
    </div>
    <div className="easy-way__right">
      <img src={InnovationImg} alt="Welcome to Bitcoins Direct" />
    </div>
  </div>
);

export default EasyWay;
