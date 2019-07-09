import { pageSizeDashboard } from '@config/constants';
import superaxios from './superaxios';

export default {
  auth: {
    signIn: async credentials => {
      const response = await superaxios.post('/auth/signin', credentials);
      return response.data;
    },

    signUp: async signupCredentials => {
      const response = await superaxios.post('/auth/signup', signupCredentials);
      return response.data;
    },

    smsCodeRequest: async userNameAndPhone => superaxios.post('/auth/twofactorphone', userNameAndPhone),

    twoFactorAuth: async userNameAndTwoFactorCode => {
      const response = await superaxios.post('/auth/twofactorcode', userNameAndTwoFactorCode);
      return response.data;
    },

    forgotPassword: async email => {
      const response = await superaxios.post('/auth/forgotpassword', email);
      return response.data;
    },

    resetPassword: async data => {
      const response = await superaxios.post('/auth/resetpassword', data);
      return response.data;
    },

    refreshingToken: async refreshToken => {
      const response = await superaxios.put('/token', { refreshToken });
      return response.data;
    },
  },

  userProfile: {
    getUserProfile: async () => {
      const response = await superaxios.get('/profile');
      return response.data;
    },
    getSmsCode: async () => {
      const response = await superaxios.get('/profile/code');
      return response.data;
    },
    editUserEmail: async smsCodeAndEmail => {
      const response = await superaxios.put('/profile/email', smsCodeAndEmail);
      return response.data;
    },
    editUserFullName: async fullName => {
      const response = await superaxios.put('/profile', fullName);
      return response.data;
    },
    editUserPhoneNumber: async phoneNumber => {
      const response = await superaxios.put('/profile/phone', phoneNumber);
      return response.data;
    },
    editUserPassword: async oldAndNewPasswords => {
      const response = await superaxios.put('/profile/password', oldAndNewPasswords);
      return response.data;
    },
  },

  trades: {
    getTrades: async params => {
      const response = await superaxios.get(`/trade${params}`);
      return response.data;
    },
    getMyTrades: async type => {
      const response = await superaxios.get(
        `/trade/currentuser?pageSize=${pageSizeDashboard}&status[]=${type}`
      );
      return response.data;
    },
    toggleTradeStatus: async idWithStatus => {
      const response = await superaxios.put('/trade/status', idWithStatus);
      return response.data;
    },

    postTrade: async values => {
      const response = await superaxios.post('/trade', values);
      return response.data;
    },
    getTradeById: async id => {
      const response = await superaxios.get(`/trade/${id}`);
      return response.data;
    },
    editTrade: async values => {
      const response = await superaxios.put('/trade', values);
      return response.data;
    },
    deleteTrade: async id => {
      const response = await superaxios.delete(`/trade/${id}`);
      return response.data;
    },
  },
};
