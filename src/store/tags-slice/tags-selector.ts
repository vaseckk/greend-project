import {AppState} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';
import {TagsState} from '../../types/types.ts';

export const getTags = (state: AppState): TagsState['tags'] =>
  state[NameSpace.Tags].tags;

export const getTagsStatus = (state: AppState): TagsState['status'] =>
  state[NameSpace.Tags].status;

export const getTagsError = (state: AppState): TagsState['error'] =>
  state[NameSpace.Tags].error;

export const getTagsLoading = (state: AppState): TagsState['loading'] =>
  state[NameSpace.Tags].loading;
