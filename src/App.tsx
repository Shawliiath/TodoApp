import React, { useState, useEffect } from 'react';
import TodoApp from './TodoApp';
import LoginPage from './components/LoginPage';
import './styles/Layout.css';
import './styles/TodoApp.css';
import './styles/Login.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // déjà log?
  useEffect(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    const savedUsername = localStorage.getItem('username');
    
    if (savedLoginState === 'true' && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  // gestion de login
  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
    
    // save l'état du log en local
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
  };

  // manager de login
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    
    // delet le state de login
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <TodoApp username={username} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;