import {FormControl, FormErrorMessage, FormLabel} from '@chakra-ui/react';
import {ReactElement} from 'react';
import { useTranslation } from 'react-i18next';

type FieldProps = {
  label: string;
  errorMessage?: string;
  children: ReactElement;
  isRequired?: boolean;
};

export const Field = ({children, label, errorMessage, isRequired}: FieldProps) => {
  const {t} = useTranslation();

  return (
    <FormControl isInvalid={!!errorMessage} isRequired={isRequired}>
      <FormLabel fontSize="sm" fill="text-secondary">{`${label} ${
        !isRequired ? `(${t('input.optional')})` : ''
      }`}</FormLabel>
      {children}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
