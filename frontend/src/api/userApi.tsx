// api/userApi.ts

import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3000/api/user';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userAccess');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;
  const refreshToken = localStorage.getItem('userRefresh');

  if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
    originalRequest._retry = true;
    try {
      const newAccessToken = await getNewAccessToken(refreshToken);
      localStorage.setItem('userAccess', newAccessToken);
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

export async function signupUser(email: string, username: string): Promise<any> {
  try {
    const response: AxiosResponse = await axiosInstance.post('/sendEmail', { email, username }, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
}

export async function googleAuthLogin(accessToken: string): Promise<any> {
  try {
    const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const { email, name } = profileResponse.data;
    const password = 'javadpk42';

    const response: AxiosResponse = await axiosInstance.post('/googleAuth', { username: name, email, password }, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Google authentication failed');
  }
}


export async function loginUser(email: string, password: string): Promise<any> {
    try {
      const response: AxiosResponse = await axiosInstance.post('/login', { email, password }, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }
  export async function forgotPassword(email: string, password: string): Promise<any> {
    try {
      console.log('routescallld')
      const response: AxiosResponse = await axiosInstance.post('/forgot-password', { email, password }, { withCredentials: true });
      console.log(response)
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  }

  export async function makePayment(amount: number, email: string, userId: string): Promise<string> {
    try {
      console.log('payment calingg')
      const response: AxiosResponse = await axiosInstance.post('/payment', { amount, email, userId }, { withCredentials: true });
      console.log(response)
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Payment failed');
    }
  }

  export async function verifyEmailOTP(email: string, otp: string): Promise<boolean> {
    try {
      const response: AxiosResponse = await axiosInstance.post('/verifyEmail', { email, otp });
      return response.data.success;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to verify OTP');
    }
  }

  export async function verifyEmailAndCreateUser(otp: string, email: string, username: string, password: string): Promise<boolean> {
    try {
      const response: AxiosResponse = await axiosInstance.post('/verifyEmail', { otp, email });
  
      if (response.data.success === true) {
        const createUserResponse: AxiosResponse = await axiosInstance.post('/signup', { username, email, password });
        return createUserResponse.data.success === true;
      }
  
      return false;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to verify OTP and create user');
    }
  }
  
  export async function resendOTP(email: string): Promise<void> {
    try {
      await axiosInstance.post('/sendEmail', { email });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to resend OTP');
    }
  }
  
  export async function sendForgetPasswordOTP(email: string, username: string): Promise<boolean> {
    try {
      const response: AxiosResponse = await axiosInstance.post('/send-Forget-Pass-Otp', { email, username });
      return response.status === 200 && response.data.success === true;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send OTP');
    }
  }

  export async function logoutUser(): Promise<void> {
    try {
      await axiosInstance.post('/logout', {}, { withCredentials: true });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  }
  