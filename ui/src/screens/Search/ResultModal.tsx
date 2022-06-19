import {
  ActionSheetOptions,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import React, { useContext, useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { ScrollView } from 'react-native';
import { Button, List } from 'react-native-paper';

import { Modal } from '../../components';
import { SearchContext } from './SearchPage';
import { Result } from './Result';

export const ResultModal = () => {
  const { vendors, selected, setSort } = useContext(SearchContext);

  const modalizeRef = useRef<Modalize>(null);
  const contentRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (selected) {
      const selectedIndex =
        vendors?.findIndex((vendor) => vendor.uid === selected.uid) ??
        0;
      const pos = selectedIndex * 267;
      contentRef.current?.scrollTo({ y: pos });
    }
  }, [selected]);

  const { showActionSheetWithOptions } = useActionSheet();

  const sortOptions = ['Distance', 'Ratings', 'Price', 'Cancel'];

  const options: ActionSheetOptions = {
    options: sortOptions,
    title: 'What do you want to sort results by?',
    useModal: true,
    cancelButtonIndex: sortOptions.length - 1,
  };

  const actionSheetCallback = (index: number = 3) => {
    index < 3 ? setSort(sortOptions?.[index ?? 3]) : setSort();
  };

  const HeaderComponent = (
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
            showActionSheetWithOptions(options, actionSheetCallback)
          }
        >
          Sort
        </Button>
      )}
    />
  );

  if (selected)
    return (
      <Modal
        ref={modalizeRef}
        HeaderComponent={HeaderComponent}
        alwaysOpen={317}
        withOverlay={false}
        modalHeight={317}
      >
        {vendors?.map((vendor, i) => (
          <Result key={i} vendor={vendor} />
        ))}
      </Modal>
    );

  return (
    <Modal
      ref={modalizeRef}
      contentRef={contentRef}
      HeaderComponent={HeaderComponent}
    >
      {vendors?.map((vendor, i) => (
        <Result key={i} vendor={vendor} />
      ))}
    </Modal>
  );
};
