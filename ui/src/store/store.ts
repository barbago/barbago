import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {
  useDispatch,
  TypedUseSelectorHook,
  useSelector,
} from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { api } from './api';
import { authReducer } from './auth';
import { listenerMiddleware } from './listenerMiddleware';
import { searchReducer } from './search';
import { settingsReducer } from './settings';

const reducer = {
  auth: authReducer,
  search: searchReducer,
  settings: settingsReducer,
  [api.reducerPath]: api.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    // https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
    // you can have non-serializable items in store,
    // but it may break hydration and time-travel
    getDefaultMiddleware({ serializableCheck: false })
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type ThunkFunc<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;
