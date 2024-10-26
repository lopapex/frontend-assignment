import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from '../../../utils/axios';
import {API_ENDPOINTS} from '../../../constants/api';
import {CreateTodoPayload, Todo} from '../../../types/todo';
import {useNavigate} from 'react-router-dom';
import pathnames from '../../../constants/pathnames';
import {useUser} from '../../../hooks/useUser';
import {useCustomToast} from '../../../hooks/useCustomToast';

const setTodoCompleted = async (id: string) =>
  axios.post(API_ENDPOINTS.COMPLETE_TODO.replace(':id', id));

const setTodoInCompleted = async (id: string) =>
  axios.post(API_ENDPOINTS.INCOMPLETE_TODO.replace(':id', id));

const addTodo = async (data: CreateTodoPayload) => axios.post(API_ENDPOINTS.CREATE_TODO, data);

const deleteTodo = async (id: string) => axios.delete(API_ENDPOINTS.CRUD_TODO.replace(':id', id));

const updateTodo = async (id: string, data: CreateTodoPayload) =>
  axios.put(API_ENDPOINTS.CRUD_TODO.replace(':id', id), data);

const getTodoList = async () => {
  const {data} = await axios.get<{
    todos: Array<Todo>;
  }>(API_ENDPOINTS.TODO_LIST);
  return data;
};

const getTodo = async (id: string) => {
  const {data} = await axios.get<Todo>(API_ENDPOINTS.CRUD_TODO.replace(':id', id));
  return data;
};

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

export const useTodoUpdate = (id?: string, successMessage?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useCustomToast();

  return useMutation({
    mutationFn: async (payload: CreateTodoPayload) => {
      if (id) {
        await updateTodo(id, payload);
      } else {
        await addTodo(payload);
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todoList']});
      navigate(pathnames.home);
      if (successMessage) {
        toast({
          title: successMessage,
          status: 'success',
        });
      }
    },
  });
};

export const useTodoDelete = (successMessage: string) => {
  const queryClient = useQueryClient();
  const toast = useCustomToast();
  return useMutation({
    mutationFn: async (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todoList']});
      toast({
        title: successMessage,
        status: 'success',
      });
    },
  });
};

export const useTodoList = () => {
  const {getUser} = useUser();

  return useQuery({
    queryKey: ['todoList', getUser().username],
    queryFn: async () => getTodoList(),
  });
};

export const useTodo = (id?: string) =>
  useQuery({
    queryKey: ['todo', id],
    queryFn: async () => getTodo(id as string),
    enabled: !!id,
  });
