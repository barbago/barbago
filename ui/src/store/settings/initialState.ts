import { SettingsState } from './slice';

export const initialState: SettingsState = {
  dark: true,
  notifsEnabled: true,
  notifConfig: [
    {
      type: 'Appointment',
      methods: [
        {
          method: 'Text',
          active: true,
          editable: true,
        },
        {
          method: 'Email',
          active: true,
          editable: true,
        },
        {
          method: 'Push',
          active: true,
          editable: false,
        },
      ],
    },
    {
      type: 'Messages',
      methods: [
        {
          method: 'Text',
          active: true,
          editable: true,
        },
        {
          method: 'Email',
          active: true,
          editable: true,
        },
        {
          method: 'Push',
          active: true,
          editable: true,
        },
      ],
    },
    {
      type: 'Requests',
      methods: [
        {
          method: 'Text',
          active: true,
          editable: true,
        },
        {
          method: 'Email',
          active: true,
          editable: true,
        },
        {
          method: 'Push',
          active: true,
          editable: true,
        },
      ],
    },
  ],
};
