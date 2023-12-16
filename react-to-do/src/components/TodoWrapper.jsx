import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { TodoForm } from "./ToDoForm";
import {v4 as uuidv4} from "uuid";
import { ToDo } from "./ToDo";
import { EditTodoForm } from "./EditToDoForm";

uuidv4();

 const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
    console.log(todos);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  const editTask = (task, id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo)));
  };

  TodoWrapper.propTypes = {
    addTodo: PropTypes.func.isRequired,
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) => (
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={index} />
        ) : (
          <ToDo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
        )
      ))}
    </div>
  );
};
export default TodoWrapper;

