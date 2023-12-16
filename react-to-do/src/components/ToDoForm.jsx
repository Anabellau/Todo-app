import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo(value);

    setValue("");
  };

  TodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired,
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="What is the task today?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
