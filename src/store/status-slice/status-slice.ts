import {AppropriateStatusState} from '../../types/types.ts';
import {GetAllUser, NameSpace} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {getAppropriateStatus,} from '../api-actions.ts';

const initialState: AppropriateStatusState = {
  appropriateStatus: [],
  status: GetAllUser.NotFound,
  error: null,
};

const statusSlice = createSlice({
  name: NameSpace.Status,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppropriateStatus.pending, (state) => {
        state.status = GetAllUser.Loading;
        state.error = null;
      })
      .addCase(getAppropriateStatus.fulfilled, (state, action) => {
        state.appropriateStatus = action.payload;
        state.status = GetAllUser.Found;
      })
      .addCase(getAppropriateStatus.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch sprints all';
        state.status = GetAllUser.Failed;
      });
  },
});

export const statusReducer = statusSlice.reducer;
export default statusSlice.reducer;
