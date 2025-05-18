import { AppState } from '../../types/state.ts';
import { NameSpace } from '../../const.ts';
import { AddUserInProjectState } from '../../types/types.ts';

export const getAddedUsers = (state: AppState): AddUserInProjectState['users'] =>
  state[NameSpace.AddUserInProject].users;

export const getProjectUsersByProjectId = (projectId: string) => (state: AppState) =>
  state[NameSpace.AddUserInProject].users.filter((user) => user.projectId === projectId);

