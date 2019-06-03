import axios from 'axios';
import { API_URL } from './config';

export default {
  getUserProfile: async () => {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  },
};
