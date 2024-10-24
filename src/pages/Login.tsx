import {Center, Input} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import {Field} from '../components/ui/Field';
import {PasswordField} from '../components/ui/PasswordField';
import {LoginWrapper} from '../components/elements/LoginWrapper';

type FormValues = {
  userName: string;
  password: string;
};

export const Login = () => {
  const {t} = useTranslation();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data: any) => console.log(data));

  return (
    <Center width="100wv">
      <LoginWrapper type="login" onSubmit={onSubmit}>
        <Field label={t('login.username')} isInvalid={!!errors.userName}>
          <Input {...register('userName')} />
        </Field>

        <PasswordField label={t('login.password')} isInvalid={!!errors.password}>
          <Input placeholder={t('login.password.placeholder')} {...register('password')} />
        </PasswordField>
      </LoginWrapper>
    </Center>
  );
};
