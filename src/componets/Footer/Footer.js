import React from "react";
import PropTypes from "prop-types";

import Filter from "../Filter";
import "./Footer.css";

const Footer = ({
  activeTasksCount,
  filter,
  onFilterChange,
  clearCompleted,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeTasksCount} items left</span>
      <Filter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  activeTasksCount: 0,
  filter: "all",
  onFilterChange: () => {},
  clearCompleted: () => {},
};

Footer.propTypes = {
  activeTasksCount: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  clearCompleted: PropTypes.func,
};

export default Footer;
