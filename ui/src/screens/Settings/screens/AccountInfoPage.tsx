import React, { useEffect } from 'react';
import { Button, Card, Text } from 'react-native-paper';
import { useForm, FieldValues } from 'react-hook-form';
import {
  AvatarPicker,
  Screen,
  ValidTextInput,
} from '../../../components';
import {
  SettingsRoutes,
  SettingsStackScreenProps,
} from '../../../navigation';
import { userApi } from '../../../store';
import { useToast } from '../../../providers';

// you can change firebase auth user profile information
// https://firebase.google.com/docs/auth/web/manage-users
export const AccountInfoPage = ({
  navigation,
}: SettingsStackScreenProps<SettingsRoutes.Account>) => {
  const { data: user, isLoading: userLoading } =
    userApi.useGetUserQuery();
  const [updateUser, { isLoading }] = userApi.useUpdateUserMutation();
  const { control, formState, handleSubmit, reset } = useForm();
  const { open: openToast } = useToast();

  const onSubmit = (data: FieldValues) => {
    updateUser(data)
      .unwrap()
      .then(() => {
        openToast('Successfully updated profile!');
        reset({}, { keepValues: true });
      })
      .catch((err) =>
        openToast(
          err?.data?.message ??
            'Failed to update information, please try again',
        ),
      );
  };

  if (userLoading) return <Text>Loading Account Data...</Text>;

  return (
    <Screen scrolling needsAuth useToast>
      <Card>
        <Card.Title
          title="Public Information"
          subtitle="This data is visible to others in the app"
        />
        <AvatarPicker
          name="photo"
          control={control}
          defaultValue={user?.photo}
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
                value: 4,
                message: 'Name should be at least 4 characters',
              },
            }}
          />
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
            disabled={!formState.isDirty || isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? 'Saving Changes...' : 'Update Information'}
          </Button>
        </Card.Actions>
      </Card>
    </Screen>
  );
};
