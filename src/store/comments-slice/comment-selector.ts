import {AppState} from '../../types/state.ts';
import {CommentState} from '../../types/types.ts';
import {NameSpace} from '../../const.ts';


export const getAlComments = (state: AppState): CommentState['getAllComments'] => state[NameSpace.Comment].getAllComments;
