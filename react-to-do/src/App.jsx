import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import './App.css';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import TodoWrapper from './components/TodoWrapper'; 

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem('token', data.token);
      } else {
        const errorData = await response.json();
  
        console.error('Login failed. Server response:', errorData);
        }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };
 
  
  return (
    <div className="App">
      {token ? (
        <>
          <LogoutButton onLogout={handleLogout} />
          <TodoWrapper token={token} />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
