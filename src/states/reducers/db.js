import {createSlice} from '@reduxjs/toolkit';
import {isEmpty} from 'lodash';
import {logout} from './auth';

// TODO moved to local database
const initialDbState = {
  users: {},
  repositories: {},
  commits: {},
  issues: {},
};
export const dbSlice = createSlice({
  name: '_db',
  initialState: initialDbState,
  reducers: {
    insertModel: (state, action) => {
      const {model, id, data} = action.payload;
      if (model && id && !isEmpty(data)) {
        state[model][id] = data;
      }
    },
    deleteModel: (state, action) => {
      const {model, id} = action.payload;
      if (model && id) {
        delete state[model][id];
      }
    },
    insertCollection: (state, action) => {
      const {model, data} = action.payload;
      if (model && !isEmpty(data)) {
        state[model] = {
          ...state[model],
          ...data,
        };
      }
    },
    clearCollection: (state, action) => {
      const {model} = action.payload;
      if (model) {
        state[model] = {};
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(logout, state => {
      state = initialDbState;
    });
  },
});

export const {insertModel, deleteModel, insertCollection, clearCollection} =
  dbSlice.actions;

export const getByIdSelector = (state, {model, id}) =>
  state.db[model]?.[id] || {};
export const getCollectionSelector = (state, {model}) => {
  return state.db[model] || [];
};

export default dbSlice.reducer;
