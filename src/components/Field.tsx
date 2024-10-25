import {FormControl, FormErrorMessage, FormLabel} from '@chakra-ui/react';
import {ReactElement} from 'react';

type FieldProps = {
  label: string;
  errorMessage?: string;
  children: ReactElement;
};

export const Field = ({children, label, errorMessage}: FieldProps) => (
  <FormControl isInvalid={!!errorMessage} isRequired>
    <FormLabel>{label}</FormLabel>
    {children}
    {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
  </FormControl>
);
