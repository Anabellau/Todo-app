import React,{useState} from "react";// eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
export const EditTodoForm = ({editTodo,task}) => {
    const [value,setValue] =useState(task.task);
    
    const handleSubmit = e => {
        e.preventDefault();
        
        editTodo(value,task.id);

        setValue("")

    }
    EditTodoForm.propTypes = {
        editTodo: PropTypes.func.isRequired,
        task: PropTypes.shape({
            task: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }).isRequired,
    };
   return (
       <form className="TodoForm" onSubmit={handleSubmit}>
        <input type="text" className="todo-input" value ={value} placeholder="Update Task" onChange={(e) => setValue(e.target.value)}/>
        <button type="submit" className="todo-btn">Update Task</button>
       </form>
   )
}