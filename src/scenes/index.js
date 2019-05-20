import React from 'react';
import { Dashboard } from './User/scenes/Dashboard';
import { LoginContainer } from './Sign/Login';

const ok = false;

const Main = () => (ok ? <Dashboard /> : <LoginContainer />);

export default Main;
