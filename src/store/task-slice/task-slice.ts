import {
  TaskFindByFilterResponse,
  TaskState,
} from '../../types/types.ts';
import {CreationStatus, NameSpace} from '../../const.ts';
import {createTask, getTaskBySimpleId, taskFindByFilter, updateTask, updateTaskStatus} from '../api-actions.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TaskState = {
  createTask: null,
  taskFindByFilter: [],
  taskDetails: null,
  updateTask: null,
  updateTaskStatus: null,
  lastFilter: null,
  status: CreationStatus.Idle,
  error: null,
};

const taskSlice = createSlice({
  name: NameSpace.Task,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.error = null;
        state.status = CreationStatus.Creating;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.error = null;
        state.status = CreationStatus.Created;
        state.createTask = action.payload;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create project';
        state.status = CreationStatus.Failed;
      })
      .addCase(getTaskBySimpleId.pending, (state) => {
        state.error = null;
        state.status = CreationStatus.NotFound;
      })
      .addCase(getTaskBySimpleId.fulfilled, (state, action) => {
        state.error = null;
        state.status = CreationStatus.Found;
        state.taskDetails = action.payload;
      })
      .addCase(getTaskBySimpleId.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create project';
        state.status = CreationStatus.Failed;
      })
      .addCase(taskFindByFilter.pending, (state, action) => {
        state.error = null;
        state.status = CreationStatus.NotFound;
        state.lastFilter = action.meta.arg;
      })
      .addCase(taskFindByFilter.fulfilled, (state, action: PayloadAction<TaskFindByFilterResponse[]>) => {
        state.error = null;
        state.status = CreationStatus.Found;
        state.taskFindByFilter = action.payload;
      })
      .addCase(taskFindByFilter.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create project';
        state.status = CreationStatus.Failed;
      })
      .addCase(updateTask.pending, (state) => {
        state.error = null;
        state.status = CreationStatus.Creating;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.error = null;
        state.status = CreationStatus.Created;
        state.updateTask = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create project';
        state.status = CreationStatus.Failed;
      })
      .addCase(updateTaskStatus.pending, (state) => {
        state.error = null;
        state.status = CreationStatus.Creating;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.error = null;
        state.status = CreationStatus.Created;
        state.updateTaskStatus = action.payload;
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create project';
        state.status = CreationStatus.Failed;
      });
  }
});


export const taskReducer = taskSlice.reducer;
export default taskSlice.reducer;
