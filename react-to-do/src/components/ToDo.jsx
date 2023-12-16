import React from "react"; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const ToDo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className='Todo'>
      <p
        onClick={() => toggleComplete(task.id)}
        className={`${task.completed ? 'completed' : ""}`}
      >
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};

ToDo.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
