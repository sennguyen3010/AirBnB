import axios from 'axios';

export const configs = {
  setStore: (name: string, values: any) => {
    localStorage.setItem(name, values);
  },
  getStore: (name: string) => {
    return localStorage.getItem(name);
  },
  setStoreJSON: (name: string, values: any) => {
    values = JSON.stringify(values);
    localStorage.setItem(name, values);
  },
  getStoreJSON: (name: string) => {
    if (localStorage.getItem(name)) {
      let value: any = localStorage.getItem(name);
      let content = JSON.parse(value);
      return content;
    }
    return null;
  },

  clearLocalStorage: (name: string) => {
    localStorage.removeItem(name);
  },
  ACCESS_TOKEN: 'access_Token',
  USER_LOGIN: 'userLogin',
  TOKEN_CYBERSOFT:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjAxLzAzLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzYyODgwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3Nzc2NDAwfQ.z923oFwCROoABao5uzu3qATLUqYBTAaJWQMPJAUBNFU',
};

export const {
  TOKEN_CYBERSOFT,
  ACCESS_TOKEN,
  USER_LOGIN,
  setStore,
  getStore,
  setStoreJSON,
  getStoreJSON,
  clearLocalStorage,
} = configs;

export const http = axios.create({
  baseURL: `https://airbnbnew.cybersoft.edu.vn/api`,
  timeout: 6000,
});

http.interceptors.request.use(
  (configs) => {
    configs.headers = {
      ...configs.headers,
      ['tokenCybersoft']: TOKEN_CYBERSOFT,
      ['token']: `${getStore(ACCESS_TOKEN)}`,
    };
    return configs;
  },
  (err) => {
    return Promise.reject(err);
  }
);
