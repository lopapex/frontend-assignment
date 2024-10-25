import {Input, Stack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import {Field} from '../../components/Field';
import {PasswordField} from '../../components/PasswordField';
import {LoginWrapper} from './components/LoginWrapper';
import {useLoginMutation} from '../../hooks/useUser';

type FormValues = {
  userName: string;
  password: string;
};

export const Login = () => {
  const {t} = useTranslation();

  const {
    mutate: loginUser,
    isError,
    isPending: isLoading,
  } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data: FormValues) => {
    loginUser({
      username: data.userName,
      password: data.password,
    });
  });

  return (
    <LoginWrapper type="login" isLoading={isLoading} onSubmit={onSubmit}>
      <Field label={t('login.username')} isInvalid={!!errors.userName}>
        <Input {...register('userName')} />
      </Field>

      <Stack gap="4px">
        <PasswordField label={t('login.password')} isInvalid={!!errors.password}>
          <Input placeholder={t('login.password.placeholder')} {...register('password')} />
        </PasswordField>

        {isError && <span style={{color: 'red'}}>{t('register.error')}</span>}
      </Stack>
    </LoginWrapper>
  );
};
