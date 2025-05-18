import {FilterState,} from '../../types/types.ts';
import {CreationStatus, NameSpace} from '../../const.ts';
import {createFilter, deleteFilter, GetFillersAll, GetFilters, updateFilter} from '../api-actions.ts';
import {createSlice, } from '@reduxjs/toolkit';

const initialState: FilterState = {
  createFilter: null,
  updateFilter: null,
  filtersAll: [],
  filterByProject: [],
  status: CreationStatus.Idle,
  error: null,
};

const filterSlice = createSlice({
  name: NameSpace.Task,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFilter.pending, (state) => {
        state.error = null;
        state.status = CreationStatus.Creating;
      })
      .addCase(createFilter.fulfilled, (state, action) => {
        state.error = null;
        state.status = CreationStatus.Created;
        state.createFilter = action.payload;
      })
      .addCase(createFilter.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create project';
        state.status = CreationStatus.Failed;
      })
      .addCase(GetFilters.pending, (state) => {
        state.error = null;
        state.status = CreationStatus.NotFound;
      })
      .addCase(GetFilters.fulfilled, (state, action) => {
        state.error = null;
        state.status = CreationStatus.Found;
        state.filterByProject = action.payload;
      })
      .addCase(GetFilters.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create project';
        state.status = CreationStatus.Failed;
      })
      .addCase(GetFillersAll.pending, (state) => {
        state.error = null;
        state.status = CreationStatus.NotFound;
      })
      .addCase(GetFillersAll.fulfilled, (state, action) => {
        state.error = null;
        state.status = CreationStatus.Found;
        state.filtersAll = action.payload;
      })
      .addCase(GetFillersAll.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create project';
        state.status = CreationStatus.Failed;
      })
      .addCase(updateFilter.pending, (state) => {
        state.error = null;
        state.status = CreationStatus.Creating;
      })
      .addCase(updateFilter.fulfilled, (state, action) => {
        state.error = null;
        state.status = CreationStatus.Created;
        state.updateFilter = action.payload;
      })
      .addCase(updateFilter.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create project';
        state.status = CreationStatus.Failed;
      })
      // Удаление
      .addCase(deleteFilter.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteFilter.fulfilled, (state, action) => {
        state.filterByProject = state.filterByProject.filter((filter) => filter.id !== action.payload);
      })
      .addCase(deleteFilter.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete tag';
      });
  }
});


export const filterReducer = filterSlice.reducer;
export default filterSlice.reducer;
