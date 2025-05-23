import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, AppState} from '../types/state.ts';
import {
  AllComments,
  AuthTokens,
  CreateComment,
  CreateLogs,
  CreateProjectData,
  CreateSprint,
  CreateTag,
  CreateTaskData, CreateTaskResponse,
  FilterData,
  LoginData,
  NotificationsData,
  ProjectAllData,
  ProjectsData,
  SendCodeData, SprintAllData, SprintData,
  TaskByFilter,
  TaskData,
  TaskFindByFilterResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
  UpdateFilterRequest,
  UpdateFilterResponse,
  UpdateLogsRequest,
  UpdateLogsResponse,
  UpdateProjectRequest,
  UpdateProjectResponse, UpdateSprintRequest,
  UpdateSprintResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
  UpdateTaskStatusRequest,
  UpdateTaskStatusResponse,
  UserData,
  UserNameData,
  UserProjectsControllerData,
  VerifyCodeData
} from '../types/types.ts';
import {dropTokens, getRefreshToken, saveAccessToken, saveRefreshToken} from '../services/token.ts';
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
    return data;
  }
);

export const loginAction = createAppAsyncThunk<UserData, LoginData>(
  'auth/login',
  async ({ username, password }, { extra: api }) => {
    const { data } = await api.post<AuthTokens & UserData>(APIRoute.AuthSigninApi, { username, password });
    saveAccessToken(data.accessToken);
    saveRefreshToken(data.refreshToken);
    return data;
  }
);

export const refreshTokensAction = createAppAsyncThunk<AuthTokens, void>(
  'auth/refreshTokens',
  async (_, { extra: api }) => {
    const refreshToken = getRefreshToken(); // Получаем refresh token без Bearer
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const { data } = await api.post<AuthTokens>(APIRoute.AuthRefreshApi, {
      refreshToken // Передаём без Bearer
    });

    saveAccessToken(data.accessToken);
    saveRefreshToken(data.refreshToken);
    return data;
  }
);

export const checkAuthAction = createAppAsyncThunk<void>(
  'auth/checkAuth',
  async (_, { extra: api, rejectWithValue }) => {
    try {
      // Просто делаем любой запрос, требующий авторизации
      await api.get(APIRoute.UserInfoApi);
    } catch (error) {
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const { data } = await api.post<AuthTokens>(APIRoute.AuthRefreshApi, {
          refreshToken
        });

        saveAccessToken(data.accessToken);
        saveRefreshToken(data.refreshToken);
      } catch (refreshError) {
        dropTokens();
        return rejectWithValue('Session expired');
      }
    }
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
  'project/createProject',
  async (projectData, {extra: api}) => {
    const {data} = await api.post<CreateProjectData>(APIRoute.ProjectCreateApi, projectData);
    return data;
  }
);

export const fetchProjectsAction = createAppAsyncThunk<ProjectsData, string>(
  'project/fetchProjects',
  async (projectId, {extra: api}) => {
    const {data} = await api.get<ProjectsData>(`${APIRoute.ProjectCreateApi}/${projectId}`);
    return data;
  }
);

export const updateProject = createAppAsyncThunk<UpdateProjectResponse, {id: string; data: UpdateProjectRequest}>(
  'project/updateProject',
  async ({ id, data }, {extra: api}) => {
    const response = await api.put<UpdateProjectResponse>(`${APIRoute.ProjectCreateApi}/${id}`, data);
    return response.data;
  }
);

export const getAllProject = createAppAsyncThunk<ProjectAllData[], undefined>(
  'project/getAllProject',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<ProjectAllData[]>(APIRoute.ProjectsAllApi);
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
    const response = await api.put<UpdateFilterResponse>(`${APIRoute.FilterCreate}/${id}`, data);
    return response.data;
  }
);

export const GetFillersAll = createAppAsyncThunk<FilterData[], undefined>(
  'filter/getFilterAll',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<FilterData[]>(APIRoute.FilterAllApi);
    return data;
  }
);

export const GetFilters = createAppAsyncThunk<FilterData[], string>(
  'filter/GetFilters',
  async (projectId, {extra: api}) => {
    const {data} = await api.get<FilterData[]>(`${APIRoute.TagCreateApi}/${projectId}`);
    return data;
  }
);

export const deleteFilter = createAppAsyncThunk<string, string>(
  'filter/deleteFilter',
  async (id, {extra: api}) => {
    await api.delete(`${APIRoute.FilterCreate}/${id}`);
    return id;
  }
);

