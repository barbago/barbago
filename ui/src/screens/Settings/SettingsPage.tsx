import { openBrowserAsync } from 'expo-web-browser';
import React from 'react';
import { Button, List } from 'react-native-paper';

import { AuthCard, Screen, SignInOutButton } from '../../components';
import { env } from '../../config';
import {
  SettingsRoutes,
  SettingsStackScreenProps,
} from '../../navigation';
import { useSettingsConfig } from './useSettingsConfig';

export const SettingsPage = ({
  navigation,
}: SettingsStackScreenProps<SettingsRoutes.Settings>) => {
  const settingsConfig = useSettingsConfig();

  return (
    <Screen
      edges={['top']}
      scrolling
      scrollViewProps={{ style: { paddingVertical: 16 } }}
    >
      <AuthCard />
      {settingsConfig.map(
        ({ title, items, condition = true }, index) =>
          condition && (
            <List.Section title={title} key={index}>
              {items.map(
                (
                  { title, subtitle, leftIcon, rightIcon, push, link },
                  itemIndex,
                ) =>
                  condition && (
                    <List.Item
                      title={title}
                      key={itemIndex}
                      description={subtitle}
                      left={(props) =>
                        leftIcon && (
                          <List.Icon icon={leftIcon} {...props} />
                        )
                      }
                      right={(props) =>
                        rightIcon && (
                          <List.Icon icon={rightIcon} {...props} />
                        )
                      }
                      onPress={() => {
                        if (push) navigation.push(push);
                        if (link) openBrowserAsync(link);
                      }}
                    />
                  ),
              )}
            </List.Section>
          ),
      )}
      <SignInOutButton />
      <Button
        onPress={() => alert(JSON.stringify(env))}
        style={{ alignSelf: 'flex-start' }}
      >
        Debug
      </Button>
    </Screen>
  );
};
