import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';

// on recup le local storage ou tableau vide
const getTodosFromStorage = (): Todo[] => {
  const stored = localStorage.getItem('todos');
  return stored ? JSON.parse(stored) : [
    { id: 1, title: 'Créer une application React avec TypeScript', completed: true, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 2, title: 'Implémenter un service pour les todos', completed: true, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 3, title: 'Créer une interface utilisateur responsive', completed: false, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 4, title: 'Ajouter des fonctionnalités de filtrage', completed: false, createdAt: new Date().toISOString() },
    { id: 5, title: 'Déployer l\'application en production', completed: false, createdAt: new Date().toISOString() }
  ];
};

// save todo en local
const saveTodosToStorage = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// load intial todo
let todos = getTodosFromStorage();
let nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

// petit deplay tkt
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    await delay(700); //latence rez
    return [...todos];
  },

  async getTodoById(id: number): Promise<Todo> {
    await delay(300);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return { ...todo };
  },

  async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    await delay(500);
    const newTodo: Todo = {
      id: nextId++,
      title: todo.title,
      completed: todo.completed || false,
      createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    saveTodosToStorage(todos);
    return { ...newTodo };
  },

  async updateTodo(id: number, updates: UpdateTodoRequest): Promise<Todo> {
    await delay(500);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Failed to update todo with id ${id}`);
    }
    
    todos[index] = {
      ...todos[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    saveTodosToStorage(todos);
    return { ...todos[index] };
  },

  async deleteTodo(id: number): Promise<void> {
    await delay(500);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Failed to delete todo with id ${id}`);
    }
    todos.splice(index, 1);
    saveTodosToStorage(todos);
  }
};