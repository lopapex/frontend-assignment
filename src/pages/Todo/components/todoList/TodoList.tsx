import {Text, Stack, Divider} from '@chakra-ui/react';
import {Todo} from '../../../../types/todo';
import {TodoItem} from './TodoItem';
import { OpacityTransitionWrapper } from '../../../../components/OpacityTransitionWrapper';

type TodoListProps = {
  title: string;
  todoList: Todo[];
};

export const TodoList = ({title, todoList}: TodoListProps) => (
  <OpacityTransitionWrapper>
    <Stack>
      <Text fontSize="heading.2" fontWeight="heading.2">
        {title}
      </Text>
      <Divider borderColor="border-gray" />
      <Stack gap="8px">
        {todoList.map((todo) => (
          <TodoItem key={todo.id} item={todo} />
        ))}
      </Stack>
    </Stack>
  </OpacityTransitionWrapper>
);
