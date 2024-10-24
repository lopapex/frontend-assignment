import {Box, Center, Heading, Stack, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {ContentCard} from '../components/ContentCard';

const API_DOCS_HREF = 'http://localhost:3001/api/docs';

export const Login = () => {
  const {t} = useTranslation();

  return (
    <Center width="100wv">
      <ContentCard maxWidth="560px">
        <Stack bg="inherit" gap="24px">
          <Text fontSize="heading.1" fontWeight="heading.1" color="text-primary" bg="inherit">
            {t('login.title')}
          </Text>
          <Text fontSize="base" fontWeight="base" color="text-secondary" bg="inherit">
            {t('login.description')}
          </Text>
        </Stack>
      </ContentCard>
    </Center>
  );
};
