import {Input, Stack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import {Field} from '../../components/Field';
import {PasswordField} from '../../components/PasswordField';
import {LoginWrapper} from './components/LoginWrapper';
import {useRegisterMutation} from '../../hooks/useUser';

type FormValues = {
  userName: string;
  password: string;
  passwordConfirm: string;
};

export const Register = () => {
  const {t} = useTranslation();

  const {mutate: registerUser, isError, isPending: isLoading} = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<FormValues>();

  const password = watch('password');

  const onSubmit = handleSubmit((data: FormValues) => {
    registerUser({
      username: data.userName,
      password: data.password,
    });
  });

  return (
    <LoginWrapper type="register" isLoading={isLoading} onSubmit={onSubmit}>
      <Field label={t('register.username')} errorMessage={errors.userName?.message}>
        <Input {...register('userName', {required: t('input.required')})} />
      </Field>

      <PasswordField label={t('register.password')} errorMessage={errors.password?.message}>
        <Input
          placeholder={t('register.password.placeholder')}
          {...register('password', {required: t('input.required')})}
        />
      </PasswordField>

      <Stack gap="4px">
        <PasswordField
          label={t('register.password.confirm')}
          errorMessage={(() => {
            if (errors.passwordConfirm) {
              return errors.passwordConfirm?.message;
            }
            if (isError) {
              return t('register.password.error');
            }
            return undefined;
          })()}
        >
          <Input
            placeholder={t('register.password.confirm.placeholder')}
            {...register('passwordConfirm', {
              required: t('input.required'),
              validate: (value) => value === password || t('register.password.error'),
            })}
          />
        </PasswordField>
      </Stack>
    </LoginWrapper>
  );
};
