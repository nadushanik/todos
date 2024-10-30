import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';

const Task = ({ label, createdAt, startEditing, id  }) => {
  const timeAgo = formatDistanceToNowStrict(createdAt, { addSuffix: true });

  return (
    <label onClick={() => startEditing(id)}>
      <span className="description">{label}</span>
      <span className="created">created {timeAgo}</span>
    </label>
  );
};

Task.propTypes = {
  label: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
};

export default Task;