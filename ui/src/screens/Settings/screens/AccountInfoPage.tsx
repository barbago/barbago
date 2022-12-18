import React from 'react';
import { Button, Card, Text } from 'react-native-paper';
import { useForm, FieldValues } from 'react-hook-form';
import {
  AvatarPicker,
  Screen,
  ValidTextInput,
} from '../../../components';
import { SettingsStackScreenProps } from '../../../navigation';
import { userApi } from '../../../store';

// you can change firebase auth user profile information
// https://firebase.google.com/docs/auth/web/manage-users
export const AccountInfoPage = ({
  navigation,
}: SettingsStackScreenProps<'Account'>) => {
  const { data: user, isLoading } = userApi.useGetUserQuery();
  const [updateUser, { isLoading: isUpdateLoading }] =
    userApi.useUpdateUserMutation();
  const { control, formState, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    updateUser(data);
  };

  if (isLoading) return <Text>Loading Account Data...</Text>;

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
            name="name"
            control={control}
            defaultValue={user?.name ?? ''}
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
            disabled={!!user?.email}
            defaultValue={user?.email ?? ''}
            name="email"
            control={control}
          />
          <ValidTextInput
            label="Phone Number"
            defaultValue={user?.phone ?? ''}
            name="phone"
            control={control}
            rules={{
              pattern: {
                message: 'Phone number must have valid format!',
                value:
                  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
              },
            }}
          />
        </Card.Content>

        <Card.Actions>
          <Button
            mode="contained"
            disabled={!formState.isDirty || isUpdateLoading}
            onPress={handleSubmit(onSubmit)}
          >
            {isUpdateLoading
              ? 'Saving Changes...'
              : 'Update Information'}
          </Button>
        </Card.Actions>
      </Card>
    </Screen>
  );
};
