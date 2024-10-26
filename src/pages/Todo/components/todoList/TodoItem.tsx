import {
  Text,
  Stack,
  HStack,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Button,
  useTheme,
} from '@chakra-ui/react';
import {Todo} from '../../../../types/todo';
import {CheckMark} from '../../../../components/CheckMark';
import {IconDelete, IconEdit, IconMore} from '../../../../constants/assets';
import {useTodoDelete, useTodoStatus} from '../../hooks/useTodo';
import {OpacityTransitionWrapper} from '../../../../components/OpacityTransitionWrapper';
import {useNavigate} from 'react-router-dom';
import pathnames from '../../../../constants/pathnames';
import {useTranslation} from 'react-i18next';

type TodoItemProps = {
  item: Todo;
};

export const TodoItem = ({item}: TodoItemProps) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const {mutate: updateStatus} = useTodoStatus();
  const {mutate: deleteTodo} = useTodoDelete(t('deleteTodo.success'));

  return (
    <OpacityTransitionWrapper>
      <Stack>
        <HStack gap="8px">
          <CheckMark
            isChecked={item.completed}
            onChange={(newStatus) => updateStatus({id: item.id, completed: newStatus})}
          />
          <Text
            _hover={{opacity: 0.6, cursor: 'pointer'}}
            onClick={() => console.log('clicked')}
            width="100%"
            fontSize="heading.3"
            fontWeight="heading.3"
            color="text-primary"
          >
            {item.title}
          </Text>

          <Popover placement="bottom-end">
            <PopoverTrigger>
              <IconButton
                size="sm"
                bg="inherit"
                _hover={{bg: 'fill-gray'}}
                icon={<IconMore fill="fill-darkBlue" />}
                aria-label="actions"
              />
            </PopoverTrigger>
            <PopoverContent padding={2} width="216px" border="none">
              <PopoverArrow />
              <Button
                size="sm"
                variant="tertiary"
                justifyContent="flex-start"
                leftIcon={<IconEdit fill="fill-primary" />}
                onClick={() => navigate(`${pathnames.todoForm}/${item.id}`)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="tertiary"
                color="text-danger"
                leftIcon={<IconDelete fill={theme.colors['text-danger']} />}
                justifyContent="flex-start"
                onClick={() => deleteTodo(item.id)}
              >
                Delete
              </Button>
            </PopoverContent>
          </Popover>
        </HStack>
        {item.description && (
          <Stack paddingLeft="48px">
            <Text width="100%" fontSize="base" fontWeight="base" color="text-ternary">
              {item.description}
            </Text>
          </Stack>
        )}
      </Stack>
    </OpacityTransitionWrapper>
  );
};
