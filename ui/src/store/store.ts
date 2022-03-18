import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch,
  TypedUseSelectorHook,
  useSelector,
} from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { authReducer } from './auth';
import { searchReducer } from './search';
import { settingsReducer } from './settings';

const reducer = {
  auth: authReducer,
  search: searchReducer,
  settings: settingsReducer,
};

// rtk auto configures thunk, logger, dev tools
export const store = configureStore({
  reducer,
});

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
