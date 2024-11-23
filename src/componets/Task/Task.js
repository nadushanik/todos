import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";

import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: props.minutes,
      seconds: props.seconds,
      isRunning: false,
    };
    this.x = null;
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.x = setInterval(this.count, 1000);
    }
  };

  stopTimer = () => {
    if (this.state.isRunning) {
      this.setState({ isRunning: false });
      clearInterval(this.x);
    }
  };

  count = () => {
    let { minutes, seconds } = this.state;
    if (seconds > 0) {
      seconds -= 1;
    } else if (minutes > 0) {
      minutes -= 1;
      seconds = 59;
    } else {
      clearInterval(this.x);
      this.setState({ isRunning: false });
    }
    this.setState({ minutes, seconds });
  };

  formatTime = () => {
    let { minutes, seconds } = this.state;
    minutes += Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  componentWillUnmount() {
    clearInterval(this.x);
  }

  render() {
    const { label, createdAt } = this.props;
    const { isRunning } = this.state;
    const timeAgo = formatDistanceToNowStrict(createdAt, { addSuffix: true });

    return (
      <label>
        <span className="description">{label}</span>
        {isRunning ? (
          <button className="icon-pause" onClick={this.stopTimer}></button>
        ) : (
          <button className="icon-play" onClick={this.startTimer}></button>
        )}
        <span className="timer">{this.formatTime()}</span>
        <span className="created">created {timeAgo}</span>
      </label>
    );
  }
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default Task;
