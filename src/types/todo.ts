export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTodoPayload = {
  title: string;
  description?: string;
}