import {AppState} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';
import {TimeSheetState} from '../../types/types.ts';

export const getTimeSheetTaskSelector = (state: AppState): TimeSheetState['timeSheetTask'] =>
  state[NameSpace.TimeSheet].timeSheetTask;

export const getTimeSheetProjectSelector = (state: AppState): TimeSheetState['timeSheetProject'] =>
  state[NameSpace.TimeSheet].timeSheetProject;
