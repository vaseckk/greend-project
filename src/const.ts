import {StatusCodes} from 'http-status-codes';

export const MAX_LENGTH_SHOW_TAGS = 4;
export const MIN_LENGTH_SHOW_TAGS = 0;

export const BACKEND_URL = 'http://api.anst-dev.ru';
export const REQUEST_TIMEOUT = 5000;

export const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: true,
};

export enum AppRoute {
  NewType = '/newType',
  CreateTask = '/newType/createTask',
  CreateProject = '/newType/createProject',
  BoardsAgile = '/boardsAgile',
  TimeTrackerTask = '/timeTrackerTask',
  EpicStory = '/epicStory/:id',
  Story = '/story/:id',
  Project = '/project/:id',
  Task = '/task/:id',
  Login = '/login',
  NotFound = '*'
}

export const navItems = [
  { text: 'Задачи',
    icon: '/img/assignment.png',
    path: AppRoute.Task
  },
  { text: 'Учёт времени',
    icon: '/img/monitoring.png',
    path: AppRoute.TimeTrackerTask
  },
  { text: 'Доски agile',
    icon: '/img/select_window.png',
    path: AppRoute.BoardsAgile
  },
];

export enum AuthorizationStatus {
  Loading = 'loading',
  Auth = 'auth',
  Unknown = 'unKnown',
  Failed = 'failed',
}

export enum CodeStatus {
  Unknown = 'unknown',
  Sending = 'sending', // Код отправляется
  Sent = 'sent', // Код успешно отправлен
  Verifying = 'verifying', // Код проверяется
  Verified = 'verified', // Код успешно проверен
  Failed = 'failed', // Ошибка
}

export enum CreationStatus {
  Idle = 'Idle',
  Creating = 'creating',
  Created = 'created',
  Failed= 'failed',
}

export enum AddUserStatus {
  NotAdded = 'notAdded',
  BeingAdding = 'beingAdding',
  BeenAdded = 'beenAdded',
  Failed = 'failed',
}

export enum TaskStatus {
  ToDo = 'toDo',
  InProgress = 'inProgress',
  Done = 'done'
}

export enum GetAllUser {
  NotFound = 'notFound',
  Loading = 'loading',
  Found = 'found',
  Failed = 'failed'
}

export enum APIRoute {
  SendCodeApi = '/auth/code/send',
  VerifyCodeApi = '/auth/code/verify',
  AuthSigninApi = '/auth/signin',
  AuthRefreshApi = '/auth/refresh',
  ProjectCreateApi = '/project',
  ProjectsAllApi = '/project/all',
  TagCreateApi = '/tag',
  TaskCreateApi = '/task',
  TaskFindByFilter = '/task/find-by-filter',
  FilterCreate = '/filter',
  FilterAllApi = '/filter/all',
  AddUserInProjectApi = '/users-projects',
  UserInfoApi = '/user/current'
}

export enum NameSpace {
  Auth = 'auth',
  NewTask = 'newTask',
  AddUserInProject = 'addUserInProject',
  AllUsers = 'allUsers',
  TimeTrackerTask = 'timeTrackerTask',
  BoardsAgile = 'boardsAgile',
  EpicStory = '/epicStory/:id',
  Story = '/story/:id',
  Project = 'project',
  Task = '/task/:id',
  Tags = 'tags'
}
