import {createSlice} from '@reduxjs/toolkit';
import {isEmpty} from 'lodash';

// TODO moved to local database
export const dbSlice = createSlice({
  name: '_db',
  initialState: {
    users: {},
    repositories: {},
    commits: {},
    issues: {},
  },
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
    clearCollection: (state, action) => {
      const {model} = action.payload;
      if (model) {
        state[model] = {};
      }
    },
  },
});

export const {insertModel, deleteModel, clearCollection} = dbSlice.actions;

export const getByIdSelector = (state, {model, id}) =>
  state.db[model]?.[id] || {};
export const getCollectionSelector = (state, {model}) => {
  return state.db[model] || [];
};

export default dbSlice.reducer;
