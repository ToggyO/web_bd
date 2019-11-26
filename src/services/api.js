import superaxios from './superaxios';

import { pageSizeDashboard } from '@config/constants';

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
    logout: async () => {
      await superaxios.post('/auth/logout');
    },
  },

  me: {
    getProfile: async () => {
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

  ads: {
    getAds: async params => {
      const response = await superaxios.get(`/ad${params}`);
      return response.data;
    },
    getMyAds: async () => {
      const response = await superaxios.get(`/ad/currentuser?pageSize=${pageSizeDashboard}`);
      return response.data;
    },
    toggleAdStatus: async idWithStatus => {
      const response = await superaxios.put('/ad/status', idWithStatus);
      return response.data;
    },
    createAd: async values => {
      const response = await superaxios.post('/ad', values);
      return response.data;
    },
    getAdById: async id => {
      const response = await superaxios.get(`/ad/${id}`);
      return response.data;
    },
    editAd: async values => {
      const response = await superaxios.put('/ad', values);
      return response.data;
    },
    deleteAd: async id => {
      const response = await superaxios.delete(`/ad/${id}`);
      return response.data;
    },
  },
  trades: {
    initiate: async data => {
      const response = await superaxios.post('/trade', data);
      return response.data;
    },
    getTrades: async type => {
      const response = await superaxios.get(`/trade?pageSize=${pageSizeDashboard}&status[]=${type}`);
      return response.data;
    },
    getTradeById: async id => {
      const response = await superaxios.get(`/trade/${id}`);
      return response.data;
    },
    confirm: async params => {
      const response = await superaxios.post('/trade/confirm', params);
      return response.data;
    },
    fiatSent: async id => {
      const response = await superaxios.post(`/trade/${id}/fiatsent`);
      return response.data;
    },
    fiatReceived: async id => {
      const response = await superaxios.post(`/trade/${id}/fiatreceived`);
      return response.data;
    },
    deleteTraderqvst: async id => {
      const response = await superaxios.delete(`/trade/${id}`);
      return response.data;
    },
  },
  chat: {
    getChatById: async id => {
      const response = await superaxios.get(`/trade/${id}`);
      return response.data;
    },
  },
  reviews: {
    getReviewByOrder: async tradeId => {
      const response = await superaxios.get(`/rating/trade/${tradeId}`);
      return response.data;
    },
    postReview: async data => {
      const response = await superaxios.post('/rating', data);
      return response.data;
    },
  },
  user: {
    getUserProfile: async userName => {
      const response = await superaxios.get(`/profile/${userName}`);
      return response.data;
    },
    getReviewsByUserName: async userName => {
      const response = await superaxios.get(`/rating/${userName}`);
      return response.data;
    },
    getLikesCountByUserName: async userName => {
      const response = await superaxios.get(`/rating/count/${userName}`);
      return response.data;
    },
  },
};
