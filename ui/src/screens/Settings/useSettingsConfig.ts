import { useMemo } from 'react';
import {
  SettingsRoutes,
  SettingsStackParamList,
} from '../../navigation';
import { useAuth } from '../../providers';

export interface SettingSection {
  title: string;
  condition?: boolean;
  items: {
    title: string;
    subtitle?: string;
    leftIcon?: string;
    rightIcon?: 'chevron-right' | 'open-in-app';
    push?: keyof SettingsStackParamList;
    link?: string;
  }[];
}

// Icons: https://materialdesignicons.com/

export const useSettingsConfig = () => {
  const { user } = useAuth();

  const isAuthenticated = useMemo(() => !!user, [user]);

  const settingsConfig: SettingSection[] = [
    {
      title: 'Account Details',
      condition: isAuthenticated,
      items: [
        {
          title: 'Personal Information',
          leftIcon: 'account-circle',
          rightIcon: 'chevron-right',
          push: SettingsRoutes.Account,
        },
        {
          title: 'Notifications',
          leftIcon: 'bell-ring',
          rightIcon: 'chevron-right',
          push: SettingsRoutes.Notifications,
        },
        {
          title: 'Payment Details',
          leftIcon: 'currency-usd',
          rightIcon: 'chevron-right',
          push: SettingsRoutes.Payment,
        },
        // {
        //   title: 'App Preferences',
        //   leftIcon: 'tune',
        //   rightIcon: 'chevron-right',
        //   push: SettingsRoutes.Preferences
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
          push: SettingsRoutes.Contact,
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

  return settingsConfig;
};
