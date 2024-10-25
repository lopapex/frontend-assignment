import {Button, Flex, Text, Stack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useTodoList} from '../hooks/useTodo';
import {useEffect} from 'react';
import {ContentCard} from '../components/ui/ContentCard';
import {CONTENT_MAX_WIDTH} from '../constants/sizes';
import {IconAdd} from '../constants/assets';
import { useUser } from '../hooks/useUser';
import { formatDate } from '../components/utils/dateHelpers';

export const Home = () => {
  const {t} = useTranslation();
  const {data} = useTodoList();

  const {getUser} = useUser();
  const user = getUser();


  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <ContentCard maxWidth={CONTENT_MAX_WIDTH} width="100%">
      <Flex justifyContent="space-between" alignItems="start" bg="fill-primary">
        <Stack gap="8px">
          <Text fontSize="heading.1" fontWeight="heading.1" color="text-primary">
            {t(`home.intro`, { username: user?.username })}
          </Text>
          <Text fontSize="base" fontWeight="base" color="text-tertiary">
            {formatDate(new Date())}
          </Text>
        </Stack>
        <Button rightIcon={<IconAdd fill="white" />} type="submit">
          {t(`home.add`)}
        </Button>
      </Flex>
    </ContentCard>
  );
};
