import { Text, Stack, HStack, IconButton } from '@chakra-ui/react';
import { Todo } from '../../../../types/todo';
import { CheckMark } from '../../../../components/CheckMark';
import { IconMore } from '../../../../constants/assets';
import { useTodoStatus } from '../../hooks/useTodo';
import { OpacityTransitionWrapper } from '../../../../components/OpacityTransitionWrapper';

type TodoItemProps = {
  item: Todo;
};

export const TodoItem = ({ item }: TodoItemProps) => {
  const { mutate: updateStatus } = useTodoStatus();

  return (
    <OpacityTransitionWrapper>
      <Stack>
        <HStack gap="8px">
          <CheckMark
            isChecked={item.completed}
            onChange={(newStatus) => updateStatus({ id: item.id, completed: newStatus })}
          />
          <Text width="100%" fontSize="heading.3" fontWeight="heading.3" color="text-primary">
            {item.title}
          </Text>
          <IconButton
            size="sm"
            bg="inherit"
            icon={<IconMore fill="fill-darkBlue" />}
            aria-label="actions"
          />
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
