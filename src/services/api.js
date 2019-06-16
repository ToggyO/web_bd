import { API_URL } from '@config/constants';
import * as superAxios from './superaxios';

superAxios.initClient({ API_URL });
const superAxiosClient = superAxios.getClient();

export default {
  auth: {
    signIn: async credentials => {
      const response = await superAxiosClient.post('/auth/signin', credentials);
      return response.data;
    },

    signUp: async signupCredentials => {
      const response = await superAxiosClient.post('/auth/signup', signupCredentials);
      return response.data;
    },

    smsCodeRequest: async userNameAndPhone => superAxiosClient.post('/auth/twofactorphone', userNameAndPhone),

    twoFactorAuth: async userNameAndTwoFactorCode => {
      const response = await superAxiosClient.post('/auth/twofactorcode', userNameAndTwoFactorCode);
      return response.data;
    },

    forgotPassword: async email => {
      const response = await superAxiosClient.post('/auth/forgotpassword', email);
      return response.data;
    },

    resetPassword: async data => {
      const response = await superAxiosClient.post('/auth/resetpassword', data);
      return response.data;
    },

    refreshingToken: async refreshToken => {
      const response = await superAxiosClient.put('/token', { refreshToken });
      return response.data;
    },
  },

  userProfile: {
    getUserProfile: async () => {
      const response = await superAxiosClient.get('/profile');
      return response.data;
    },
    getSmsCode: async () => {
      const response = await superAxiosClient.get('/profile/code');
      return response.data;
    },
    editUserEmail: async smsCodeAndEmail => {
      const response = await superAxiosClient.put('/profile/email', smsCodeAndEmail);
      return response.data;
    },
    editUserFullName: async fullName => {
      const response = await superAxiosClient.put('/profile', fullName);
      return response.data;
    },
    editUserPhoneNumber: async phoneNumber => {
      const response = await superAxiosClient.put('/profile/phone', phoneNumber);
      return response.data;
    },
    editUserPassword: async oldAndNewPasswords => {
      const response = await superAxiosClient.put('/profile/password', oldAndNewPasswords);
      return response.data;
    },
  },
};
