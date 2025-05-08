import {AppState} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';
import {ProjectState} from '../../types/types.ts';

export const getCurrentProject = (state: AppState): ProjectState['currentProject'] =>
  state[NameSpace.Project].currentProject;

