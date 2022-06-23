import {
  useController,
  useForm,
  Control,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { HelperText, TextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

type ControllerProps = {
  name: string;
  control: Control<FieldValues>;
  rules?: RegisterOptions;
  defaultValue?: string;
};

type ValidInputProps = ControllerProps & Omit<TextInputProps, 'theme'>;

export const ValidTextInput = ({
  name,
  control,
  rules,
  defaultValue = '',
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
      <HelperText type="error" visible={!!fieldState.error}>
        {fieldState.error?.message}
      </HelperText>
    </>
  );
};

// Todo: Refactor to facilitate passing of styles
