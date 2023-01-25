import React, { useState } from 'react';
import { Alert, Keyboard, Platform, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { CustomDialog } from '../../../../components';
import { useToast } from '../../../../providers';
import { reviewApi } from '../../../../store';
import { useVendor } from '../../context';
import { Stars } from './Stars';

export interface WriteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const WriteDialog = ({ open, setOpen }: WriteDialogProps) => {
  const [createReview, { isLoading }] =
    reviewApi.useCreateReviewMutation();
  const { vendor } = useVendor();
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const { open: openToast } = useToast();

  const confirmClose = () => {
    !(text || rating)
      ? closeModal()
      : Platform.OS === 'web'
      ? confirm(
          'Your review is not saved. Are you sure you want to leave?',
        ) && closeModal()
      : Alert.alert(
          'Cancel Review',
          'Are you sure you want to cancel your review? Edits will not be saved',
          [
            { text: 'Keep Editing', style: 'cancel' },
            {
              text: 'Cancel',
              onPress: closeModal,
              style: 'destructive',
            },
          ],
        );
  };

  const closeModal = () => {
    setText('');
    setRating(0);
    setOpen(false);
  };

  const handleSubmit = () => {
    rating
      ? createReview({ vendorId: vendor!.uid, rating, text })
          .unwrap()
          .then((res) => openToast('Submitted review!'))
          .catch((err) =>
            openToast(err.data.message ?? 'Failed to submit review'),
          )
          .finally(closeModal)
      : alert
      ? alert('Please select a rating')
      : Alert.alert('Please select a rating');
  };

  return (
    <CustomDialog
      open={open}
      onDismiss={closeModal}
      title={`Write a review for ${vendor?.name ?? 'this barber'}!`}
      content={
        <>
          <Stars
            rating={rating}
            setRating={setRating}
            style={styles.stars}
            starStyle={styles.starStyle}
            disabled={isLoading}
          />
          <TextInput
            placeholder="This shop gives the best cuts"
            numberOfLines={7}
            style={styles.input}
            value={text}
            onChange={(e) => setText(e.nativeEvent.text)}
            multiline={true}
            blurOnSubmit={true}
            onSubmitEditing={() => Keyboard.dismiss()}
            disabled={isLoading}
          />
        </>
      }
      contentStyle={styles.content}
      actions={
        <>
          <Button onPress={confirmClose} style={styles.cancel}>
            Cancel
          </Button>
          <Button
            onPress={handleSubmit}
            mode="contained"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Review!'}
          </Button>
        </>
      }
      actionsStyle={styles.actions}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  stars: {
    marginTop: -16,
    marginHorizontal: 'auto',
  },
  starStyle: {
    fontSize: 60,
    lineHeight: 70,
  },
  input: {
    maxHeight: 150,
  },
  actions: {
    marginTop: -16,
  },
  cancel: {
    marginRight: 8,
  },
});
