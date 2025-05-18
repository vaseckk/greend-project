import {NotificationsState} from '../../types/types.ts';
import { NameSpace, TaskStatus} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {getNotifications} from '../api-actions.ts';

const initialState: NotificationsState = {
  notificationsDetails: [],
  error: null,
  status: TaskStatus.InProgress,
};

const notificationsSlice = createSlice({
  name: NameSpace.AllUsers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.error = null;
        state.status = TaskStatus.InProgress;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notificationsDetails = action.payload;
        state.status = TaskStatus.Done;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch users';
        state.status = TaskStatus.ToDo;
      });
  }
});


export const notificationsReducer = notificationsSlice.reducer;
export default notificationsSlice.reducer;
