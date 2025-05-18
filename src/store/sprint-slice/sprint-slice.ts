import {SprintAllData, SprintState} from '../../types/types.ts';
import {CreationStatus, NameSpace} from '../../const.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createSprint, getAllSprints, getSprint, updateSprint, updateTaskSprint} from '../api-actions.ts';

const initialState: SprintState = {
  currentSprint: null,
  chooseCurrentSprint: null,
  getAllSprints: [],
  createdSprint: null,
  updatedSprint: null,
  status: CreationStatus.Idle,
  error: null,
  loading: false,
};

const sprintSlice = createSlice({
  name: NameSpace.Sprint,
  initialState,
  reducers: {
    resetSprintStatus: (state) => {
      state.status = CreationStatus.Idle;
      state.error = null;
    },
    clearSprintsData: (state) => {
      state.getAllSprints = [];
      state.currentSprint = null;
    },
    setCurrentSprint: (state, action: PayloadAction<SprintAllData | null>) => {
      state.chooseCurrentSprint = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSprint.pending, (state) => {
        state.status = CreationStatus.Creating;
        state.loading = true;
        state.error = null;
      })
      .addCase(createSprint.fulfilled, (state, action) => {
        state.status = CreationStatus.Created;
        state.createdSprint = action.payload;
        state.loading = false;
      })
      .addCase(createSprint.rejected, (state, action) => {
        state.status = CreationStatus.Failed;
        state.error = action.error.message || 'Failed to create sprint';
        state.loading = false;
      })
      .addCase(updateSprint.pending, (state) => {
        state.status = CreationStatus.Creating;
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSprint.fulfilled, (state, action) => {
        state.status = CreationStatus.Created;
        state.updatedSprint = action.payload;
        state.loading = false;
      })
      .addCase(updateSprint.rejected, (state, action) => {
        state.status = CreationStatus.Failed;
        state.error = action.error.message || 'Failed to update sprint';
        state.loading = false;
      })
      .addCase(updateTaskSprint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskSprint.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTaskSprint.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update task in sprint';
        state.loading = false;
      })
      .addCase(getAllSprints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSprints.fulfilled, (state, action) => {
        state.getAllSprints = action.payload;
        state.loading = false;
      })
      .addCase(getAllSprints.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch sprints all';
        state.loading = false;
      })
      .addCase(getSprint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSprint.fulfilled, (state, action) => {
        state.currentSprint = action.payload;
        state.loading = false;
      })
      .addCase(getSprint.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch sprint';
        state.loading = false;
      });
  },
});

export const { resetSprintStatus, clearSprintsData, setCurrentSprint } = sprintSlice.actions;
export const sprintReducer = sprintSlice.reducer;
export default sprintSlice.reducer;
