import {UserNameData, UsersState} from '../../types/types.ts';
import {GetAllUser, NameSpace} from '../../const.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getUserInfo, getUsersAutocomplete} from '../api-actions.ts';

const initialState: UsersState = {
  user: null,
  usersAutocomplete: [],
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
      .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<UserNameData>) => {
        state.user = action.payload;
        state.status = GetAllUser.Found;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch users';
        state.status = GetAllUser.Failed;
      })
      .addCase(getUsersAutocomplete.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = GetAllUser.Loading;
      })
      .addCase(getUsersAutocomplete.fulfilled, (state, action: PayloadAction<UserNameData[]>) => {
        state.usersAutocomplete = action.payload;
        state.status = GetAllUser.Found;
      })
      .addCase(getUsersAutocomplete.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch users';
        state.status = GetAllUser.Failed;
      });
  }
});


export const usersReducer = usersSlice.reducer;
export default usersSlice.reducer;
