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
  };
};

const App = () => {
  const [todoData, setTodoData] = useState([
    createTask("drink coffee", 1, 1, 0),
  ]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [timers, setTimers] = useState({});
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
    const interval = setInterval(() => {
      tick(id);
    }, 1000);

    setTimers((prevTimers) => ({
      ...prevTimers,
      [id]: {
        ...prevTimers[id],
        interval,
        isRunning: true,
      },
    }));
  };

  const stopTimer = (id) => {
    setTimers((prevTimers) => {
      clearInterval(prevTimers[id].interval);
      return {
        ...prevTimers,
        [id]: {
          ...prevTimers[id],
          isRunning: false,
        },
      };
    });
  };

  const tick = (id) => {
    setTodoData((prevTodoData) => {
      const task = prevTodoData.find((t) => t.id === id);
      if (!task) return prevTodoData;

      let { minutes, seconds } = task;

      if (seconds > 0) {
        seconds -= 1;
      } else if (minutes > 0) {
        minutes -= 1;
        seconds = 59;
      } else {
        clearInterval(timers[id].interval);
        return prevTodoData.map((t) =>
          t.id === id ? { ...t, completed: true } : t,
        );
      }

      return prevTodoData.map((t) =>
        t.id === id ? { ...t, minutes, seconds } : t,
      );
    });
  };

  useEffect(() => {
    return () => {
      Object.values(timers).forEach((timer) => clearInterval(timer.interval));
    };
  }, [timers]);

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
          timers={timers}
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
