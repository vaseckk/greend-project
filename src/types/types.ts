import {AddUserStatus, AuthorizationStatus, CodeStatus, CreationStatus, GetAllUser} from '../const.ts';

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

export interface UserNameData {
  id: string;
  firstName: string;
  lastName: string;
}

//--- PROJECT ---//

export interface CreateProjectData {
  id: string;
  name: string;
  description: string;
  key: string;
  headId: string;
}

export interface ProjectAllData {
  id: string;
  name: string;
  description: string;
  headId: string;
}

export interface ProjectsData extends ProjectAllData {
  tags?: CreateTag[];
  users: UserNameData[];
}

export interface UpdateProjectRequest {
  name: string;
  description: string;
  headId?: string;
}

export interface UpdateProjectResponse {
  id: string;
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

export interface TaskByFilter {
  payload: PayloadData;
  projectId: string;
}

export interface TaskFindByFilterResponse {
  simpleId: string;
  name: string;
  type: CodeValue;
  status: CodeValue;
  priority: CodeValue;
  assigneeFullName: string;
  creatorFullName: string;
}

export interface TaskData {
  simpleId: string;
  name: string;
  description: string;
  type: CodeValue;
  priority: CodeValue;
  storyPoints: number;
  assignee: UserNameData;
  reviewer: UserNameData;
  creator: UserNameData;
  dueDate: string;
  timeEstimation: TimeEstimationData;
  timeUsed: TimeEstimationData;
  timeRemaining: TimeEstimationData;
  tags: [
    {
      id: string;
      name: string;
    }
  ];
  status: CodeValue;
  sprint: {
    id: string;
    name: string;
  };
  tester: {
    id: string;
    firstName: string;
    lastName: string;
  };
  storyTask: {
    simpleId: string;
    name: string;
  };
}

export interface UpdateTaskRequest {
  name: string;
  description: string;
  type: TaskType;
  priority: PriorityType;
  assigneeId: string;
  reviewerId: string;
  testerId?: string;
  sprintId?: string;
  dueDate?: string;
  timeEstimation: TimeEstimationData;
  tagIds?: string[];
}

export interface UpdateTaskResponse {
  id: string;
}

export interface UpdateTaskStatusRequest {
  status: Statuses;
}

export interface UpdateTaskStatusResponse {
  id: string;
}

export interface CodeValue {
  code: string;
  value: string;
}

export type TaskType = 'DEFECT' | 'STORY' | 'EPIC' | 'SUBTASK';

export type Statuses = 'OPEN' | 'IN_PROGRESS' | 'REVIEW' | 'RESOLVED' | 'QA_READY' | 'IN_QA' | 'CLOSED';

export type PriorityType = 'BLOCKER' | 'CRITICAL' | 'MAJOR' | 'MINOR' | 'TRIVIAL';

//--- FILTER ---//

export interface PayloadData {
  nameFragment: string;
  statuses: Statuses[];
  types: TaskType[];
  priorities: PriorityType[];
  storyPoints: number[];
  assigneeIds: string[];
  reviewerIds: string[];
  creatorIds: string[];
  tagsIds: string[];
}

export interface FilterData {
  payload: PayloadData[];
  name: string;
  id?: string;
  projectId?: string;
}

export interface UpdateFilterResponse {
  id: string;
}

export type UpdateFilterRequest = FilterData;

//--- USER_PROJECTS_CONTROLLER ---//

export interface UserProjectsControllerData {
  userId: string;
  projectId: string;
  permissionCode: string;
}

//--- NOTIFICATIONS ---//

export interface NotificationsData {
  viewed: boolean;
  recipientTelegramId: string;
  creationDateTime: number;
  text: string;
}

//--- STATE ---//

export interface AuthState {
  user: UserData | null;
  tokens: AuthTokens | null;
  authStatus: AuthorizationStatus;
  codeStatus: CodeStatus;
  error: string | null;
}

export interface ProjectState {
  projects: CreateProjectData | null;
  projectsAll: ProjectsData[];
  projectDetails: ProjectAllData | null;
  currentProject: CreateProjectData | null;
  status: CreationStatus;
  error: string | null;
  loading: boolean;
}

export interface TaskStatus {
  createTask: CreateTaskData | null;
  taskFindByFilter: TaskFindByFilterResponse | null;
  taskDetails: TaskData | null;
  updateTask: UpdateTaskResponse | null;
  updateTaskStatus: UpdateTaskStatusResponse | null;
  status: CreationStatus;
  error: string | null;
  loading: boolean;
}

export interface TagsState {
  tags: CreateTag | null;
  status: CreationStatus;
  error: string | null;
  loading: boolean;
}

export interface AddUserInProjectState {
  users: UserProjectsControllerData | null;
  status: AddUserStatus;
  error: string | null;
  loading: boolean;
}

export interface UsersState {
  user: UserNameData | null;
  loading: boolean;
  error: string | null;
  status: GetAllUser;
}
