import {
  ComponentProps,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Button, Snackbar, SnackbarProps } from 'react-native-paper';

import { useThemeColor } from '../hooks';

export interface ToastState {
  open: (config: string | ToastSettings) => void;
  isOpen: boolean;
  close: () => void;
  settings: ToastSettings;
}

export interface ToastSettings {
  message?: string;
  duration?: number;
  action?: Omit<ComponentProps<typeof Button>, 'children'> & {
    label: string;
  };
}

export const ToastContext = createContext<ToastState>(undefined!);

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [settings, setSettings] = useState<ToastSettings>({});

  const close = () => {
    setOpen(false);
  };

  const open = (config: string | ToastSettings) => {
    const settings =
      typeof config === 'string' ? { message: config } : config;
    setSettings(settings);
    setOpen(true);
  };

  const value: ToastState = {
    isOpen,
    open,
    close,
    settings,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const toastContext = useContext(ToastContext);
  if (!toastContext)
    throw Error('Cannot use ToastContext outside its provider');
  return toastContext;
};

export const Toast = (props?: Partial<SnackbarProps>) => {
  const { isOpen, close, settings } = useToast();

  useEffect(() => {
    return () => close();
  }, [])

  return (
    <Snackbar
      visible={isOpen}
      onDismiss={close}
      duration={settings?.duration}
      action={settings?.action}
      theme={{
        colors: { accent: useThemeColor({}, 'tint') },
      }}
      {...props}
    >
      {settings?.message ?? ''}
    </Snackbar>
  );
};
