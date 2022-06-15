import {
  ActionSheetOptions,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import React, { useContext, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { Button, List } from 'react-native-paper';

import { Modal } from '../../components';
import { SearchContext } from './context';
import { Result } from './Result';

export const ResultModal = () => {
  const { vendors } = useContext(SearchContext);

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
              {vendors?.length
                ? `${vendors.length} Results`
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
      {vendors?.map((vendor, i) => (
        <Result key={i} vendor={vendor} />
      ))}
    </Modal>
  );
};
