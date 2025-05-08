import {AppState} from '../../types/state.ts';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {AuthState} from '../../types/types.ts';

export const getAuthStatus = (state: AppState): AuthorizationStatus => state[NameSpace.Auth].authStatus;
export const getCurrentUser = (state: AppState): AuthState['user'] => state[NameSpace.Auth].user;
