import {
  ActionSheetOptions,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import React, { useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { Button, List } from 'react-native-paper';
import { Modal } from '../../components';
import { BarberResult } from '../../types';
import { Result } from './Result';

interface ResultModalProps {
  barbers: BarberResult[];
}

export const ResultModal = ({ barbers }: ResultModalProps) => {
  const modalizeRef = useRef<Modalize>(null);

  const { showActionSheetWithOptions } = useActionSheet();

  const sortOptions = ['Distance', 'Ratings', 'Price', 'Cancel'];

  const options: ActionSheetOptions = {
    options: sortOptions,
    title: 'What do you want to sort results by?',
    useModal: true,
    cancelButtonIndex: sortOptions.length - 1,
  };

  const actionSheetCallback = (index?: number) => {
    index !== undefined && alert('clicked ' + options.options[index]);
  };

  return (
    <Modal
      ref={modalizeRef}
      HeaderComponent={
        <List.Item
          title=""
          left={() => (
            <Button mode="text" compact disabled>
              {barbers?.length
                ? `${barbers.length} Results`
                : `No Results`}
            </Button>
          )}
          right={() => (
            <Button
              icon="swap-vertical"
              mode="text"
              compact
              onPress={() =>
                showActionSheetWithOptions(
                  options,
                  actionSheetCallback,
                )
              }
            >
              Sort
            </Button>
          )}
        />
      }
    >
      {barbers?.map((barber, i) => (
        <Result key={i} barber={barber} />
      ))}
    </Modal>
  );
};
