import {Box, BoxProps, Center} from '@chakra-ui/react';
import {PropsWithChildren} from 'react';

type ContentCardProps = BoxProps & PropsWithChildren;

export const ContentCard = ({children, ...props}: ContentCardProps) => (
  <Center>
    <Box bg="fill-white" padding="10" margin="8px" borderRadius="xl" {...props}>
      {children}
    </Box>
  </Center>
);
