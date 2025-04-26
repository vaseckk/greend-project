import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, AppState} from '../types/state.ts';
import {
  AuthTokens,
  CreateProjectData,
  CreateTag, CreateTaskData,
  LoginData, ProjectData,
  SendCodeData,
  UserData,
  VerifyCodeData
} from '../types/types.ts';
import {dropTokens, saveAccessToken, saveRefreshToken} from '../services/token.ts';
import {APIRoute} from '../const.ts';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>();

export const sendCodeAction = createAppAsyncThunk<void, SendCodeData>(
  'auth/sendCode',
  async ({ username, telegramId }, { extra: api }) => {
    await api.post(APIRoute.SendCodeApi, { username, telegramId });
  }
);

export const verifyCodeAction = createAppAsyncThunk<AuthTokens, VerifyCodeData>(
  'auth/verifyCode',
  async ({ username, code, telegramId }, { extra: api }) => {
    const { data } = await api.post<AuthTokens>(APIRoute.VerifyCodeApi, {
      username,
      code,
      telegramId
    });
    saveAccessToken(data.accessToken);
    saveRefreshToken(data.refreshToken);
    return data;
  }
);

export const loginAction = createAppAsyncThunk<UserData, LoginData>(
  'auth/login',
  async ({ username, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.AuthSigninApi, { username, password });
    return data;
  }
);

export const refreshTokensAction = createAppAsyncThunk<AuthTokens, string>(
  'auth/refreshTokens',
  async (refreshToken, { extra: api }) => {
    // Передаём токен как есть (с Bearer)
    const { data } = await api.post<AuthTokens>(APIRoute.AuthRefreshApi, {
      refreshToken // Оставляем оригинальный формат
    });

    saveAccessToken(data.accessToken);
    saveRefreshToken(data.refreshToken);
    return data;
  }
);

export const checkAuthAction = createAppAsyncThunk<UserData>(
  'auth/checkAuth',
  async (_, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.AuthSigninApi);
    return data;
  }
);

export const logoutAction = createAppAsyncThunk<void, void>(
  'auth/logout',
  async (_, { extra: api }) => {
    await api.post(APIRoute.AuthSigninApi);
    dropTokens();
  }
);


//--- CREATE PROJECT ---//

export const createProject = createAppAsyncThunk<CreateProjectData, Omit<CreateProjectData, 'id'>>(
  'project/create',
  async (projectData, {extra: api}) => {
    const {data} = await api.post<CreateProjectData>(APIRoute.ProjectCreateApi, projectData);
    return data;
  }
);

export const fetchProjectsAction = createAppAsyncThunk<ProjectData[]>(
  'project/fetchProjects',
  async (projectId, {extra: api}) => {
    const {data} = await api.get<ProjectData[]>(`${APIRoute.TagCreateApi}/${projectId}`);
    return data;
  }
);

//--- TAG ---//

export const createTag = createAppAsyncThunk<CreateTag, Omit<CreateTag, 'id'>>(
  'project/createTag',
  async (tagData, {extra: api}) => {
    const { data } = await api.post<CreateTag>(APIRoute.TagCreateApi, tagData);
    return data;
  }
);

export const deleteTag = createAppAsyncThunk<string, string>(
  'project/deleteTag',
  async (id, {extra: api}) => {
    await api.delete(`${APIRoute.TagCreateApi}/${id}`);
    return id;
  }
);

//--- TASK ---//

export const createTask = createAppAsyncThunk<CreateTaskData, Omit<CreateTaskData, 'id'>>(
  'project/createTask',
  async (taskData, {extra: api}) => {
    const {data} = await api.post<CreateTaskData>(APIRoute.TaskCreateApi, taskData);
    return data;
  }
);
