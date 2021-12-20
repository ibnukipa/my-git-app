import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {createPersistStorage} from '../utils/sensitiveStorage';
import auth from './reducers/auth';
import db from './reducers/db';

const reducers = {
  auth,
  db,
};

const persistConfig = {
  key: 'mygitpersistedstates',
  storage: createPersistStorage(),
};
const persistedReducers = persistReducer(
  persistConfig,
  combineReducers(reducers),
);

let reduxDebuggerFlipper = null;
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  reduxDebuggerFlipper = createDebugger();
}

const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(reduxDebuggerFlipper),
});

const persistor = persistStore(store);

export {persistor, store};