//--- TASK ---//

export const createTask = createAppAsyncThunk<CreateTaskResponse, Omit<CreateTaskData, 'id'>>(
  'project/createTask',
  async (taskData, {extra: api}) => {
    const {data} = await api.post<CreateTaskResponse>(APIRoute.TaskCreateApi, taskData);
    return data;
  }
);

export const taskFindByFilter = createAppAsyncThunk<TaskFindByFilterResponse[], TaskByFilter>(
  'task/taskFindByFilter',
  async (taskByFilterData, {extra: api}) => {
    const {data} = await api.post<TaskFindByFilterResponse[]>(APIRoute.TaskFindByFilter, taskByFilterData);
    return data;
  }
);

export const getTaskBySimpleId = createAppAsyncThunk<TaskData, string>(
  'task/getTaskBySimpleId',
  async (simpleId, { extra: api }) => {
    const { data } = await api.get<TaskData>(`${APIRoute.TaskCreateApi}/${simpleId}`);
    return data;
  }
);

export const updateTask = createAppAsyncThunk<UpdateTaskResponse, { simpleId: string; data: UpdateTaskRequest }>(
  'task/updateTask',
  async ({ simpleId, data }, { extra: api }) => {
    const response = await api.put<UpdateTaskResponse>(
      `${APIRoute.TaskCreateApi}/${simpleId}`,
      data
    );
    return response.data;
  }
);

export const updateTaskStatus = createAppAsyncThunk<UpdateTaskStatusResponse, { simpleId: string; data: UpdateTaskStatusRequest }>(
  'task/updateTaskStatus',
  async ({ simpleId, data }, { extra: api }) => {
    const response = await api.put<UpdateTaskStatusResponse>(
      `${APIRoute.TaskCreateApi}/${simpleId}/status`,
      data
    );
    return response.data;
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
  'project/deleteUserInProjects',
  async (id, {extra: api}) => {
    await api.delete(`${APIRoute.AddUserInProjectApi}/${id}`);
    return id;
  }
);

//--- GET CURRENT USER INFO ---//

export const getUserInfo = createAppAsyncThunk<UserNameData, undefined>(
  'user/getUserInfo',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserNameData>(APIRoute.UserInfoApi);
    return data;
  }
);

export const getUsersAutocomplete = createAppAsyncThunk<UserNameData[], string>(
  'user/getUsersAutocomplete',
  async (nameFragment, { extra: api }) => {
    const { data } = await api.get<UserNameData[]>(
      `${APIRoute.UserAutocomplete}`,
      {
        params: {
          nameFragment
        }
      }
    );
    return data;
  }
);

//--- GET NOTIFICATIONS ---//

export const getNotifications = createAppAsyncThunk<NotificationsData[], undefined>(
  'notifications/getNotifications',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<NotificationsData[]>(APIRoute.UserInfoApi);
    return data;
  }
);

//--- LOG ---//

export const createLogs = createAppAsyncThunk<
  CreateLogs,
  { projectId: string; simpleId: string; logsData: Omit<CreateLogs, 'id'> }
>(
  'project/createLogs',
  async ({projectId, simpleId, logsData}, {extra: api}) => {
    const {data} = await api.post<CreateLogs>(
      `${APIRoute.ProjectCreateApi}/${projectId}/${APIRoute.TaskCreateApi}/${simpleId}/${APIRoute.LogsApi}`,
      logsData
    );
    return data;
  }
);

export const updateLogs = createAppAsyncThunk<
  UpdateLogsResponse,
  { projectId: string; simpleId: string; id: string; data: UpdateLogsRequest }
>(
  'project/updateLogs',
  async ({projectId, simpleId, id, data}, {extra: api}) => {
    const response = await api.put<UpdateLogsResponse>(
      `${APIRoute.ProjectCreateApi}/${projectId}/${APIRoute.TaskCreateApi}/${simpleId}/${APIRoute.LogsApi}/${id}/`,
      data
    );
    return response.data;
  }
);

export const deleteLogs = createAppAsyncThunk<
  string,
  { projectId: string; simpleId: string; id: string }
>(
  'project/deleteLogs',
  async ({ projectId, simpleId, id }, { extra: api }) => {
    await api.delete(
      `${APIRoute.ProjectCreateApi}/${projectId}/${APIRoute.TaskCreateApi}/${simpleId}/${APIRoute.LogsApi}/${id}`
    );
    return id;
  }
);

