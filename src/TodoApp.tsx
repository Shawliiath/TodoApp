// src/TodoApp.tsx
import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import MainLayout from './layouts/MainLayout';
import { useTodos } from './hooks/useTodos';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from './types/todo';
import './styles/TodoApp.css';

interface TodoAppProps {
  username: string;
  onLogout: () => void;
}

function TodoApp({ username, onLogout }: TodoAppProps) {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodos();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTodo = async (data: CreateTodoRequest) => {
    await addTodo(data);
  };

  const handleUpdateTodo = async (data: UpdateTodoRequest) => {
    if (!editingTodo) return;
    await updateTodo(editingTodo.id, data);
    setEditingTodo(null);
  };

  const handleEditClick = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  // typage mistakeS
  const handleToggle = async (id: number, completed: boolean): Promise<void> => {
    await toggleComplete(id, completed);
  };

  // todo filter
  const filteredTodos = todos.filter(todo => {
    if (filterStatus === 'active') return !todo.completed;
    if (filterStatus === 'completed') return todo.completed;
    return true; // 'all'
  });

  return (
    <MainLayout username={username} onLogout={onLogout}>
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Tableau de bord</h1>
          <p>Bienvenue, <span className="username-highlight">{username}</span>! Gérez vos tâches efficacement</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-value">{todos.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{todos.filter(t => !t.completed).length}</span>
            <span className="stat-label">En cours</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{todos.filter(t => t.completed).length}</span>
            <span className="stat-label">Terminées</span>
          </div>
        </div>
      </div>

      <div className="todo-container">
        <div className="todo-sidebar">
          <div className="sidebar-section">
            <h3>Filtres</h3>
            <div className="filter-options">
              <button 
                className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                Toutes
              </button>
              <button 
                className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
                onClick={() => setFilterStatus('active')}
              >
                En cours
              </button>
              <button 
                className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
                onClick={() => setFilterStatus('completed')}
              >
                Terminées
              </button>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Progression</h3>
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${todos.length ? (todos.filter(t => t.completed).length / todos.length) * 100 : 0}%` 
                }}
              ></div>
            </div>
            <p className="progress-text">
              {todos.filter(t => t.completed).length} sur {todos.length} tâches terminées
            </p>
          </div>
          
          <div className="sidebar-section">
            <h3>Votre compte</h3>
            <div className="user-info">
              <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
              <div className="user-details">
                <p className="user-name">{username}</p>
                <button onClick={onLogout} className="logout-btn">Se déconnecter</button>
              </div>
            </div>
          </div>
        </div>

        <div className="todo-main">
          <div className="form-section">
            {editingTodo ? (
              <>
                <h2 className="section-title">Modifier la tâche</h2>
                <TodoForm
                  onSubmit={handleUpdateTodo}
                  initialData={editingTodo}
                  onCancel={handleCancelEdit}
                />
              </>
            ) : (
              <>
                <h2 className="section-title">Ajouter une nouvelle tâche</h2>
                <TodoForm onSubmit={handleAddTodo} />
              </>
            )}
          </div>

          <div className="list-section">
            <h2 className="section-title">Vos tâches</h2>
            {loading ? (
              <p className="loading">Chargement des tâches...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <TodoList
                todos={filteredTodos}
                onToggle={handleToggle}
                onDelete={deleteTodo}
                onEdit={handleEditClick}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default TodoApp;