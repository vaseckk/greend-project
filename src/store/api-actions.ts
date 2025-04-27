import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, AppState} from '../types/state.ts';
import {
  AuthTokens,
  CreateProjectData,
  CreateTag, CreateTaskData, FilterData,
  LoginData, ProjectAllData, ProjectsData,
  SendCodeData, UpdateFilterRequest, UpdateFilterResponse, UpdateProjectRequest, UpdateProjectResponse,
  UserData, UserProjectsControllerData,
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


//--- PROJECT ---//

export const createProject = createAppAsyncThunk<CreateProjectData, Omit<CreateProjectData, 'id'>>(
  'project/create',
  async (projectData, {extra: api}) => {
    const {data} = await api.post<CreateProjectData>(APIRoute.ProjectCreateApi, projectData);
    return data;
  }
);

export const fetchProjectsAction = createAppAsyncThunk<ProjectAllData[], string>(
  'project/fetchProjects',
  async (projectId, {extra: api}) => {
    const {data} = await api.get<ProjectAllData[]>(`${APIRoute.TagCreateApi}/${projectId}`);
    return data;
  }
);

export const updateProject = createAppAsyncThunk<UpdateProjectResponse, {id: string; data: UpdateProjectRequest}>(
  'project/update',
  async ({ id, data }, {extra: api}) => {
    const responce = await api.put<UpdateProjectResponse>(`${APIRoute.TagCreateApi}/${id}`, data);
    return responce.data;
  }
);

export const getAllProject = createAppAsyncThunk<ProjectsData, undefined>(
  'project/getAllProject',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<ProjectsData>(APIRoute.ProjectsAllApi);
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

//--- FILTER ---//

export const createFilter = createAppAsyncThunk<FilterData, Omit<FilterData, 'id'>> (
  'filter/createFilter',
  async (filterData, {extra: api}) => {
    const { data } = await api.post<FilterData>(APIRoute.FilterCreate, filterData);
    return data;
  }
);

export const updateFilter = createAppAsyncThunk<UpdateFilterResponse, {id: string; data: UpdateFilterRequest}> (
  'filter/updateFilter',
  async ({id, data}, {extra: api}) => {
    const responce = await api.put<UpdateFilterResponse>(`${APIRoute.FilterCreate}/${id}`, data);
    return responce.data;
  }
);

export const GetFillerAll = createAppAsyncThunk<FilterData, undefined>(
  'filter/getFilterAll',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<FilterData>(APIRoute.ProjectsAllApi);
    return data;
  }
);

export const GetFilter = createAppAsyncThunk<FilterData[], string>(
  'project/fetchProjects',
  async (projectId, {extra: api}) => {
    const {data} = await api.get<FilterData[]>(`${APIRoute.TagCreateApi}/${projectId}`);
    return data;
  }
);

export const deleteFilter = createAppAsyncThunk<string, string>(
  'project/deleteTag',
  async (id, {extra: api}) => {
    await api.delete(`${APIRoute.FilterCreate}/${id}`);
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

//-- ADD USER IN PROJECTS ---//

export const AddUserInProjects = createAppAsyncThunk<UserProjectsControllerData, Omit<UserProjectsControllerData, 'id'>>(
  'project/addUserInProjects',
  async (userProjectsControllerData, {extra: api}) => {
    const { data } = await api.post<UserProjectsControllerData>(APIRoute.AddUserInProjectApi, userProjectsControllerData);
    return data;
  }
);

export const deleteUserInProjects = createAppAsyncThunk<string, string>(
  'project/deleteTag',
  async (id, {extra: api}) => {
    await api.delete(`${APIRoute.AddUserInProjectApi}/${id}`);
    return id;
  }
);
