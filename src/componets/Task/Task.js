import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";

import "./Task.css";

class Task extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    isRunning: PropTypes.bool,
    startTimer: PropTypes.func,
    stopTimer: PropTypes.func,
  };

  normalizeTime() {
    const { minutes, seconds } = this.props;
    let normalizedMinutes = minutes;
    let normalizedSeconds = seconds;

    while (normalizedSeconds >= 60) {
      normalizedSeconds -= 60;
      normalizedMinutes += 1;
    }

    return `${normalizedMinutes.toString().padStart(2, "0")}:${normalizedSeconds.toString().padStart(2, "0")}`;
  }

  render() {
    const { label, createdAt, isRunning, startTimer, stopTimer } = this.props;
    const timeAgo = formatDistanceToNowStrict(createdAt, { addSuffix: true });

    return (
      <label>
        <span className="description">{label}</span>
        {isRunning ? (
          <button className="icon-pause" onClick={stopTimer}></button>
        ) : (
          <button className="icon-play" onClick={startTimer}></button>
        )}
        <span className="timer">{this.normalizeTime()}</span>
        <span className="created">created {timeAgo}</span>
      </label>
    );
  }
}

export default Task;
