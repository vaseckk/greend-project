import {StatusCodes} from 'http-status-codes';
import {Statuses} from './types/types.ts';

export const MAX_LENGTH_SHOW_TAGS = 4;
export const MIN_LENGTH_SHOW_TAGS = 0;
export const ALLOWED_STORY_POINTS = [1, 2, 3, 5, 8, 13] as const;
export const TIME_UNITS = ['NANOSECONDS', 'MICROSECONDS', 'MILLISECONDS', 'SECONDS', 'MINUTES', 'HOURS', 'DAYS'] as const;
export const TIME_SHEET_UNITS = ['MINUTES', 'HOURS'] as const;

export const BACKEND_URL = 'http://api.anst-dev.ru:8090';
export const REQUEST_TIMEOUT = 5000;

export const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: true,
};

export enum AppRoute {
  NewTaskEpic = '/newEpic',
  NewTaskStory = '/newStory',
  NewTaskSubtask = '/newSubtask',
  NewDefect = '/newDefect',
  NewProject = '/newProject',
  Edit = '/:id/edit',
  EditStory = '/story/:id/edit',
  EditSubtask = '/subtask/:id/edit',
  EditProject = '/project/:id/edit',
  NewSprint = '/project/:id/sprint',
  BoardsAgile = '/boardsAgile',
  TimeTrackerTask = '/timeTrackerTask',
  Epic = '/epic/:id',
  Story = '/story/:id',
  Project = '/project/:id',
  AllProjects = '/',
  Task = '/task/:id',
  Defect = '/defect/:id',
  Login = '/login',
  NotFound = '*'
}

export const navItems = [
  { text: 'Ваши проекты',
    icon: '/img/assignment.png',
    path: AppRoute.AllProjects
  },
  { text: 'Учёт времени',
    icon: '/img/monitoring.png',
    path: AppRoute.TimeTrackerTask
  },
  { text: 'Доски agile',
    icon: '/img/select_window_3.png',
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
  Sending = 'sending',
  Sent = 'sent',
  Verifying = 'verifying',
  Verified = 'verified',
  Failed = 'failed',
}

export enum CreationStatus {
  Idle = 'Idle',
  Creating = 'creating',
  Created = 'created',
  Failed= 'failed',
  NotFound = 'notFound',
  Loading = 'loading',
  Found = 'found',
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
  UserInfoApi = '/user/current',
  UserAutocomplete = '/user/autocomplete',
  LogsApi = '/logs',
  CommentApi = '/comments',
  SprintApi = '/sprint',
  SprintAllApi = '/sprint/all',
  DictionariesApi = 'dictionaries',
  AppropriateStatusesApi = 'appropriate-statuses',
  TimeSheetProjectApi = '/time-sheet',
  TimeSheetTaskApi = '/all-projects',
  Notifications = '/notifications',
}

export enum NameSpace {
  Auth = 'auth',
  NewTask = 'newTask',
  AddUserInProject = 'addUserInProject',
  AllUsers = 'allUsers',
  TimeTrackerTask = 'timeTrackerTask',
  BoardsAgile = 'boardsAgile',
  EpicStory = 'epicStory',
  Story = 'story',
  Project = 'project',
  Task = 'task',
  Filter = 'filter',
  Tags = 'tags',
  Sprint = 'sprint',
  Comment = 'comment',
  Status = 'status',
  Logs = 'logs',
  TimeSheet = 'timeSheet',
  Notifications = 'notifications'
}

export const TelegramAuthRoute = [
  APIRoute.AuthSigninApi,
  APIRoute.AuthRefreshApi,
  APIRoute.VerifyCodeApi,
  APIRoute.SendCodeApi,
];

export const statuses: Statuses[] = [
  'OPEN',
  'IN_PROGRESS',
  'REVIEW',
  'RESOLVED',
  'QA_READY',
  'IN_QA',
  'CLOSED'
];

export const statusLabels = {
  OPEN: 'Открыта',
  IN_PROGRESS: 'Готова к реализации',
  REVIEW: 'В работе',
  RESOLVED: 'На ревью',
  QA_READY: 'Ревью пройдено',
  IN_QA: 'На тестировании',
  CLOSED: 'Завершена'
};

export const StatusPriority = {
  BLOCKER: 'Высший',
  CRITICAL: 'Критический',
  MAJOR: 'Высокий',
  MINOR: 'Средний',
  TRIVIAL: 'Низкий'
} as const;

export const STATUSES_LIST: Statuses[] = ['OPEN', 'IN_PROGRESS', 'REVIEW', 'RESOLVED', 'QA_READY', 'IN_QA', 'CLOSED'];

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
