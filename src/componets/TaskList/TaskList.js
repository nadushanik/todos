import React, { Component } from "react";
import PropTypes from "prop-types";

import EditTaskForm from "../EditTaskForm";
import Task from "../Task/Task";
import "./TaskList.css";

class TaskList extends Component {
  static defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleCompleted: () => {},
    startEditing: () => {},
    saveEditing: () => {},
    editingTask: null,
    timers: {},
    startTimer: () => {},
    stopTimer: () => {},
  };

  static propTypes = {
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
    timers: PropTypes.object,
    startTimer: PropTypes.func,
    stopTimer: PropTypes.func,
  };

  render() {
    const {
      todos,
      onDeleted,
      onToggleCompleted,
      startEditing,
      saveEditing,
      editingTask,
      timers,
      startTimer,
      stopTimer,
    } = this.props;

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
                  isRunning={timers[todo.id]?.isRunning}
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
  }
}

export default TaskList;
