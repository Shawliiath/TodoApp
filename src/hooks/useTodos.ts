import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';
import { todoService } from '../services/TodoServiceMock'; // j'utilise mock directement

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await todoService.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (newTodo: CreateTodoRequest) => {
    try {
      const addedTodo = await todoService.createTodo(newTodo);
      setTodos((prev) => [...prev, addedTodo]);
      return addedTodo;
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
      throw err;
    }
  };

  const updateTodo = async (id: number, updates: UpdateTodoRequest) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      setError(`Failed to update todo ${id}`);
      console.error(err);
      throw err;
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(`Failed to delete todo ${id}`);
      console.error(err);
      throw err;
    }
  };

  const toggleComplete = async (id: number, completed: boolean) => {
    return updateTodo(id, { completed });
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    refreshTodos: fetchTodos,
  };
};