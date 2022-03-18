import React, { forwardRef } from 'react';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { useThemeColor } from '../../hooks';

export const Modal = forwardRef<Modalize, ModalizeProps>(
  ({ children, ...rest }, ref) => {
    const modalBg = useThemeColor({}, 'background');
    const handleBg = useThemeColor({}, 'tabIconDefault');

    return (
      <Modalize
        ref={ref}
        handlePosition="inside"
        modalTopOffset={200}
        alwaysOpen={50}
        modalStyle={{ backgroundColor: modalBg }}
        handleStyle={{ backgroundColor: handleBg }}
        {...rest}
      >
        {children}
      </Modalize>
    );
  },
);

// https://jeremybarbet.github.io/react-native-modalize/#/EXAMPLES
