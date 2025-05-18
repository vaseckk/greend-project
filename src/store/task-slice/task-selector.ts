import { AppState } from '../../types/state.ts';
import { NameSpace } from '../../const.ts';
import {CreateTaskData, PriorityType, TaskState} from '../../types/types.ts';

export const getCreatedTask = (state: AppState): CreateTaskData | null => state[NameSpace.Task].createTask;
export const getTaskStatus = (state: AppState): TaskState['status'] => state[NameSpace.Task].status;
export const geTaskError = (state: AppState): TaskState['error'] => state[NameSpace.Task].error;
export const getPriorities = (state: AppState): PriorityType[] | string => state[NameSpace.Task].createTask?.priority || '';
