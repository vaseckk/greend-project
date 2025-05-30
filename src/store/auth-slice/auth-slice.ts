import {AuthState} from '../../types/types.ts';
import {AuthorizationStatus, CodeStatus, NameSpace} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  refreshTokensAction,
  sendCodeAction,
  verifyCodeAction
} from '../api-actions.ts';
import {ACCESS_TOKEN_KEY} from '../../services/token.ts';

const initialState: AuthState = {
  user: null,
  tokens: null,
  authStatus:  localStorage.getItem(ACCESS_TOKEN_KEY)
    ? AuthorizationStatus.Auth // Если есть токен → считаем авторизованным
    : AuthorizationStatus.Unknown,
  codeStatus: CodeStatus.Unknown,
  error: null,
};

const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: { resetAuthState: (state) => {
    state.codeStatus = CodeStatus.Unknown;
    state.error = null;
  },},
  extraReducers: (builder) => {
    builder
      .addCase(sendCodeAction.pending, (state) => {
        state.codeStatus = CodeStatus.Sending;
      })
      .addCase(sendCodeAction.fulfilled, (state) => {
        state.codeStatus = CodeStatus.Sent; // Успешно отправлен
      })
      .addCase(sendCodeAction.rejected, (state) => {
        state.codeStatus = CodeStatus.Failed;
      })

      // Проверка кода
      .addCase(verifyCodeAction.pending, (state) => {
        state.codeStatus = CodeStatus.Verifying;
      })
      .addCase(verifyCodeAction.fulfilled, (state, action) => {
        state.tokens = action.payload;
        state.codeStatus = CodeStatus.Verified; // Успешно проверен
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(verifyCodeAction.rejected, (state) => {
        state.codeStatus = CodeStatus.Failed;
      })

      // Логин
      .addCase(loginAction.pending, (state) => {
        state.authStatus = AuthorizationStatus.Loading;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.Failed;
      })

      // Обновление токенов
      .addCase(refreshTokensAction.fulfilled, (state, action) => {
        state.tokens = action.payload;
      })
      .addCase(checkAuthAction.pending, (state) => {
        state.authStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.Failed;
      })

      // Выход
      .addCase(logoutAction.fulfilled, (state) => {
        Object.assign(state, initialState);
      });
  }
});


export const authReducer = authSlice.reducer;
export default authSlice.reducer;
