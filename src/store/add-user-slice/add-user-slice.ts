import {AddUserInProjectState} from '../../types/types.ts';
import {AddUserStatus, NameSpace} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {AddUserInProjects, deleteUserInProjects} from '../api-actions.ts';

const initialState: AddUserInProjectState = {
  users: [],
  status: AddUserStatus.NotAdded,
  error: null,
  loading: false,
};

const addUserInProjectSlice = createSlice({
  name: NameSpace.AddUserInProject,
  initialState,
  reducers: {
    resetAddUserStatus: (state) => {
      state.status = AddUserStatus.NotAdded;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddUserInProjects.pending, (state) => {
        state.status = AddUserStatus.BeingAdding;
        state.loading = true;
        state.error = null;
      })
      .addCase(AddUserInProjects.fulfilled, (state, action) => {
        state.status = AddUserStatus.BeenAdded;
        state.users.push(action.payload);
        state.loading = false;
      })
      .addCase(AddUserInProjects.rejected, (state, action) => {
        state.status = AddUserStatus.Failed;
        state.error = action.error.message || 'Failed to add user to project';
        state.loading = false;
      })
      .addCase(deleteUserInProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserInProjects.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.userId !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUserInProjects.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to remove user from project';
        state.loading = false;
      });
  }
});

export const { resetAddUserStatus } = addUserInProjectSlice.actions;
export const addUserInProjectReducer = addUserInProjectSlice.reducer;
export default addUserInProjectSlice.reducer;
