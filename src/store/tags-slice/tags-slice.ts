import {TagsState} from '../../types/types.ts';
import {CreationStatus, NameSpace} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {createTag, deleteTag} from '../api-actions.ts';

const initialState: TagsState = {
  tags: [],
  status: CreationStatus.Idle,
  error: null,
  loading: false,
};

const tagsSlice = createSlice({
  name: NameSpace.Tags,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTag.pending, (state) => {
        state.status = CreationStatus.Creating;
        state.loading = true;
        state.error = null;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.status = CreationStatus.Created;
        state.tags.push(action.payload);
        state.loading = false;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.status = CreationStatus.Failed;
        state.error = action.error.message || 'Failed to create tag';
        state.loading = false;
      })

      // Удаление тега
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.tags = state.tags.filter((tag) => tag.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete tag';
        state.loading = false;
      });
  }
});


export const tagsReducer = tagsSlice.reducer;
export default tagsSlice.reducer;
