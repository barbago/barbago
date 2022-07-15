import React from 'react';
import { Button, Card } from 'react-native-paper';
import { useForm, FieldValues } from 'react-hook-form';
import {
  AvatarPicker,
  Screen,
  ValidTextInput,
} from '../../../components';
import { useAuth } from '../../../providers';
import { SettingsStackScreenProps } from '../../../navigation';

export const AccountInfoPage = ({
  navigation,
}: SettingsStackScreenProps<'Account'>) => {
  const { user } = useAuth();
  const { control, formState, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    alert('SUCCESS, ' + JSON.stringify(data));
  };

  return (
    <Screen scrolling>
      <Card>
        <Card.Title
          title="Public Information"
          subtitle="This data is visible to others in the app"
        />
        <Card.Content>
          <ValidTextInput
            label="Full Name"
            name="fullName"
            control={control}
            defaultValue={user?.displayName ?? ''}
            autoCompleteType="name"
            rules={{
              required: 'Name must not be empty!',
              minLength: {
                value: 5,
                message: 'Name should be at least 5 characters',
              },
            }}
          />
          <AvatarPicker />
          {/* Todo: Find a way to connect this to form */}
        </Card.Content>

        <Card.Title
          title="Private Information"
          subtitle="This data is visible only to you"
        />
        <Card.Content>
          <ValidTextInput
            label="Email Address"
            autoCompleteType="email"
            disabled={!!user?.email}
            defaultValue={user?.email ?? ''}
            name="email"
            control={control}
          />
          <ValidTextInput
            label="Phone Number"
            autoCompleteType="tel"
            defaultValue={user?.phoneNumber ?? ''}
            name="phone"
            control={control}
            rules={{
              pattern: {
                message: 'Phone number must have valid format!',
                value:
                  /^(?=[a-zA-Z!@#$%^&+=\d]+$)(?:(?=\D*\d)(?=(?:\d*\D){8,14})|(?=(?:\D*\d){8,14})(?=\d*\D))/,
              },
            }}
          />
        </Card.Content>

        <Card.Actions>
          <Button
            mode="contained"
            disabled={!formState.isDirty}
            onPress={handleSubmit(onSubmit)}
          >
            Update Information
          </Button>
        </Card.Actions>
      </Card>
    </Screen>
  );
};
