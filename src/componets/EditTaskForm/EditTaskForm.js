import React, { Component } from "react";

class EditTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.task.label,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveEditing(this.props.task.id, this.state.text);
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    const { task } = this.props;
    const { text } = this.state;
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
    );
  }
}
export default EditTaskForm;
