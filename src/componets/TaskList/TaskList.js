import React from "react";
import PropTypes from "prop-types";

import EditTaskForm from "../EditTaskForm";
import Task from "../Task/Task";
import "./TaskList.css";

const TaskList = ({
  todos,
  onDeleted,
  onToggleCompleted,
  startEditing,
  saveEditing,
  editingTask,
  startTimer,
  stopTimer,
}) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`${todo.completed ? "completed" : ""} ${editingTask === todo.id ? "editing" : ""}`}
        >
          {editingTask === todo.id ? (
            <EditTaskForm task={todo} saveEditing={saveEditing} />
          ) : (
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleCompleted(todo.id)}
              />
              <Task
                {...todo}
                startTimer={() => startTimer(todo.id)}
                stopTimer={() => stopTimer(todo.id)}
              />
              <button
                className="icon icon-edit"
                onClick={() => startEditing(todo.id)}
              ></button>
              <button
                className="icon icon-destroy"
                onClick={() => onDeleted(todo.id)}
              ></button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  startEditing: PropTypes.func,
  saveEditing: PropTypes.func,
  editingTask: PropTypes.number,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
};

export default TaskList;
