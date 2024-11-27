import React, { Component } from "react";
import "./NewTaskform.css";
export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskText: "",
      minutes: "",
      seconds: "",
    };
  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const { taskText, minutes, seconds } = this.state;
      const text = taskText.trim();
      if (text && !/^\s*$/.test(text)) {
        const minutesNum = parseInt(minutes, 10);
        const secondsNum = parseInt(seconds, 10);
        const finalMinutes = isNaN(minutesNum) ? 1 : minutesNum;
        const finalSeconds = isNaN(secondsNum) ? 0 : secondsNum;
        this.props.onTaskAdded(text, finalMinutes, finalSeconds);
        this.setState({ taskText: "", minutes: "", seconds: "" });
      }
    }
  };
  render() {
    const { taskText, minutes, seconds } = this.state;
    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          name="taskText"
          value={taskText}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          name="minutes"
          value={minutes}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleInputChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          name="seconds"
          value={seconds}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
      </form>
    );
  }
}
