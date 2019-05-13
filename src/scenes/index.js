import React from 'react';
import { Dashboard } from './User/scenes/Dashboard';
import { Login } from './Sign/scenes/Login';

const ok = true;

const Main = () => (ok ? <Dashboard /> : <Login />);

export default Main;
