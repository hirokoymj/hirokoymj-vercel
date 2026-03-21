import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { addTodo, completeTodo, deleteTodo } from './todoSlice';

export const Todo = () => {
  const [text, setText] = useState('');
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };
  const handleAddTodo = () => {
    if (text) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleInputChange} />{' '}
      <button onClick={handleAddTodo}> Add Todo </button>{' '}
      <ul>
        {' '}
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.text}{' '}
            <button onClick={() => dispatch(completeTodo(todo.id))}>
              {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}{' '}
            </button>{' '}
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};
