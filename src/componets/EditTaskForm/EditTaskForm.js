import React, { useState } from "react";

const EditTaskForm = ({ task, saveEditing }) => {
  const [text, setText] = useState(task.label);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEditing(task.id, text);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
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
        onChange={handleChange}
        autoFocus
      />
    </form>
  );
};

export default EditTaskForm;
