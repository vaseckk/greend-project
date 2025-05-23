import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError} from 'axios';
import {dropTokens, getAccessToken, getRefreshToken} from './token.ts';
import {StatusCodeMapping, BACKEND_URL, REQUEST_TIMEOUT, TelegramAuthRoute} from '../const.ts';
import {ErrorMesageType} from '../types/types.ts';
import {toast} from 'react-toastify';
import {logoutAction, refreshTokensAction} from '../store/api-actions.ts';
import {store} from '../store';

const shouldDisplayError = (response: AxiosResponse) => Boolean(StatusCodeMapping[response.status]);

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  // Request interceptor
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken(); // Уже с Bearer

      if (token && config.headers) {
        const isTelegramRoute = TelegramAuthRoute.some((route) => config.url?.includes(route));
        const headerName = isTelegramRoute ? 'Authorization-Telegram' : 'Authorization';
        config.headers[headerName] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ErrorMesageType>) => {
      const { response, config: originalRequest } = error;

      // Показываем ошибки пользователю
      if (response && shouldDisplayError(response)) {
        toast.warn(response.data.message);
      }

      // Обработка 401 ошибки (истекший accessToken)
      if (response?.status === 401 && originalRequest && !originalRequest.url?.includes('/auth/refresh')) {
        try {
          const refreshToken = getRefreshToken();

          // Если refreshToken отсутствует, сразу разлогиниваем
          if (!refreshToken) {
            throw new Error('No refresh token');
          }

          // 1. Пытаемся обновить токены через Redux
          await store.dispatch(refreshTokensAction()).unwrap();

          // 2. Повторяем оригинальный запрос с новым токеном
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = getAccessToken();
          }
          return api(originalRequest);

        } catch (err) {
          // Если обновление не удалось, разлогиниваем
          store.dispatch(logoutAction());
          dropTokens();
          toast.warn('Сессия истекла. Пожалуйста, войдите снова.');
        }
      }

      throw error;
    }
  );

  return api;
};
