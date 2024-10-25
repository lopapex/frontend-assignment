import {FormControl, FormLabel} from '@chakra-ui/react';
import {ReactElement} from 'react';

type FieldProps = {
  label: string;
  isInvalid?: boolean;
  children: ReactElement;
};

export const Field = ({children, label, isInvalid}: FieldProps) => (
  <FormControl isInvalid={isInvalid} isRequired>
    <FormLabel>{label}</FormLabel>
    {children}
  </FormControl>
);
