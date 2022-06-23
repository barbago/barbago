import {
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { initialState } from './initialState';

const reducerName = 'settings';

type NotificationTypes = 'Appointment' | 'Messages' | 'Requests';

type NotificationMethods = 'Text' | 'Email' | 'Push';

export interface SettingsState {
  dark: boolean;
  notifsEnabled: boolean;
  notifConfig: {
    type: NotificationTypes;
    methods: {
      method: NotificationMethods;
      active: boolean;
      editable: boolean;
    }[];
  }[];
}

export const doToggleDarkMode = createAction<any>(
  reducerName + '/toggleDarkMode',
);

export const doToggleNotificationMethod = createAction<any>(
  reducerName + '/toggleNotificationMethod',
);

export const doToggleNotifications = createAction(
  reducerName + '/toggleNotifications',
);

export const doFetchSettings = createAsyncThunk(
  reducerName + '/fetchSettings',
  async () => {
    const res = (await (await fetch('aaa')).json()) as SettingsState;
    return res;
  },
);

export const settingsSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doToggleDarkMode, (state, action) => {
      state.dark = !state.dark;
    }),
      builder.addCase(
        doToggleNotificationMethod,
        (state, action) => {},
      ),
      builder.addCase(doToggleNotifications, (state, action) => {
        state.notifsEnabled = !state.notifsEnabled;
      }),
      builder.addCase(doFetchSettings.pending, (state, action) => {}),
      builder.addCase(doFetchSettings.fulfilled, (state, action) => {}),
      builder.addCase(doFetchSettings.rejected, (state, action) => {});
  },
});

export const { reducer: settingsReducer } = settingsSlice;
