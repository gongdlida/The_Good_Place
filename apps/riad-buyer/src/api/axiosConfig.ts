import { camelize, snakeize } from 'casing';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const Axios = axios.create();

Axios.interceptors.request.use((config) => {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
  };

  config.headers = Object.assign({}, config.headers, headers);

  config.data = snakeize(config.data);
  if (config.params) {
    config.params = snakeize(config.params);
  }
  return config;
});

Axios.interceptors.response.use((response) => {
  if (response.data) {
    response.data = camelize(response.data);
  }

  return response;
});

export const HTTP = {
  get: async <ResponseType>(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> => {
    try {
      const res = await Axios.get(url, options);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error, 'error message');
        throw new Error(error.message);
      }
      console.error(error);
      throw new Error();
    }
  },
};
