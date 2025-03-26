import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice.jsx';
import messageReducer from './messageSlice.jsx';
import socketReducer from './socketSlice.jsx';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';

  const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    socket: socketReducer
});
  import storage from 'redux-persist/lib/storage';

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});


export default store;