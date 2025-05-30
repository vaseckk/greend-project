import {LogsState} from '../../types/types.ts';
import {CreationStatus, NameSpace} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {createLogs, deleteLogs, updateLogs} from '../api-actions.ts';

const initialState: LogsState = {
  logs: null,
  deleteLog: [],
  status: CreationStatus.Idle,
  error: null,
  loading: false,
};

const logsSlice = createSlice({
  name: NameSpace.Logs,
  initialState,
  reducers: {
    resetLogsStatus: (state) => {
      state.status = CreationStatus.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Создание лога
      .addCase(createLogs.pending, (state) => {
        state.status = CreationStatus.Creating;
        state.loading = true;
        state.error = null;
      })
      .addCase(createLogs.fulfilled, (state, action) => {
        state.status = CreationStatus.Created;
        state.logs = action.payload;
        state.loading = false;
      })
      .addCase(createLogs.rejected, (state, action) => {
        state.status = CreationStatus.Failed;
        state.error = action.error.message || 'Failed to create log';
        state.loading = false;
      })

      // Обновление лога
      .addCase(updateLogs.pending, (state) => {
        state.status = CreationStatus.Creating;
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLogs.fulfilled, (state) => {
        state.status = CreationStatus.Created;
        state.loading = false;
      })
      .addCase(updateLogs.rejected, (state, action) => {
        state.status = CreationStatus.Failed;
        state.error = action.error.message || 'Failed to update log';
        state.loading = false;
      })

      // Удаление лога
      .addCase(deleteLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLogs.fulfilled, (state, action) => {
        state.deleteLog = state.deleteLog.filter((log) => log.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteLogs.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete log';
        state.loading = false;
      });
  }
});

export const { resetLogsStatus} = logsSlice.actions;
export const logsReducer = logsSlice.reducer;
export default logsSlice.reducer;
