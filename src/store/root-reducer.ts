import {combineReducers} from '@reduxjs/toolkit';
import {authReducer} from './auth-slice/auth-slice.ts';
import {tagsReducer} from './tags-slice/tags-slice.ts';
import {projectReducer} from './project-slice/project-slice.ts';
import {addUserInProjectReducer} from './add-user-slice/add-user-slice.ts';
import {usersReducer} from './users-slice/users-slice.ts';
import {filterReducer} from './filter-slice/filter-slice.ts';
import {taskReducer} from './task-slice/task-slice.ts';
import {notificationsReducer} from './notifications-slice/notifictaions-slice.ts';
import {sprintReducer} from './sprint-slice/sprint-slice.ts';

const rootReducer = combineReducers({
  auth: authReducer,
  tags: tagsReducer,
  project: projectReducer,
  addUserInProject: addUserInProjectReducer,
  allUsers: usersReducer,
  filter: filterReducer,
  task: taskReducer,
  notifications: notificationsReducer,
  sprint: sprintReducer,
});

export default rootReducer;
