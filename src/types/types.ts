import {
  AddUserStatus,
  AuthorizationStatus,
  CodeStatus,
  CreationStatus,
  GetAllUser,
  TaskStatus,
  TIME_UNITS
} from '../const.ts';
import {ALLOWED_STORY_POINTS} from '../const.ts';

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
  firstName: string;
  lastName: string;
  id: string;
}

export interface HeadUsersProject {
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
  head: HeadUsersProject;
  users: HeadUsersProject[];
  tags: TaskData[];
}

export interface ProjectsData {
  id: string;
  name: string;
  description: string;
  tags?: CreateTag[];
  users: UserNameData[];
  head: HeadUsersProject;
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
  storyPoints: StoryPoint;
  sprintId?: string;
  assigneeId?: string;
  reviewerId?: string;
  storyTaskId?: string;
  epicTaskId?: string;
  projectId?: string;
  dueDate: string;
  timeEstimation?: TimeEstimationData;
  tagsIds?: string[];
}

export type StoryPoint = typeof ALLOWED_STORY_POINTS[number];

export interface TimeEstimationData {
  timeUnit: typeof TIME_UNITS[number];
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
  id: string;
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

export interface CreateTaskResponse {
  id: string;
  simpleId: string;
}

export interface UpdateTaskRequest {
  name: string;
  description: string;
  type: TaskType;
  priority: PriorityType;
  assigneeId?: string;
  reviewerId?: string;
  storyPoints: number;
  storyTaskId?: string;
  testerId?: string;
  sprintId?: string;
  dueDate?: string;
  timeEstimation?: TimeEstimationData;
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

export interface StoriesData {
  simpleId: string;
  name: string;
  status: string;
  priority: PriorityType;
  assigneeId: string;
  subtasks: SubtaskData[];
}

export type SubtaskData = Omit<StoriesData, 'subtasks'>;

export type DefectsData = SubtaskData;

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
  permissionCode?: string;
}

//--- NOTIFICATIONS ---//

export interface NotificationsData {
  viewed: boolean;
  recipientTelegramId: string;
  creationDateTime: number;
  text: string;
}

//LOG

export interface CreateLogs {
  id: string;
  comment: string;
  timeEstimation: TimeEstimationData;
  date: string;
}

export type UpdateLogsResponse = Omit<CreateLogs, 'id'>;

export interface UpdateLogsRequest {
  id: string;
}

//COMMENT

export interface CreateComment {
  id: string;
  content: string;
}

export interface UpdateCommentResponse {
  id: string;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface AllComments {
  id: string;
  content: string;
  created: string;
  updated: string;
  authorId: string;
  authorName: string;
}

//SPRINT

export interface CreateSprint {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  projectId: string;
}

export type UpdateSprintResponse = Omit<CreateSprint, 'projectId'>;

export interface UpdateSprintRequest {
  id: string;
}

export interface SprintData extends CreateSprint{
  storyCount: number;
  defectCount: number;
  stories: StoriesData[];
  defects: DefectsData[];
}

export interface SprintAllData {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
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
  createProjects: CreateProjectData | null;
  projectsAll: ProjectAllData[];
  currentProjectDetails: ProjectsData | null;
  updateProject: UpdateProjectResponse | null;
  status: CreationStatus;
  error: string | null;
  loading: boolean;
}

export interface TaskState {
  createTask: CreateTaskResponse | null;
  taskFindByFilter: TaskFindByFilterResponse[];
  taskDetails: TaskData | null;
  updateTask: UpdateTaskResponse | null;
  updateTaskStatus: UpdateTaskStatusResponse | null;
  lastFilter: TaskByFilter | null;
  status: CreationStatus;
  error: string | null;
}

export interface FilterState {
  createFilter: FilterData | null;
  updateFilter: UpdateFilterResponse | null;
  filtersAll: FilterData[];
  filterByProject: FilterData[];
  status: CreationStatus;
  error: string | null;
}

export interface TagsState {
  tags: CreateTag[];
  status: CreationStatus;
  error: string | null;
  loading: boolean;
}

export interface AddUserInProjectState {
  users: UserProjectsControllerData[];
  status: AddUserStatus;
  error: string | null;
  loading: boolean;
}

export interface UsersState {
  user: UserNameData | null;
  usersAutocomplete: UserNameData[];
  loading: boolean;
  error: string | null;
  status: GetAllUser;
}

export interface NotificationsState {
  notificationsDetails: NotificationsData[];
  status: TaskStatus;
  error: string | null;
}

export interface SprintState {
  currentSprint: SprintData | null;
  getAllSprints: SprintAllData[];
  createdSprint: CreateSprint | null;
  chooseCurrentSprint: SprintAllData | null;
  updatedSprint: UpdateSprintResponse | null;
  status: CreationStatus;
  error: string | null;
  loading: boolean;
}

export interface CommentState {
  createComment: CreateComment | null;
  updateComment: UpdateCommentResponse | null;
  getAllComments: AllComments[];
  status: CreationStatus;
  error: string | null;
  loading: boolean;
}

export type UpdateTaskRequestData = {
  name: string;
  description: string;
  type: TaskType;
  priority: PriorityType;
  storyPoints: number;
  assigneeId?: string;
  reviewerId?: string;
  sprintId?: string;
  dueDate?: string;
  timeEstimation?: TimeEstimationData;
  tagIds?: string[];
  projectId: string;
} & (
  | { type: 'STORY'; epicTaskId?: string }
  | { type: 'SUBTASK' | 'DEFECT'; storyTaskId?: string }
  | { type: 'EPIC' }
  );
