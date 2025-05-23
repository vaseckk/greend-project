export const ACCESS_TOKEN_KEY = 'greend-access-token';
const REFRESH_TOKEN_KEY = 'greend-refresh-token';

const BEARER_PREFIX = 'Bearer ';
const BEARER_PREFIX_REGEX = /^Bearer\s+/i;

const ensureBearer = (token: string): string =>
  token.startsWith(BEARER_PREFIX) ? token : `${BEARER_PREFIX}${token}`;

export const getAccessToken = (): string => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || '';
  return ensureBearer(token);
};

export const saveAccessToken = (token: string): void => {
  // Очищаем от Bearer перед сохранением
  const cleanToken = token.replace(BEARER_PREFIX_REGEX, '');
  localStorage.setItem(ACCESS_TOKEN_KEY, cleanToken);
};

export const getRefreshToken = (): string => {
  return localStorage.getItem(REFRESH_TOKEN_KEY) || '';
};

export const saveRefreshToken = (token: string): void => {
  const cleanToken = token.replace(BEARER_PREFIX_REGEX, '');
  localStorage.setItem(REFRESH_TOKEN_KEY, cleanToken);
};

export const dropTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
