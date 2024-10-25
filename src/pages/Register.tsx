import {Input, Stack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import {Field} from '../components/ui/Field';
import {PasswordField} from '../components/ui/PasswordField';
import {LoginWrapper} from '../components/elements/LoginWrapper';
import {useRegisterMutation} from '../hooks/useUser';
import {useUser} from '../hooks/useUserStorage';
import {useEffect} from 'react';

type FormValues = {
  userName: string;
  password: string;
  passwordConfirm: string;
};

export const Register = () => {
  const {t} = useTranslation();

  const {
    mutate: registerUser,
    data: user,
    isError,
    isSuccess,
    isPending: isLoading,
  } = useRegisterMutation();
  const {onLogin} = useUser();

  useEffect(() => {
    if (isSuccess) {
      onLogin(user);
    }
  }, [isSuccess, onLogin]);

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
      <Field label={t('register.username')} isInvalid={!!errors.userName}>
        <Input {...register('userName', {required: true})} />
      </Field>

      <PasswordField label={t('register.password')} isInvalid={!!errors.password}>
        <Input
          placeholder={t('register.password.placeholder')}
          {...register('password', {required: true})}
        />
      </PasswordField>

      <Stack gap="4px">
        <PasswordField label={t('register.password.confirm')} isInvalid={!!errors.passwordConfirm}>
          <Input
            placeholder={t('register.password.confirm.placeholder')}
            {...register('passwordConfirm', {
              required: true,
              validate: (value) => value === password || t('register.password.error'),
            })}
          />
        </PasswordField>
        {errors.passwordConfirm && (
          <span style={{color: 'red'}}>{errors.passwordConfirm.message}</span>
        )}

        {isError && <span style={{color: 'red'}}>{t('register.error')}</span>}
      </Stack>
    </LoginWrapper>
  );
};
