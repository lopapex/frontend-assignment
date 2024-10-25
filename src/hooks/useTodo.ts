import { useQuery } from "@tanstack/react-query";
import axios from "../components/utils/axios";
import { API_ENDPOINTS } from "../constants/api";

export const useTodoList = () => useQuery({
    queryKey: ['todoList'],
    queryFn: async () => {
      const data = await axios.get(API_ENDPOINTS.TODO_LIST);
      return data;
    },
  });
