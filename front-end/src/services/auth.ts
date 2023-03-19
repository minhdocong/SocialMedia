import { AxiosResponse } from 'axios';
import { axiosInstance } from './axios';

export const getMe = async (): Promise<AxiosResponse> => {
  return axiosInstance.get('/auth/me');
};

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  const result = await axiosInstance.post('/auth/login', {
    email,
    password,
  });
  localStorage.setItem('accessToken', result.data.data.accessToken);
  return result;
};

export const signup = async (
  email: string,
  password: string,
  confirmPassword: string
): Promise<AxiosResponse> => {
  const result = await axiosInstance.post('/auth/signup', {
    email,
    password,
    confirmPassword,
  });
  localStorage.setItem('accessToken', result.data.data.accessToken);
  return result;
};

export const checkLogin = (): boolean => {
  return localStorage.getItem('accessToken') != null;
};