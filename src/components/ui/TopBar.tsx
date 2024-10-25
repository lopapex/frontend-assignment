import {
  BoxProps,
  HStack,
  Text,
  Flex,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Button,
} from '@chakra-ui/react';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {useTranslation} from 'react-i18next';
import {useUser} from '../../hooks/useUserStorage';
import {useNavigate} from 'react-router-dom';
import pathnames from '../../constants/pathnames';
import {IconBackwards} from '../../constants/icons';
import {useState} from 'react';

type TopBarProps = BoxProps;

export const TopBar = ({...props}: TopBarProps) => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const {getUser, onLogout} = useUser();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const user = getUser();

  return (
    <Center width="100vw">
      <Flex
        justifyContent={!!user ? 'space-between' : 'center'}
        bg="fill-primary"
        maxWidth="1280px"
        width="100%"
        padding="5"
        {...props}
      >
        <HStack
          gap="4px"
          _hover={{cursor: 'pointer', opacity: '0.8'}}
          onClick={() => navigate(!!user ? pathnames.home : pathnames.login)}
        >
          <Logo height="32px" width="32px" />
          <Text fontSize="base" fontWeight="heading.2">
            {t('topBar.title')}
          </Text>
        </HStack>
        {!!user && (
          <Popover isOpen={isPopoverOpen}>
            <PopoverTrigger>
              <Text
                fontSize="base"
                fontWeight="base"
                _hover={{cursor: 'pointer', opacity: '0.8'}}
                onClick={() => setIsPopoverOpen((prev) => !prev)}
              >
                {user.username}
              </Text>
            </PopoverTrigger>
            <PopoverContent padding={2} width="150px" border="none">
              <PopoverArrow />
              <Button
                size={'xs'}
                rightIcon={<IconBackwards fill="white" />}
                onClick={() => {
                  onLogout();
                  setIsPopoverOpen(false);
                }}
              >
                {t(`topBar.button`)}
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </Flex>
    </Center>
  );
};
