import {Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {Logo} from '../../../constants/assets';
import {OpacityTransitionWrapper} from '../../../components/OpacityTransitionWrapper';

export const EmptyState = () => {
  const {t} = useTranslation();

  return (
    <OpacityTransitionWrapper>
      <VStack gap="8px">
        <Logo width="130px" height="130px" />

        <Text fontSize="heading.2" fontWeight="heading.2" color="text-primary">
          {t(`home.empty.title`)}
        </Text>
        <Text fontSize="base" fontWeight="base" color="text-secondary">
          {t(`home.empty.description`)}
        </Text>
      </VStack>
    </OpacityTransitionWrapper>
  );
};
