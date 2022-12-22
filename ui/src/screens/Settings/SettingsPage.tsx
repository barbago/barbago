import { openBrowserAsync } from 'expo-web-browser';
import React from 'react';
import { Button, List } from 'react-native-paper';

import { AuthCard, Screen, SignInOutButton } from '../../components';
import { env } from '../../config';
import { SettingsStackScreenProps } from '../../navigation';
import { settingsConfig } from './settings-config';

export const SettingsPage = ({
  navigation,
}: SettingsStackScreenProps<'Settings'>) => {
  return (
    <Screen
      edges={['top']}
      scrolling
      scrollViewProps={{ style: { paddingVertical: 16 } }}
    >
      <AuthCard />
      {settingsConfig.map(({ title, items }, index) => (
        <List.Section title={title} key={index}>
          {items.map(
            (
              { title, subtitle, leftIcon, rightIcon, navigate, link },
              index,
            ) => (
              <List.Item
                title={title}
                key={index}
                description={subtitle}
                left={(props) =>
                  leftIcon && <List.Icon icon={leftIcon} {...props} />
                }
                right={(props) =>
                  rightIcon && <List.Icon icon={rightIcon} {...props} />
                }
                onPress={() => {
                  if (navigate) navigation.push(navigate);
                  if (link) openBrowserAsync(link);
                }}
              />
            ),
          )}
        </List.Section>
      ))}
      <SignInOutButton />
      <Button onPress={() => alert(JSON.stringify(env))} style={{ 'alignSelf': 'flex-start'}}>Debug</Button>
    </Screen>
  );
};
