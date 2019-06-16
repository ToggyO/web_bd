// gist https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c

import axios from 'axios';
import Cookies from 'js-cookie';
// import { store } from '../store';

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(accesstoken) {
  subscribers = subscribers.filter(callback => callback(accesstoken));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

let superAxios;

class SuperAxios {
  constructor({ API_URL }) {
    this.url = API_URL;

    const innnerAxios = axios.create({
      baseURL: this.url,
    });

    innnerAxios.interceptors.request.use(config => {
      const accessToken = Cookies.get('bdtoken');

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      if (accessToken) {
        headers.Authorization = config.headers.Authorization || `Bearer ${accessToken}`;
      }
      return {
        ...config,
        headers,
      };
    });

    innnerAxios.interceptors.response.use(
      response => response,
      error => {
        const {
          config,
          response: { status },
        } = error;
        const originalRequest = config;

        if (status === 401) {
          if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;
            const oldRefreshToken = Cookies.get('bdrefreshtoken');
            innnerAxios.put('/token', { refreshToken: oldRefreshToken }).then(response => {
              const { accessToken, refreshToken } = response.data.data;
              Cookies.set('bdtoken', accessToken);
              Cookies.set('bdrefreshtoken', refreshToken);
              isAlreadyFetchingAccessToken = false;
              onAccessTokenFetched(accessToken);
            });
          }

          const retryOriginalRequest = new Promise(resolve => {
            addSubscriber(accessToken => {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              resolve(innnerAxios(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
    this.client = innnerAxios;
  }

  getAxios() {
    return this.client;
  }
}

function initClient(props) {
  superAxios = new SuperAxios(props);
}

function getClient() {
  return superAxios.getAxios();
}

export { initClient, getClient };
