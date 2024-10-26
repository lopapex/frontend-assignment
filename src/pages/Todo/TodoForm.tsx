import {Button, Input, Spinner, Stack, Textarea, useTheme} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {SubPageHeader} from '../../components/SubPageHeader';
import {useForm} from 'react-hook-form';
import {Field} from '../../components/Field';
import {IconCheck} from '../../constants/assets';
import {useTodo, useTodoUpdate} from './hooks/useTodo';
import {CreateTodoPayload} from '../../types/todo';
import {useNavigate, useParams} from 'react-router-dom';
import {LoadingState} from './components/LoadingState';
import pathnames from '../../constants/pathnames';
import {useEffect} from 'react';

export const TodoForm = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const {id} = useParams();

  const isEditMode = id !== undefined;
  const i18nKey = isEditMode ? 'editTodo' : 'addTodo';

  const {data: todoItem, isLoading} = useTodo(id);

  const {mutate: updateTodo, isPending} = useTodoUpdate(id, t(`${i18nKey}.success`));

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<CreateTodoPayload>();

  useEffect(() => {
    if (todoItem) {
      reset({
        title: todoItem?.title || '',
        description: todoItem?.description || '',
      });
    }
  }, [todoItem]);

  const onSubmit = handleSubmit((data: CreateTodoPayload) => {
    updateTodo(data);
  });

  return (
    <Stack gap="10">
      <SubPageHeader title={isEditMode ? todoItem?.title || '' : t('addTodo.title')} />
      {isLoading ? (
        <LoadingState />
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <Stack gap="10">
            <Stack gap="16px">
              <Field label={t('addTodo.name')} errorMessage={errors.title?.message} isRequired>
                <Input {...register('title', {required: t('input.required')})} />
              </Field>

              <Field label={t('addTodo.description')}>
                <Textarea {...register('description')} />
              </Field>
            </Stack>
            <Stack
              direction={{base: 'column', md: 'row'}}
              justifyContent="space-between"
              alignItems="start"
            >
              <Button
                variant="secondary"
                width={{base: '100%', md: 'auto'}}
                onClick={() => navigate(pathnames.home)}
              >
                {t(`${i18nKey}.discard`)}
              </Button>
              <Button
                width={{base: '100%', md: 'auto'}}
                rightIcon={<IconCheck fill={theme.colors['fill-white']} />}
                type="submit"
              >
                {isPending ? <Spinner color="fill-white" /> : t(`${i18nKey}.save`)}
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
    </Stack>
  );
};
