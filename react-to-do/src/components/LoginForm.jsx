import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={credentials.username} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={credentials.password} onChange={handleChange} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
