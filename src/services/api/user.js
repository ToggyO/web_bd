import axios from 'axios';
import { API_URL } from './config';

export default {
  getUserProfile: async () => {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  },
  getSmsCode: async () => {
    const response = await axios.get(`${API_URL}/profile/code`);
    return response.data;
  },
  editUserEmail: async smsCodeAndEmail => {
    const response = await axios.put(`${API_URL}/profile/email`, smsCodeAndEmail);
    return response.data;
  },
  editUserFullName: async fullName => {
    const response = await axios.put(`${API_URL}/profile`, fullName);
    return response.data;
  },
  editUserPhoneNumber: async phoneNumber => {
    const response = await axios.put(`${API_URL}/profile/phone`, phoneNumber);
    return response.data;
  },
  editUserPassword: async oldAndNewPasswords => {
    const response = await axios.put(`${API_URL}/profile/password`, oldAndNewPasswords);
    return response.data;
  },
};
