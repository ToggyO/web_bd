import axios from 'axios';
import { API_URL } from 'paths';

export default {
  login: async credentials => {
    const response = await axios.post(`${API_URL}/auth/signin`, credentials);
    return response.data.data;
  },
  signup: async credentials => {
    const response = await axios.post(`${API_URL}/auth/signup`, credentials);
    return response.data.data;
  },
  confirm: async token => {
    const response = await axios.post('/api/auth/confirmation', { token });
    return response.data.user;
  },
  smsCodeRequest: async phone => axios.post(`${API_URL}/auth/twofactorphone`, { phone }),
  twoFactorAuth: async twoFactorCredentials => {
    const response = await axios.post(
      `${API_URL}/auth/twofactorcode`,
      twoFactorCredentials,
    );
    return response.data;
  },
  forgotPassword: async email => {
    const response = await axios.post(`${API_URL}/auth/forgotpassword`, email);
    return response.data;
  },
};
