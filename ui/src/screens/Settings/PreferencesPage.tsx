import React, { useState } from 'react';
import { List, Switch, Title } from 'react-native-paper';
import { Screen } from '../../components';

export const PreferencesPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Screen>
      <List.Section title="Display">
        <List.Item
          title="Dark Mode"
          left={(props) => (
            <List.Icon icon="brightness-6" {...props} />
          )}
          right={(props) => (
            <Switch
              value={darkMode}
              onValueChange={() => setDarkMode(!darkMode)}
              {...props}
            />
          )}
        />
      </List.Section>
      <List.Section title="Security">
        <List.Item
          title="View blocked users"
          description="Work in Progress"
          left={(props) => (
            <List.Icon icon="account-off" {...props} />
          )}
          right={(props) => (
            <List.Icon icon="chevron-right" {...props} />
          )}
        />
      </List.Section>
      <Title>This page is a work in progress!</Title>
    </Screen>
  );
};
