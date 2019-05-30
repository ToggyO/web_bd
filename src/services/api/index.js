import axios from 'axios';
import { API_URL } from './config';

export default {
  signIn: async credentials => {
    const response = await axios.post(`${API_URL}/auth/signin`, credentials);
    return response.data;
  },

  signUp: async signupCredentials => {
    const response = await axios.post(`${API_URL}/auth/signup`, signupCredentials);
    return response.data;
  },

  smsCodeRequest: async phone => axios.post(`${API_URL}/auth/twofactorphone`, phone),

  twoFactorAuth: async twoFactorCredentials => {
    const response = await axios.post(`${API_URL}/auth/twofactorcode`, twoFactorCredentials);
    return response.data;
  },

  forgotPassword: async email => {
    const response = await axios.post(`${API_URL}/auth/forgotpassword`, email);
    return response.data;
  },

  resetPassword: async data => {
    const response = await axios.post(`${API_URL}/auth/resetpassword`, data);
    return response.data;
  },
};
