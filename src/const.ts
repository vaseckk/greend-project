export const MAX_LENGTH_SHOW_TAGS = 4;
export const MIN_LENGTH_SHOW_TAGS = 0;

export const BACKEND_URL = 'http://api.anst-dev.ru';
export const REQUEST_TIMEOUT = 5000;

export enum AppRoute {
  NewTask = '/newTask',
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
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
