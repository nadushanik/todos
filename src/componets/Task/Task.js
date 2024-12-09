import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";

import "./Task.css";

const Task = ({
  id,
  label,
  createdAt,
  minutes,
  seconds,
  isRunning,
  elapsedTime,
  startTimer,
  stopTimer,
}) => {
  const totalTime = (minutes * 60 + seconds) * 1000;
  const remainingTime = totalTime - elapsedTime;

  const remainingMinutes = Math.floor(remainingTime / 60000);
  const remainingSeconds = Math.floor((remainingTime % 60000) / 1000);

  const normalizeTime = () => {
    return `${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const timeAgo = formatDistanceToNowStrict(createdAt, { addSuffix: true });

  return (
    <label>
      <span className="description">{label}</span>
      {isRunning ? (
        <button className="icon-pause" onClick={() => stopTimer(id)}></button>
      ) : (
        <button className="icon-play" onClick={() => startTimer(id)}></button>
      )}
      <span className="timer">{normalizeTime()}</span>
      <span className="created">created {timeAgo}</span>
    </label>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  isRunning: PropTypes.bool,
  elapsedTime: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

export default Task;
