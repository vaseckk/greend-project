import {AppState} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';
import {CreateTag, HeadUsersProject, ProjectState, UserNameData} from '../../types/types.ts';

export const getProjectInfo = (state: AppState): ProjectState['currentProjectDetails'] =>
  state[NameSpace.Project].currentProjectDetails;

export const getHeadUserProject = (state: AppState): HeadUsersProject | undefined =>
  state[NameSpace.Project].currentProjectDetails?.head;

export const getTagsProject = (state: AppState): CreateTag[] =>
  state[NameSpace.Project].currentProjectDetails?.tags || [];

export const getUsersProject = (state: AppState): UserNameData[] =>
  state[NameSpace.Project].currentProjectDetails?.users || [];

export const isLoading = (state: AppState): ProjectState['loading'] =>
  state[NameSpace.Project].loading;

export const getAllProjects = (state: AppState): ProjectState['projectsAll'] =>
  state[NameSpace.Project].projectsAll;
