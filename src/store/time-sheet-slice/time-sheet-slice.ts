import {TimeSheetState} from '../../types/types.ts';
import {GetAllUser, NameSpace} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {getTimeSheetProject, getTimeSheetTask} from '../api-actions.ts';

const initialState: TimeSheetState = {
  timeSheetProject: [],
  timeSheetTask: [],
  error: null,
  loading: false,
  status: GetAllUser.NotFound,
};

const timeSheetSlice = createSlice({
  name: NameSpace.TimeSheet,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTimeSheetProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = GetAllUser.Loading;
      })
      .addCase(getTimeSheetProject.fulfilled, (state, action) => {
        state.timeSheetProject = action.payload;
        state.status = GetAllUser.Found;
      })
      .addCase(getTimeSheetProject.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch users';
        state.status = GetAllUser.Failed;
      })
      .addCase(getTimeSheetTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = GetAllUser.Loading;
      })
      .addCase(getTimeSheetTask.fulfilled, (state, action) => {
        state.timeSheetTask = action.payload;
        state.status = GetAllUser.Found;
      })
      .addCase(getTimeSheetTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch users';
        state.status = GetAllUser.Failed;
      });
  }
});


export const timeSheetReducer = timeSheetSlice.reducer;
export default timeSheetSlice.reducer;
