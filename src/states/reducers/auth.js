import {createSelector, createSlice} from '@reduxjs/toolkit';
import {getCollectionSelector} from './db';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    username: null,
    token: null,
    id: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.id = action.payload.id;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.token = null;
      state.username = null;
      state.id = null;
    },
  },
});

export const {login, logout} = authSlice.actions;

export const authStateSelector = state => state.auth;
export const profileSelector = createSelector(
  [authStateSelector, state => getCollectionSelector(state, {model: 'users'})],
  (auth, users) => users[auth.id] || {},
);

export default authSlice.reducer;
