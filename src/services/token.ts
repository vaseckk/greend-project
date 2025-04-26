const ACCESS_TOKEN_KEY = 'greend-access-token';
const REFRESH_TOKEN_KEY = 'greend-refresh-token';

const ensureBearer = (token: string): string => {
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
};

export const getAccessToken = (): string => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || '';
  return ensureBearer(token); // Возвращаем с Bearer
};

export const saveAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

// Refresh Token (аналогично)
export const getRefreshToken = (): string => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY) || '';
  return ensureBearer(token);
};

export const saveRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

// Удаление токенов (без изменений)
export const dropTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
