import { useEffect } from 'react';
import {
  KeyboardEvent,
  KeyboardEventListener,
  Platform,
  Keyboard,
} from 'react-native';

export interface UseKeyboardChangeProps {
  onOpen?: (e: KeyboardEvent) => any;
  onClose?: (e: KeyboardEvent) => any;
}

// https://github.com/callstack/react-native-paper/issues/2172#issuecomment-1064976666
export const useKeyboardChange = ({
  onOpen,
  onClose,
}: UseKeyboardChangeProps) => {
  useEffect(() => {
    const onKeyboardChange: KeyboardEventListener = (e) => {
      e.endCoordinates.screenY <= (e.startCoordinates?.screenY ?? 0)
        ? onOpen?.(e)
        : onClose?.(e);
    };

    if (Platform.OS === 'ios') {
      const subscription = Keyboard.addListener(
        'keyboardWillChangeFrame',
        onKeyboardChange,
      );
      return () => subscription.remove();
    }

    const subscriptions = [
      Keyboard.addListener('keyboardDidHide', onKeyboardChange),
      Keyboard.addListener('keyboardDidShow', onKeyboardChange),
    ];
    return () =>
      subscriptions.forEach((subscription) => subscription.remove());
  }, []);
};
