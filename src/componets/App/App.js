import React, { Component } from "react";
import PropTypes from "prop-types";

import AppHeader from "../AppHeader";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

import "./App.css";

export default class App extends Component {
  maxId = 3;
  state = {
    todoData: [this.createTask("drink coffee", 1, 0)],
    filter: "all",
    editingTask: null,
  };

  static defaultProps = {
    todoData: [
      {
        id: 101,
        completed: false,
      },
    ],
    filter: "all",
  };

  static propTypes = {
    todoData: PropTypes.instanceOf(Array),
  };

  createTask(label, minutes, seconds) {
    return {
      label,
      id: this.maxId++,
      completed: false,
      createdAt: new Date(),
      minutes,
      seconds,
    };
  }

  delitTask = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.id !== id);
      return {
        todoData: newArray,
      };
    });
  };

  toggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
      return {
        todoData: newArray,
      };
    });
  };

  addTask = (text, minutes, seconds) => {
    const newTask = this.createTask(text, minutes, seconds);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask];
      return {
        todoData: newArr,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newDataStream = todoData.filter((el) => el.completed === false);
      return {
        todoData: newDataStream,
      };
    });
  };

  filter(items, filter) {
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
  }

  search(items) {
    return items;
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  startEditing = (id) => {
    this.setState({ editingTask: id });
  };

  saveEditing = (id, newText) => {
    this.setState(({ todoData }) => {
      const newDataStream = todoData.map((item) =>
        item.id === id ? { ...item, label: newText } : item,
      );
      return {
        todoData: newDataStream,
        editingTask: null,
      };
    });
  };

  render() {
    const { todoData, filter, editingTask } = this.state;
    const activeTasksCount = todoData.filter((task) => !task.completed).length;
    const visibleTask = this.filter(this.search(todoData), filter);
    return (
      <section className="todoapp">
        <AppHeader />
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className="main">
          <TaskList
            todos={visibleTask}
            onDeleted={this.delitTask}
            onToggleCompleted={this.toggleCompleted}
            startEditing={this.startEditing}
            saveEditing={this.saveEditing}
            editingTask={editingTask}
          />
          <Footer
            activeTasksCount={activeTasksCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
