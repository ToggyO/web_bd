import React from 'react';
import { Dashboard } from './User/scenes/Dashboard';
import { LoginContainer } from './Sign/scenes/Login';

const ok = false;

const Main = () => (ok ? <Dashboard /> : <LoginContainer />);

export default Main;
