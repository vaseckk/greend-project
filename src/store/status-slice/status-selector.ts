import {AppState} from '../../types/state.ts';
import {AppropriateStatusState} from '../../types/types.ts';
import {NameSpace} from '../../const.ts';

export const getAppropriateStatusSelector = (state: AppState): AppropriateStatusState['appropriateStatus'] => state[NameSpace.Status].appropriateStatus;
