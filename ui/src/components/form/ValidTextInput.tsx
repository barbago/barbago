import { useController, UseControllerProps } from 'react-hook-form';
import {
  HelperText,
  TextInput,
  TextInputProps,
} from 'react-native-paper';

type ValidInputProps = {
  helperText?: string;
} & UseControllerProps &
  Omit<TextInputProps, 'theme'>;

export const ValidTextInput = ({
  name,
  control,
  rules,
  defaultValue = '',
  helperText = '',
  ...inputProps
}: ValidInputProps) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        {...inputProps}
      />
      <HelperText type={fieldState.error ? 'error' : 'info'}>
        {fieldState.error?.message || helperText || ' '}
      </HelperText>
    </>
  );
};

// Todo: Refactor to facilitate passing of styles
