import {
  ActionSheetOptions,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import React, { useContext, useEffect, useRef } from 'react';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { ScrollView } from 'react-native';
import { Button, List } from 'react-native-paper';

import { Modal } from '../../../components';
import { SearchContext } from '../services';
import { Result } from './Result';

const resultHeight = 267;
const headerHeight = 50;

export const ResultModal = () => {
  const { vendors, selected, setSort } = useContext(SearchContext);

  const modalizeRef = useRef<Modalize>(null);
  const contentRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (selected) {
      const selectedIndex =
        vendors?.findIndex((vendor) => vendor.uid === selected.uid) ??
        0;
      const pos = selectedIndex * resultHeight;
      contentRef.current?.scrollTo({ y: pos });
    } else {
      modalizeRef.current?.close('alwaysOpen');
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
          {vendors?.length ? `${vendors.length} Results` : `No Results`}
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

  const selectedProps: ModalizeProps = !!selected
    ? {
        withOverlay: false,
        alwaysOpen: headerHeight + resultHeight,
        modalHeight: headerHeight + resultHeight,
      }
    : {};

  return (
    <Modal
      ref={modalizeRef}
      contentRef={contentRef}
      HeaderComponent={HeaderComponent}
      {...selectedProps}
    >
      {vendors?.map((vendor, i) => (
        <Result key={i} vendor={vendor} />
      ))}
    </Modal>
  );
};
