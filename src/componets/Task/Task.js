import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";

import "./Task.css";

const Task = ({
  label,
  createdAt,
  minutes,
  seconds,
  isRunning,
  startTimer,
  stopTimer,
}) => {
  const normalizeTime = () => {
    let normalizedMinutes = minutes;
    let normalizedSeconds = seconds;

    while (normalizedSeconds >= 60) {
      normalizedSeconds -= 60;
      normalizedMinutes += 1;
    }

    return `${normalizedMinutes.toString().padStart(2, "0")}:${normalizedSeconds.toString().padStart(2, "0")}`;
  };

  const timeAgo = formatDistanceToNowStrict(createdAt, { addSuffix: true });

  return (
    <label>
      <span className="description">{label}</span>
      {isRunning ? (
        <button className="icon-pause" onClick={stopTimer}></button>
      ) : (
        <button className="icon-play" onClick={startTimer}></button>
      )}
      <span className="timer">{normalizeTime()}</span>
      <span className="created">created {timeAgo}</span>
    </label>
  );
};

Task.propTypes = {
  label: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  isRunning: PropTypes.bool,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
};

export default Task;
