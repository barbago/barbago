import React, { useState } from 'react';
import { Linking } from 'react-native';
import { useForm, FieldValues } from 'react-hook-form';
import { Button, Card, List, Menu } from 'react-native-paper';
import { Screen, ValidTextInput } from '../../components';
import { useAuth } from '../../hooks';

export const ContactPage = () => {
  const { user } = useAuth();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    alert('SUCCESS! ' + JSON.stringify(data));
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <Screen>
      <Card>
        <List.Item
          title="help@barbago.app"
          left={(props) => <List.Icon icon="email" {...props} />}
          onPress={() =>
            Linking.openURL('mailto:support@barbago.com')
          }
        />
        <Menu
          visible={showMenu}
          onDismiss={() => {
            setShowMenu(false);
          }}
          anchor={
            <List.Item
              title="+1-234-567-8901"
              left={(props) => <List.Icon icon="phone" {...props} />}
              onPress={() => setShowMenu(true)}
            />
          }
        >
          <Menu.Item
            title="Text"
            onPress={() => Linking.openURL('sms:+12345678901')}
          />
          <Menu.Item
            title="Call"
            onPress={() => Linking.openURL('tel:+12345678901')}
          />
        </Menu>
      </Card>
      <Card style={{ marginTop: 20 }}>
        <Card.Title title="Send us a message!" />
        <Card.Content>
          <ValidTextInput
            label="Email Address"
            name="emailAddress"
            control={control}
            defaultValue={user?.email ?? ''}
            rules={{
              required: 'Email cannot be empty!',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Must be a valid email!',
              },
            }}
          />
          <ValidTextInput
            label="Message"
            multiline
            numberOfLines={6}
            name="message"
            control={control}
            rules={{
              required: 'Message cannot be empty!',
              minLength: {
                value: 20,
                message: 'Tell us a little bit more!',
              },
            }}
          />
        </Card.Content>
        <Card.Actions>
          <Button icon="send" onPress={handleSubmit(onSubmit)}>
            Send Message
          </Button>
        </Card.Actions>
      </Card>
    </Screen>
  );
};
