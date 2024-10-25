import {Button, Link, Spinner, Stack, Text} from '@chakra-ui/react';
import {ContentCard} from '../ui/ContentCard';
import {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {IconForward} from '../../constants/assets';
import pathnames from '../../constants/pathnames';
import { LOGIN_MAX_WIDTH } from '../../constants/sizes';

type LoginWrapperProps = {
  type: 'login' | 'register';
  isLoading?: boolean;
  onSubmit: () => void;
  children: ReactNode;
};

export const LoginWrapper = ({type, onSubmit, isLoading, children}: LoginWrapperProps) => {
  const {t} = useTranslation();

  const isLogin = type === 'login';

  return (
    <ContentCard maxWidth={LOGIN_MAX_WIDTH}>
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
              <Button
                rightIcon={!isLoading ? <IconForward fill="white" /> : undefined}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Spinner color="fill-white" /> : t(`${type}.button`)}
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
