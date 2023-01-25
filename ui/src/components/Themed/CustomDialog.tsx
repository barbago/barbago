import React, { ReactNode, useState } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import {
  Portal,
  Dialog,
  DialogIconProps,
} from 'react-native-paper';
import { useKeyboardChange } from '../../hooks';

export type CustomDialogProps = {
  open: boolean;
  onDismiss?: () => void;
  dismissable?: boolean;
  actions?: ReactNode;
  actionsStyle?: ViewStyle;
  content?: ReactNode;
  contentStyle?: ViewStyle;
  dialogStyle?: ViewStyle;
  iconProps?: DialogIconProps;
  scrolling?: boolean;
  title?: string;
  titleStyle?: TextStyle;
};

export const CustomDialog = ({
  open,
  onDismiss,
  dismissable = false,
  actions,
  actionsStyle,
  content,
  contentStyle,
  dialogStyle,
  iconProps,
  scrolling,
  title,
  titleStyle,
}: CustomDialogProps) => {
  // move the dialog out of the way of the keyboard if open
  const [bottom, setBottom] = useState(0);
  useKeyboardChange({
    onOpen: (e) => setBottom(e.endCoordinates.height / 2),
    onClose: () => setBottom(0),
  });

  return (
    <Portal>
      <Dialog visible={open} dismissable={dismissable} onDismiss={onDismiss} style={[{ bottom }, dialogStyle]}>
        {!!iconProps ? <Dialog.Icon {...iconProps} /> : null}
        {!!title ? (
          <Dialog.Title style={[styles.title, titleStyle]}>
            {title}
          </Dialog.Title>
        ) : null}
        {!!content ? (
          scrolling ? (
            <Dialog.ScrollArea style={[styles.content, contentStyle]}>
              {content}
            </Dialog.ScrollArea>
          ) : (
            <Dialog.Content style={[styles.content, contentStyle]}>
              {content}
            </Dialog.Content>
          )
        ) : null}
        {!!actions ? (
          <Dialog.Actions style={[styles.actions, actionsStyle]}>
            {actions}
          </Dialog.Actions>
        ) : null}
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {},
  content: {},
  actions: {},
});
