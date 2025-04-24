import React from 'react';
import { Todo } from '../types/todo';
import '../styles/TodoApp.css';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number, completed: boolean) => Promise<void>; 
    onDelete: (id: number) => Promise<void>;
    onEdit: (id: number) => void;
  }

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <div className="todo-item">
      <div className="todo-left">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
        />
        <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {todo.title}
        </span>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => onEdit(todo.id)}
          className="btn btn-primary"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;