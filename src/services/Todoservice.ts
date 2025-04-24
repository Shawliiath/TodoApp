import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';

const API_URL = 'http://localhost:3000/api'; // api desac j'utilise mock en local directement

export const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  async getTodoById(id: number): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch todo with id ${id}`);
    }
    return response.json();
  },

  async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    console.log('Sending data to API:', todo);
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      
      if (!response.ok) {
        console.error('API error:', response.status, await response.text());
        throw new Error('Failed to create todo');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  async updateTodo(id: number, todo: UpdateTodoRequest): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error(`Failed to update todo with id ${id}`);
    }
    return response.json();
  },

  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete todo with id ${id}`);
    }
  },
};