import {InputGroup, InputRightElement} from '@chakra-ui/react';
import {cloneElement, ReactElement, useState} from 'react';
import {IconHide, IconShow} from '../constants/icons';
import { Field } from './Field';

type PasswordFieldProps = {
  label: string;
  isInvalid?: boolean;
  children: ReactElement;
};

export const PasswordField = ({children, label, isInvalid}: PasswordFieldProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const Icon = show ? IconHide : IconShow;

  return (
    <InputGroup>
      <Field label={label} isInvalid={isInvalid}>
        {cloneElement(children, {type: show ? 'text' : 'password'})}
      </Field>
      <InputRightElement
        top="36px"
        right="12px"
        height="16px"
        width="16px"
        _hover={{cursor: 'pointer', opacity: '0.6'}}
      >
        <Icon fill="text-primary" onClick={handleClick} />
      </InputRightElement>
    </InputGroup>
  );
};
