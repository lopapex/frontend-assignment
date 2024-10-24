import {Button, Link, Stack, Text} from '@chakra-ui/react';
import {ContentCard} from '../ui/ContentCard';
import {ReactNode} from 'react';
import { useTranslation } from 'react-i18next';
import { IconForward } from '../../constants/icons';
import pathnames from '../../constants/pathnames';

type LoginWrapperProps = {
  type: 'login' | 'register';
  onSubmit: () => void;
  children: ReactNode;
};

export const LoginWrapper = ({type, onSubmit, children}: LoginWrapperProps) => {
  const {t} = useTranslation();

  const isLogin = type === 'login';

  return (
    <ContentCard maxWidth="560px">
      <Stack gap="24px">
        <Text fontSize="heading.1" fontWeight="heading.1" color="text-primary">
          {t(`${type}.title`)}
        </Text>
        <Text fontSize="base" fontWeight="base" color="text-secondary">
          {t(`${type}.description`)}
        </Text>
        <form onSubmit={onSubmit}>
          <Stack gap="24px">
            {children}

            <Stack gap="4px">
              <Button rightIcon={<IconForward fill="white" />} type="submit">
                {t(`${type}.button`)}
              </Button>
              <Text fontSize="base" fontWeight="base" color="text-secondary">
                {t(`${type}.footer`)}{' '}
                <Link color="fill-brand" href={isLogin ? pathnames.register : pathnames.login}>
                  {t(`${type}.footerLink`)}
                </Link>
              </Text>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </ContentCard>
  );
};
