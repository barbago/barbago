import {
  SettingsRoutes,
  SettingsStackParamList,
} from '../../navigation';

export interface SettingSection {
  title: string;
  items: {
    title: string;
    subtitle?: string;
    leftIcon?: string;
    rightIcon?: 'chevron-right' | 'open-in-app';
    navigate?: keyof SettingsStackParamList;
    link?: string;
  }[];
}

export const settingsConfig: SettingSection[] = [
  {
    title: 'Account Details',
    items: [
      {
        title: 'Personal Information',
        leftIcon: 'account-circle',
        rightIcon: 'chevron-right',
        navigate: SettingsRoutes.Account,
      },
      // {
      //   title: 'Notifications',
      //   leftIcon: 'bell-ring',
      //   rightIcon: 'chevron-right',
      //   navigate: 'Notifications',
      // },
      {
        title: 'Payment Details',
        leftIcon: 'currency-usd',
        rightIcon: 'chevron-right',
        navigate: SettingsRoutes.Payment,
      },
      // {
      //   title: 'App Preferences',
      //   leftIcon: 'tune',
      //   rightIcon: 'chevron-right',
      //   navigate: 'Preferences',
      // },
    ],
  },
  {
    title: 'About Barbago',
    items: [
      {
        title: 'Contact Us',
        leftIcon: 'message-alert',
        rightIcon: 'chevron-right',
        navigate: SettingsRoutes.Contact,
      },
      {
        title: 'Learn More',
        leftIcon: 'information',
        rightIcon: 'open-in-app',
        link: 'https://site.barbago.app/info',
      },
      {
        title: 'Terms of Service',
        leftIcon: 'file-document-edit',
        rightIcon: 'open-in-app',
        link: 'https://site.barbago.app/tos',
      },
      {
        title: 'Privacy Policy',
        leftIcon: 'eye-off',
        rightIcon: 'open-in-app',
        link: 'https://site.barbago.app/privacy',
      },
    ],
  },
  // {
  //   title: 'Earn with Barbago',
  //   items: [
  //     {
  //       title: 'Refer a user',
  //       subtitle: 'Get money for inviting people!',
  //       leftIcon: 'account-multiple',
  //       rightIcon: 'chevron-right',
  //     },
  //     {
  //       title: 'Work with Barbago',
  //       subtitle: 'List your services on the platform',
  //       leftIcon: 'briefcase',
  //       rightIcon: 'chevron-right',
  //     },
  //   ],
  // },
];

// Icons: https://materialdesignicons.com/
