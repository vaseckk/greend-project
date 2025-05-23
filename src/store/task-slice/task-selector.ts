import { AppState } from '../../types/state.ts';
import { NameSpace } from '../../const.ts';
import {TaskData, TaskState, UserNameData} from '../../types/types.ts';

export const getCurrentTask = (state: AppState): TaskState['taskDetails'] => state[NameSpace.Task].taskDetails;
export const getReviewer = (state:AppState): UserNameData | null => state[NameSpace.Task].taskDetails?.reviewer || null;
export const getAssignee = (state:AppState): UserNameData | null => state[NameSpace.Task].taskDetails?.assignee || null;
export const getSprintTask = (state: AppState): TaskData['sprint'] | null =>
  state[NameSpace.Task].taskDetails?.sprint || null;
