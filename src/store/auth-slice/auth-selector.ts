import {AppState} from '../../types/state.ts';
import {AuthorizationStatus, NameSpace} from '../../const.ts';

export const getAuthStatus = (state: AppState): AuthorizationStatus => state[NameSpace.Auth].authStatus;
