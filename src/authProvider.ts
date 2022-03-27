import { AuthProvider, useApiUrl, useShow } from '@pankod/refine-core';
import { message } from '@pankod/refine-antd';
import { IUser } from './interfaces';
import axios from 'axios';

export const TOKEN_KEY = 'refine-auth';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const data = await fetch(`http://127.0.0.1:8000/api/auth/admin/`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((error) => message.error(error));

    if (data && data?.accessToken) {
      localStorage.setItem(TOKEN_KEY, data?.accessToken);
      axios.defaults.headers.common = {
        Authorization: `Bearer ${data?.accessToken}`,
      };
      console.log(axios.defaults.headers);
      return Promise.resolve();
    }
    return Promise.reject(new Error('username: admin, password: admin'));
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    const { queryResult } = useShow<IUser>();
    console.log(queryResult);

    if (!token) {
      return Promise.reject();
    }

    const data = await fetch(`http://127.0.0.1:8000/api/users/profile`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .catch((error) => message.error(error));

    return Promise.resolve(data);
  },
  getToken: () => localStorage.getItem(TOKEN_KEY),
};
