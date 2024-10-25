import {Button, Text, Stack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useTodoList} from './hooks/useTodo';
import {useMemo} from 'react';
import {ContentCard} from '../../components/ContentCard';
import {CONTENT_MAX_WIDTH} from '../../constants/sizes';
import {IconAdd} from '../../constants/assets';
import {useUser} from '../../hooks/useUser';
import {formatDate} from '../../utils/dateHelpers';
import {EmptyState} from './components/EmptyState';
import {LoadingState} from './components/LoadingState';
import {TodoList} from './components/todoList/TodoList';

export const Home = () => {
  const {t} = useTranslation();
  const {data, isLoading} = useTodoList();

  const {getUser} = useUser();
  const user = getUser();

  const completedTodos = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.todos.filter((todo) => todo.completed);
  }, [data]);

  const incompleteTodos = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.todos.filter((todo) => !todo.completed);
  }, [data]);

  return (
    <ContentCard maxWidth={CONTENT_MAX_WIDTH} width="100%">
      <Stack gap="10">
        <Stack
          direction={{base: 'column', md: 'row'}}
          justifyContent="space-between"
          alignItems="start"
        >
          <Stack gap="8px">
            <Text fontSize="heading.1" fontWeight="heading.1" color="text-primary">
              {t(`home.intro`, {username: user?.username})}
            </Text>
            <Text fontSize="base" fontWeight="base" color="text-tertiary">
              {formatDate(new Date())}
            </Text>
          </Stack>
          <Button rightIcon={<IconAdd fill="white" />} type="submit">
            {t(`home.add`)}
          </Button>
        </Stack>

        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            <Stack gap="10">
              {incompleteTodos.length > 0 ? (
                <TodoList title={t(`home.incomplete.title`)} todoList={incompleteTodos} />
              ) : (
                <EmptyState />
              )}
              {!!completedTodos.length && (
                <TodoList title={t(`home.complete.title`)} todoList={completedTodos} />
              )}
            </Stack>
          </>
        )}
      </Stack>
    </ContentCard>
  );
};