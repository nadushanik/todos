import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

class TaskList extends Component {
  static defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleCompleted: () => {},
    startEditing: () => {},
    saveEditing: () => {},
    editingTask: null,
  }

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
  }

  render() {
    const {
      todos,
      onDeleted,
      onToggleCompleted,
      startEditing,
      saveEditing,
      editingTask,
    } = this.props

    return (
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`${todo.completed ? 'completed' : ''} ${editingTask === todo.id ? 'editing' : ''}`}
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
                <Task {...todo} />
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
    )
  }
}

class EditTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.task.label,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.saveEditing(this.props.task.id, this.state.text)
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }

  render() {
    const { task } = this.props
    const { text } = this.state
    return (
      <form onSubmit={this.handleSubmit} className="edit-form">
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={task.completed}
            onChange={() => {}}
          />
          <label>
            <span className="description">Editing task</span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        <input
          type="text"
          className="edit"
          value={text}
          onChange={this.handleChange}
          autoFocus
        />
      </form>
    )
  }
}

export default TaskList
