import {AppState} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';
import {UsersState} from '../../types/types.ts';

export const getAllUsers = (state: AppState): UsersState['list'] =>
  state[NameSpace.AllUsers].list;

