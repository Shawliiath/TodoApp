import React, { useState, useEffect } from 'react';
import { Todo, CreateTodoRequest } from '../types/todo';
import '../styles/TodoApp.css';

interface TodoFormProps {
  onSubmit: (data: CreateTodoRequest) => Promise<void>;
  initialData?: Todo;
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCompleted(initialData.completed);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onSubmit({ title, completed });
    
    // reset de if si ca marche pas
    if (!initialData) {
      setTitle('');
      setCompleted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          required
        />
      </div>
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <label htmlFor="completed">Completed</label>
      </div>
      <div className="button-group">
        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialData ? 'Update' : 'Add'} Todo
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;