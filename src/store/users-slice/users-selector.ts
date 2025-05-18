import {AppState} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';
import {UsersState} from '../../types/types.ts';

export const getMyUser = (state: AppState): string | null => state[NameSpace.AllUsers].user?.firstName || null;
export const getUser = (state: AppState): string | null => state[NameSpace.AllUsers].user?.firstName || null;
export const getUserId = (state: AppState): string => state[NameSpace.AllUsers].user?.id || '';
export const getExample = (state: AppState): UsersState['user'] => state[NameSpace.AllUsers].user;


export const getUsersAutocompleteList = (state: AppState): UsersState['usersAutocomplete'] =>
  state[NameSpace.AllUsers].usersAutocomplete;
