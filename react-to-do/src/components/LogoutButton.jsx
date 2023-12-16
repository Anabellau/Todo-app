import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

const LogoutButton = ({ onLogout }) => {
  return (
    <button onClick={onLogout}>Logout</button>
  );
};

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
