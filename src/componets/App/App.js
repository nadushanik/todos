import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import AppHeader from "../AppHeader";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

import "./App.css";

const createTask = (label, id, minutes, seconds) => {
  return {
    label,
    id,
    completed: false,
    createdAt: new Date(),
    minutes,
    seconds,
    isRunning: false,
    startTime: null,
    elapsedTime: 0,
  };
};

const App = () => {
  const [todoData, setTodoData] = useState([
    createTask("drink coffee", 1, 1, 0),
  ]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [maxId, setMaxId] = useState(2);

  const delitTask = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => el.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const addTask = (text, minutes, seconds) => {
    const newTask = createTask(text, maxId, minutes, seconds);
    setTodoData((prevTodoData) => [...prevTodoData, newTask]);
    setMaxId((prevMaxId) => prevMaxId + 1);
  };

  const clearCompleted = () => {
    setTodoData((prevTodoData) =>
      prevTodoData.filter((el) => el.completed === false),
    );
  };

  const filterTasks = (items, filter) => {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.completed);
      case "completed":
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  };

  const searchTasks = (items) => {
    return items;
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const startEditing = (id) => {
    setEditingTask(id);
  };

  const saveEditing = (id, newText) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) =>
        item.id === id ? { ...item, label: newText } : item,
      ),
    );
    setEditingTask(null);
  };

  const startTimer = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((task) =>
        task.id === id
          ? { ...task, isRunning: true, startTime: Date.now() }
          : task,
      ),
    );
  };

  const stopTimer = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((task) =>
        task.id === id ? { ...task, isRunning: false } : task,
      ),
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTodoData((prevTodoData) =>
        prevTodoData.map((task) => {
          if (task.isRunning) {
            const currentTime = Date.now();
            const newElapsedTime = currentTime - task.startTime;
            const totalTime = (task.minutes * 60 + task.seconds) * 1000;
            const remainingTime = totalTime - newElapsedTime;

            if (remainingTime <= 0 && !task.completed) {
              return {
                ...task,
                completed: true,
                isRunning: false,
                elapsedTime: totalTime,
              };
            }

            return { ...task, elapsedTime: newElapsedTime };
          }
          return task;
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const activeTasksCount = todoData.filter((task) => !task.completed).length;
  const visibleTask = filterTasks(searchTasks(todoData), filter);

  return (
    <section className="todoapp">
      <AppHeader />
      <NewTaskForm onTaskAdded={addTask} />
      <section className="main">
        <TaskList
          todos={visibleTask}
          onDeleted={delitTask}
          onToggleCompleted={toggleCompleted}
          startEditing={startEditing}
          saveEditing={saveEditing}
          editingTask={editingTask}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer
          activeTasksCount={activeTasksCount}
          filter={filter}
          onFilterChange={onFilterChange}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
};

App.propTypes = {
  todoData: PropTypes.array,
};

export default App;
