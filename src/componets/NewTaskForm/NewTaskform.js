import React, { useState } from "react";
import "./NewTaskform.css";

const NewTaskForm = ({ onTaskAdded }) => {
  const [taskText, setTaskText] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "taskText") setTaskText(value);
    if (name === "minutes") setMinutes(value);
    if (name === "seconds") setSeconds(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const text = taskText.trim();
      if (text && !/^\s*$/.test(text)) {
        const minutesNum = parseInt(minutes, 10);
        const secondsNum = parseInt(seconds, 10);
        const finalMinutes = isNaN(minutesNum) ? 1 : minutesNum;
        const finalSeconds = isNaN(secondsNum) ? 0 : secondsNum;
        onTaskAdded(text, finalMinutes, finalSeconds);
        setTaskText("");
        setMinutes("");
        setSeconds("");
      }
    }
  };

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        name="taskText"
        value={taskText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        type="number"
        name="minutes"
        value={minutes}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        type="number"
        name="seconds"
        value={seconds}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default NewTaskForm;
