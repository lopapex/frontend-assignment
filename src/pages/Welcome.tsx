import {Center, Link, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import { useTodoList } from '../hooks/useTodo';
import { useEffect } from 'react';

const API_DOCS_HREF = 'http://localhost:3001/api/docs';

export const Welcome = () => {
  const {t} = useTranslation();
  const { data } = useTodoList();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Center height="100vh" width="100wv" padding="10">
      <VStack gap="10px">
        <Text fontSize="2xl" color="blue.900">
          {t('welcome.message')}
        </Text>
        <Link color="blue.400" href={API_DOCS_HREF} target="_blank">
          {t('welcome.link')}
        </Link>
      </VStack>
    </Center>
  );
};
