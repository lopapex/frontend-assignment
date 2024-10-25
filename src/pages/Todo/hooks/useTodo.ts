import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from '../../../utils/axios';
import {API_ENDPOINTS} from '../../../constants/api';
import {Todo} from '../../../types/todo';

export const useTodoList = () =>
  useQuery({
    queryKey: ['todoList'],
    queryFn: async () => {
      const {data} = await axios.get<{
        todos: Array<Todo>;
      }>(API_ENDPOINTS.TODO_LIST);
      return data;
    },
  });

export const setTodoCompleted = async (id: string) =>
  axios.post(API_ENDPOINTS.COMPLETE_TODO.replace(':id', id));

export const setTodoInCompleted = async (id: string) =>
  axios.post(API_ENDPOINTS.INCOMPLETE_TODO.replace(':id', id));

export const useTodoStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, completed}: {id: string; completed: boolean}) => {
      if (!completed) {
        await setTodoInCompleted(id);
      } else {
        await setTodoCompleted(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todoList']});
    },
  });
};
