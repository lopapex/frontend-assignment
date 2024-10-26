export const BASE_URL = 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  REFRESH_TOKEN: '/refresh-token',

  TODO_LIST: '/todo/list',
  COMPLETE_TODO: '/todo/:id/complete',
  INCOMPLETE_TODO: '/todo/:id/incomplete',

  CREATE_TODO: '/todo',
  CRUD_TODO: '/todo/:id',
};