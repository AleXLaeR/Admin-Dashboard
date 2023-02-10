import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import thunk from 'redux-thunk';
import { globalReducer, modalReducer } from '@redux/slices';

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
  reducer: {
    global: persistReducer(persistConfig, globalReducer),
    modal: modalReducer,
  },
  middleware: [thunk],
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
