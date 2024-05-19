import React, { useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const deleteTodo = async () => {
    try {
      await axios.delete(`http://localhost:5000/todos/${todo.id}`);
      fetchTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTodo = async () => {
    try {
      await axios.put(`http://localhost:5000/todos/${todo.id}`, { description });
      setIsEditing(false);
      fetchTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <span>{todo.description}</span>
      )}
      <button onClick={deleteTodo}>Delete</button>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      {isEditing && <button onClick={updateTodo}>Update</button>}
    </div>
  );
};

export default TodoItem;
