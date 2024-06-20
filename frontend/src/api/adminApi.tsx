// api/adminApi.ts

import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3000/api/admin';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminAccess');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;
  const refreshToken = localStorage.getItem('adminRefresh');

  if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
    originalRequest._retry = true;
    try {
      const newAccessToken = await getNewAccessToken(refreshToken);
      localStorage.setItem('adminAccess', newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

async function getNewAccessToken(refreshToken: string) {
  const response = await axiosInstance.post(`${API_URL}/refresh-token`, { refreshToken }, { withCredentials: true });
  return response.data.accessToken;
}

export async function loginAdmin(email: string, password: string): Promise<any> {
  try {
    const response: AxiosResponse = await axiosInstance.post('/login', { email, password }, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
}
