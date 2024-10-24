import {Button, Center, Input, Stack, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {ContentCard} from '../components/ContentCard';
import {useForm} from 'react-hook-form';
import {Field} from '../components/Field';
import {PasswordField} from '../components/PasswordField';
import {IconForward} from '../constants/icons';

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
      <ContentCard maxWidth="560px">
        <Stack gap="24px">
          <Text fontSize="heading.1" fontWeight="heading.1" color="text-primary">
            {t('login.title')}
          </Text>
          <Text fontSize="base" fontWeight="base" color="text-secondary">
            {t('login.description')}
          </Text>
          <form onSubmit={onSubmit}>
            <Stack gap="24px">
              <Field label={t('login.username')} isInvalid={!!errors.userName}>
                <Input {...register('userName')} />
              </Field>

              <PasswordField label={t('login.password')} isInvalid={!!errors.password}>
                <Input placeholder={t('login.password.placeholder')} {...register('password')} />
              </PasswordField>

              <Button rightIcon={<IconForward fill="white" />} type="submit">
                {t('login.button')}
              </Button>
            </Stack>
          </form>
        </Stack>
      </ContentCard>
    </Center>
  );
};
