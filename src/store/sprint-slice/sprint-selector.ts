import {AppState} from '../../types/state.ts';
import {SprintState} from '../../types/types.ts';
import {NameSpace} from '../../const.ts';

export const getSprintStatus = (state: AppState): SprintState['status'] => state[NameSpace.Sprint].status;
export const getCurrentSprint = (state: AppState): SprintState['currentSprint'] => state[NameSpace.Sprint].currentSprint;
export const getAllSprintsSelector = (state: AppState): SprintState['getAllSprints'] => state[NameSpace.Sprint].getAllSprints;
