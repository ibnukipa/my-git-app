import {createSelector, createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    username: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.token = null;
      state.username = null;
    },
  },
});

export const {login, logout} = authSlice.actions;

export const authState = state => state.auth;
export const authStateSelector = createSelector(authState, auth => auth);

export default authSlice.reducer;
