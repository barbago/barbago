import React, { useState } from 'react';
import { Checkbox, DataTable, List, Switch } from 'react-native-paper';
import { Screen } from '../../../components';
import { SettingsStackScreenProps } from '../../../navigation';

export const NotificationsPage = ({
  navigation,
}: SettingsStackScreenProps<'Notifications'>) => {
  const [allowNotifs, setAllowNotifs] = useState(true);

  return (
    <Screen scrolling>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 2 }}>
            Category
          </DataTable.Title>
          <DataTable.Title>Push</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Text</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell style={{ flex: 2 }}>
            Appointment
          </DataTable.Cell>
          <DataTable.Cell>
            <Checkbox status="checked" disabled />
          </DataTable.Cell>
          <DataTable.Cell>
            <Checkbox status="unchecked" />
          </DataTable.Cell>
          <DataTable.Cell>
            <Checkbox status="checked" />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={{ flex: 2 }}>Messages</DataTable.Cell>
          <DataTable.Cell>
            <Checkbox status="checked" />
          </DataTable.Cell>
          <DataTable.Cell>
            <Checkbox status="checked" />
          </DataTable.Cell>
          <DataTable.Cell>
            <Checkbox status="checked" />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={{ flex: 2 }}>Requests</DataTable.Cell>
          <DataTable.Cell>
            <Checkbox status="checked" />
          </DataTable.Cell>
          <DataTable.Cell>
            <Checkbox status="checked" />
          </DataTable.Cell>
          <DataTable.Cell>
            <Checkbox status="checked" />
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <List.Item
        title={
          allowNotifs
            ? 'Notifications Enabled'
            : 'Notifications Disabled'
        }
        description={
          allowNotifs
            ? 'You can choose how you want to get our alerts'
            : "You'll only get essential alerts from us"
        }
        left={(props) => (
          <List.Icon
            icon={allowNotifs ? 'bell' : 'bell-off'}
            {...props}
          />
        )}
        right={(props) => (
          <Switch
            value={!allowNotifs}
            onValueChange={() => setAllowNotifs(!allowNotifs)}
            {...props}
          />
        )}
      />
    </Screen>
  );
};
