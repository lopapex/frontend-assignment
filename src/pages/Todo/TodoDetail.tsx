import {Button, Stack, Text, useTheme} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {SubPageHeader} from '../../components/SubPageHeader';
import {useTodo, useTodoDelete, useTodoStatus} from './hooks/useTodo';
import {useNavigate, useParams} from 'react-router-dom';
import {LoadingState} from './components/LoadingState';
import {formatDate} from '../../utils/dateHelpers';
import {IconCheck, IconDelete, IconEdit} from '../../constants/assets';
import pathnames from '../../constants/pathnames';

export const TodoDetail = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {id} = useParams();
  const navigate = useNavigate();

  const {data: todoItem, isLoading} = useTodo(id);
  const {mutate: updateStatus} = useTodoStatus(() => navigate(-1));
  const {mutate: deleteTodo} = useTodoDelete(t('deleteTodo.success'), () => navigate(-1));

  return (
    <Stack gap="10">
      <SubPageHeader title={todoItem?.title || ''} />
      {isLoading ? (
        <LoadingState />
      ) : (
        <Stack gap="8px">
          <Stack gap="8px">
            <Text fontSize="base" fontWeight="base" color="text-tertiary">
              {formatDate(new Date(todoItem?.createdAt || ''))}
            </Text>
            <Text fontSize="base" fontWeight="base" color="text-tertiary">
              {todoItem?.completed ? t('detail.complete') : t('detail.incomplete')}
            </Text>
            <Text fontSize="base" fontWeight="heading.1" color="text-primary">
              {todoItem?.description}
            </Text>
          </Stack>

          <Stack gap="4px" direction={{base: 'column', md: 'row'}} justifyContent="flex-end">
            <Button
              width={{base: '100%', md: 'auto'}}
              variant="tertiary"
              rightIcon={<IconEdit fill={theme.colors['fill-primary']} />}
              onClick={() => navigate(`${pathnames.todoForm}/${todoItem?.id}`)}
            >
              {t('app.edit')}
            </Button>

            <Button
              width={{base: '100%', md: 'auto'}}
              variant="tertiary"
              color="text-danger"
              rightIcon={<IconDelete fill={theme.colors['text-danger']} />}
              onClick={() => deleteTodo(todoItem?.id || '')}
            >
              {t('app.delete')}
            </Button>

            <Button
              width={{base: '100%', md: 'auto'}}
              variant={todoItem?.completed ? 'secondary' : 'primary'}
              rightIcon={
                todoItem?.completed ? undefined : <IconCheck fill={theme.colors['fill-white']} />
              }
              onClick={() => {
                updateStatus({id: todoItem?.id || '', completed: !todoItem?.completed});
              }}
            >
              {todoItem?.completed ? t('app.incomplete') : t('app.complete')}
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
