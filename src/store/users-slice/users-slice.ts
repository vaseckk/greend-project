import {UsersState} from '../../types/types.ts';
import {GetAllUser, NameSpace} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {getUserInfo} from '../api-actions.ts';

const initialState: UsersState = {
  list: [],
  error: null,
  loading: false,
  status: GetAllUser.NotFound,
};

const usersSlice = createSlice({
  name: NameSpace.AllUsers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = GetAllUser.Loading;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
        state.status = GetAllUser.Found;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
        state.status = GetAllUser.Failed;
      });
  }
});


export const usersReducer = usersSlice.reducer;
export default usersSlice.reducer;
