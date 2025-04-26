import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError} from 'axios';
import {dropTokens, getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken} from './token.ts';
import {StatusCodeMapping, BACKEND_URL, REQUEST_TIMEOUT} from '../const.ts';
import {AuthTokens, ErrorMesageType} from '../types/types.ts';
import {toast} from 'react-toastify';
import {logoutAction} from '../store/api-actions.ts';
import {store} from '../store';

const shouldDisplayError = (response: AxiosResponse) => Boolean(StatusCodeMapping[response.status]);

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  // Функция для добавления Bearer, если его нет
  const ensureBearer = (token: string): string => {
    return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  };

  // Request interceptor
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();
      const tokenWithBearer = ensureBearer(token);

      if (token && config.headers) {
        config.headers['Authorization-Telegram'] = tokenWithBearer; // Отправляем токен с Bearer
      }

      return config;
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ErrorMesageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;
        toast.warn(detailMessage.message);
      }

      // Обработка 401 ошибки
      if (error.response?.status === 401) {
        const originalRequest = error.config;

        if (originalRequest && !originalRequest.url?.includes('/auth/refresh')) {
          try {
            const refreshToken = getRefreshToken();
            const refreshTokenWithBearer = ensureBearer(refreshToken);

            if (!refreshToken) {
              throw new Error('No refresh token');
            }

            // Отправляем refreshToken с Bearer
            const { data } = await api.post<AuthTokens>('/auth/refresh', {
              refreshToken: refreshTokenWithBearer
            });

            // Сохраняем новые токены (как есть, предполагая что они могут быть с Bearer)
            saveAccessToken(data.accessToken);
            saveRefreshToken(data.refreshToken);

            // Обновляем заголовок для повторного запроса
            if (originalRequest.headers) {
              originalRequest.headers['x-token'] = ensureBearer(data.accessToken);
            }

            return api(originalRequest);
          } catch (refreshError) {
            store.dispatch(logoutAction());
            dropTokens();
            toast.warn('Сессия истекла. Пожалуйста, войдите снова.');
          }
        }
      }

      throw error;
    }
  );

  return api;
};
