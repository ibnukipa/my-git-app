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

const reducers = {
  auth,
};

const persistConfig = {
  key: 'mygitstatestoragekey',
  storage: createPersistStorage(),
};
const persistedReducers = persistReducer(
  persistConfig,
  combineReducers(reducers),
);

const middlewares = [];

const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export {persistor, store};