//--- COMMENT ---//

export const createComments = createAppAsyncThunk<
  CreateComment,
  { projectId: string; simpleId: string; commentData: Omit<CreateComment, 'id'> }
>(
  'comments/createComments',
  async ({projectId, simpleId, commentData}, {extra: api}) => {
    const {data} = await api.post<CreateComment>(
      `${APIRoute.ProjectCreateApi}/${projectId}${APIRoute.TaskCreateApi}/${simpleId}${APIRoute.CommentApi}`,
      commentData
    );
    return data;
  }
);

export const updateComment = createAppAsyncThunk<
  UpdateCommentResponse,
  { projectId: string; simpleId: string; id: string; data: UpdateCommentRequest }
>(
  'comments/updateComments',
  async ({projectId, simpleId, id, data}, {extra: api}) => {
    const response = await api.put<UpdateCommentResponse>(
      `${APIRoute.ProjectCreateApi}/${projectId}${APIRoute.TaskCreateApi}/${simpleId}${APIRoute.CommentApi}/${id}/`,
      data
    );
    return response.data;
  }
);

export const deleteComments = createAppAsyncThunk<
  string,
  { projectId: string; simpleId: string; id: string }
>(
  'comments/deleteComments',
  async ({ projectId, simpleId, id }, { extra: api }) => {
    await api.delete(
      `${APIRoute.ProjectCreateApi}/${projectId}${APIRoute.TaskCreateApi}/${simpleId}${APIRoute.CommentApi}/${id}/`,
    );
    return id;
  }
);

export const getAllComments = createAppAsyncThunk<AllComments[], {projectId: string; simpleId: string}>(
  'comments/getAllComments',
  async ({ projectId, simpleId}, { extra: api }) => {
    const { data } = await api.get<AllComments[]>(
      `${APIRoute.ProjectCreateApi}/${projectId}${APIRoute.TaskCreateApi}/${simpleId}${APIRoute.CommentApi}`,
    );
    return data;
  }
);

//--- SPRINT ---//


export const createSprint = createAppAsyncThunk<
  CreateSprint,
  { projectId: string; sprintData: Omit<CreateSprint, 'id'> }
>(
  'sprint/createSprint',
  async ({projectId, sprintData}, {extra: api}) => {
    const {data} = await api.post<CreateSprint>(
      `${APIRoute.ProjectCreateApi}/${projectId}${APIRoute.SprintApi}`,
      sprintData
    );
    return data;
  }
);

export const updateSprint = createAppAsyncThunk<
  UpdateSprintResponse,
  { projectId: string; id: string; data: UpdateSprintRequest }
>(
  'sprint/updateSprint',
  async ({projectId, id, data}, {extra: api}) => {
    const response = await api.put<UpdateSprintResponse>(
      `${APIRoute.ProjectCreateApi}/${projectId}${APIRoute.SprintApi}/${id}/`,
      data
    );
    return response.data;
  }
);

export const updateTaskSprint = createAppAsyncThunk<
  boolean,
  {
    projectId: string;
    id: string;
    simpleId: string;
  }
>(
  'sprint/updateTaskSprint',
  async ({ projectId, id, simpleId}, { extra: api }) => {
    await api.put(
      `${APIRoute.ProjectCreateApi}/${projectId}${APIRoute.SprintApi}/${id}${APIRoute.TaskCreateApi}/${simpleId}`,
    );
    return true;
  }
);

export const getSprint = createAppAsyncThunk<SprintData, {projectId: string; sprintId: string}>(
  'sprint/getSprint',
  async ({ projectId, sprintId}, { extra: api }) => {
    const { data } = await api.get<SprintData>(
      `${APIRoute.ProjectCreateApi}/${projectId}/${APIRoute.SprintApi}/${sprintId}`,
    );
    return data;
  }
);

export const getAllSprints = createAppAsyncThunk<SprintAllData[], {projectId: string}>(
  'sprint/getSprints',
  async ({ projectId}, { extra: api }) => {
    const { data } = await api.get<SprintAllData[]>(
      `${APIRoute.ProjectCreateApi}/${projectId}${APIRoute.SprintAllApi}`,
    );
    return data;
  }
);


//--- TIMESHEET ---//


//--- DICTIONARY ---//
