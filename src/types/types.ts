import {AuthorizationStatus, CodeStatus} from '../const.ts';

//--- ERROR ---//
export interface ErrorMesageType {
  type: string;
  message: string;
}

//--- AUTHORIZATION ---//
export interface LoginData {
  username: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SendCodeData {
  telegramId: string;
  username: string;
}

export interface VerifyCodeData {
  telegramId: string;
  code: string;
  username: string;
}

export interface UserData {
  id: string;
  username: string;
  name: string;
  telegramId: string;
}

//--- STATE ---//

export interface AuthState {
  user: UserData | null;
  tokens: AuthTokens | null;
  authStatus: AuthorizationStatus;
  codeStatus: CodeStatus;
  error: string | null;
}

//--- PROJECT ---//

export interface CreateProjectData {
  id: string;
  name: string;
  description: string;
  key: string;
  headId: string;
  tags?: CreateTag[];
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  headId: string;
}

//--- TAGS ---//

export interface CreateTag {
  id: string;
  name: string;
  projectId: string;
}

//--- CREATE TASK FOR PROJECT ---//

export interface CreateTaskData {
  id: string;
  name: string;
  description: string;
  type: TaskType;
  priority: PriorityType;
  storyPoints: 0;
  sprintId: string;
  assigneeId: string;
  reviewerId: string;
  storyTaskId: string;
  projectId: string;
  dueDate: string;
  timeEstimation: TimeEstimationData[];
}

export interface TimeEstimationData {
  timeUnit: 'NANOSECONDS' | 'MICROSECONDS' | 'MILLISECONDS' | 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS';
  amount: number;
}

export type TaskType = 'Epic Story' | 'Story' | 'Задача';


export type PriorityType = 'BLOCKER' | 'CRITICAL' | 'MAJOR' | 'MINOR' | 'TRIVIAL';
