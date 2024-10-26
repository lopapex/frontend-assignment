import {Text, IconButton, HStack} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {IconBackwards} from '../constants/assets';

type SubPageHeaderProps = {
  title: string;
};

export const SubPageHeader = ({title}: SubPageHeaderProps) => {
  const navigate = useNavigate();
  return (
    <HStack alignItems="center" gap="16px">
      <IconButton
        icon={<IconBackwards fill="fill-primary" />}
        bg="fill-gray"
        aria-label="back"
        onClick={() => navigate(-1)}
      />
      <Text fontSize="heading.1" fontWeight="heading.1" color="text-primary">
        {title}
      </Text>
    </HStack>
  );
};
