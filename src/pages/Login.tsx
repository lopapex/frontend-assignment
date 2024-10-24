import {Center, Input, Stack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import {Field} from '../components/ui/Field';
import {PasswordField} from '../components/ui/PasswordField';
import {LoginWrapper} from '../components/elements/LoginWrapper';
import {useLoginMutation} from '../hooks/useUser';

type FormValues = {
  userName: string;
  password: string;
};

export const Login = () => {
  const {t} = useTranslation();

  const {mutate: loginUser, isError} = useLoginMutation();

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
    <Center width="100wv">
      <LoginWrapper type="login" onSubmit={onSubmit}>
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
    </Center>
  );
};
