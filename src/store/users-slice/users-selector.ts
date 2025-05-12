import {AppState} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';

export const getMyUser = (state: AppState): string | null => state[NameSpace.AllUsers].user?.id || null;
export const getUser = (state: AppState): string | null => state[NameSpace.AllUsers].user?.firstName || null;
