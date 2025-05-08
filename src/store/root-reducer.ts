import {combineReducers} from '@reduxjs/toolkit';
import {authReducer} from './auth-slice/auth-slice.ts';
import {tagsReducer} from './tags-slice/tags-slice.ts';
import {projectReducer} from './project-slice/project-slice.ts';
import {addUserInProjectReducer} from './add-user-slice/add-user-slice.ts';
import {usersReducer} from './users-slice/users-slice.ts';

const rootReducer = combineReducers({
  auth: authReducer,
  tags: tagsReducer,
  project: projectReducer,
  addUserInProject: addUserInProjectReducer,
  allUsers: usersReducer,
});

export default rootReducer;
