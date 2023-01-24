import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, Card } from 'react-native-paper';

import {
  AvatarPicker,
  Screen,
  ValidTextInput,
} from '../../../components';
import { RootRoutes, RootStackScreenProps } from '../../../navigation';
import { useAuth, useToast, Toast } from '../../../providers';
import { userApi } from '../../../store';

export const SignupScreen = ({
  navigation,
  route,
}: RootStackScreenProps<RootRoutes.Signup>) => {
  const { user } = useAuth();
  const { control, handleSubmit } = useForm();
  const [updateUser, { isLoading }] = userApi.useUpdateUserMutation();
  const { open: openToast } = useToast();

  const onSubmit = (data: FieldValues) => {
    updateUser(data)
      .unwrap()
      .then((_res) => navigation.pop())
      .catch((err) =>
        openToast(
          err?.data?.message ?? 'Failed to sign up, please try again',
        ),
      );
  };

  return (
    <Screen scrolling needsAuth useToast>
      <Card>
        <Card.Title
          title="Public Information"
          subtitle="This data is visible to other users in the app"
        />
        <AvatarPicker
          name="photo"
          control={control}
          defaultValue={user?.photoURL}
        />
        <Card.Content>
          <ValidTextInput
            label="Full Name"
            name="name"
            control={control}
            defaultValue={user?.displayName ?? ''}
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
          subtitle="This data is not shown to other users"
        />
        <Card.Content>
          <ValidTextInput
            label="Email Address"
            name="email"
            control={control}
            disabled={!!user?.email}
            defaultValue={user?.email ?? ''}
          />
          <ValidTextInput
            label="Phone Number"
            name="phone"
            control={control}
            defaultValue={user?.phoneNumber ?? ''}
            rules={{
              pattern: {
                message: 'Phone number must have valid format!',
                value:
                  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
              },
            }}
          />
        </Card.Content>
        <Card.Actions style={{ padding: 16, paddingTop: 8 }}>
          <Button
            mode="contained"
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? 'Submitting...' : 'Finish Signup!'}
          </Button>
        </Card.Actions>
      </Card>
    </Screen>
  );
};
