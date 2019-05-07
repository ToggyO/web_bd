import React from 'react';
import { UserProfile } from './User/UserProfile';
import { Login } from './Sign/Login';

const ok = false;

const Main = () => <div>{ok ? <div>User</div> : <Login />}</div>;

export default Main;
