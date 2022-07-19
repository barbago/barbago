import React, { useState } from 'react';
import { Alert, Keyboard, Platform, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';

import { useKeyboardChange } from '../../../../hooks';
import { useToast } from '../../../../providers';
import { useReview, useVendor } from '../../context';
import { Stars } from './Stars';

export interface WriteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const WriteDialog = ({ open, setOpen }: WriteDialogProps) => {
  const { vendor, vendorLink: vendorUid } = useVendor();
  const { createReview } = useReview();
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [bottom, setBottom] = useState(0);
  const { open: openToast } = useToast();

  useKeyboardChange({
    onOpen: (e) => setBottom(e.endCoordinates.height / 2),
    onClose: () => setBottom(0),
  });

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
      ? createReview({ uid: vendorUid, rating, review: text })
          .unwrap()
          .then((res) => openToast('Submitted review!'))
          .catch((err) => openToast('Failed to submit review'))
          .finally(closeModal)
      : alert
      ? alert('Please select a rating')
      : Alert.alert('Please select a rating');
  };

  return (
    <Portal>
      <Dialog
        visible={open}
        dismissable={false}
        style={{ bottom }}
        onDismiss={closeModal}
      >
        <Dialog.Title>
          Write a review for {vendor?.name ?? 'this barber'}!
        </Dialog.Title>
        <Dialog.Content style={styles.content}>
          <Stars
            rating={rating}
            setRating={setRating}
            style={styles.stars}
            starStyle={styles.starStyle}
          />
          <TextInput
            autoComplete="none"
            placeholder="This shop gives the best cuts"
            numberOfLines={7}
            style={styles.input}
            value={text}
            onChange={(e) => setText(e.nativeEvent.text)}
            multiline={true}
            blurOnSubmit={true}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button onPress={confirmClose} style={styles.cancel}>
            Cancel
          </Button>
          <Button onPress={handleSubmit} mode="contained">
            Create Review
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
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
    marginVertical: 16,
    maxHeight: 150,
  },
  actions: {
    marginTop: -16,
  },
  cancel: {
    marginRight: 8,
  },
});
