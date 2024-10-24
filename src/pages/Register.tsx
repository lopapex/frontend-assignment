import { Center, Input } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Field } from '../components/ui/Field';
import { PasswordField } from '../components/ui/PasswordField';
import { LoginWrapper } from '../components/elements/LoginWrapper';

type FormValues = {
  userName: string;
  password: string;
  passwordConfirm: string;
};

export const Register = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const password = watch('password');

  const onSubmit = handleSubmit((data: any) => console.log(data));

  return (
    <Center width="100wv">
      <LoginWrapper type="register" onSubmit={onSubmit}>
        <Field label={t('register.username')} isInvalid={!!errors.userName}>
          <Input {...register('userName', { required: true })} />
        </Field>

        <PasswordField label={t('register.password')} isInvalid={!!errors.password}>
          <Input
            placeholder={t('register.password.placeholder')}
            {...register('password', { required: true })}
          />
        </PasswordField>

        <PasswordField label={t('register.password.confirm')} isInvalid={!!errors.passwordConfirm}>
          <Input
            placeholder={t('register.password.confirm.placeholder')}
            {...register('passwordConfirm', {
              required: true,
              validate: value => value === password || t('register.password.error')
            })}
          />
        </PasswordField>

        {errors.passwordConfirm && (
          <span style={{ color: 'red' }}>
            {errors.passwordConfirm.message}
          </span>
        )}
      </LoginWrapper>
    </Center>
  );
};
