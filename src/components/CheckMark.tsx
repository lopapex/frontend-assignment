import React from 'react';
import {Checkbox, useTheme} from '@chakra-ui/react';
import {IconCheck} from '../constants/assets';

type CheckMarkProps = {
  isChecked: boolean;
  onChange: (newStatus: boolean) => void;
};

export const CheckMark = ({isChecked, onChange}: CheckMarkProps) => {
  const theme = useTheme();

  return (
    <Checkbox
      isChecked={isChecked}
      onChange={e => onChange(e.target.checked)}
      icon={isChecked ? <IconCheck fill="white" width="20px" height="20px" /> : undefined}
      sx={{
        '& .chakra-checkbox__control': {
          width: '32px',
          height: '32px',
          borderRadius: 'full',
          border: `2px solid ${theme.colors['border-gray']}`,
          _checked: {
            bg: theme.colors['fill-brand'],
            borderColor: theme.colors['border-brand'],
          },
          _hover: {
            opacity: 0.8,
          },
        },
      }}
    />
  );
};
