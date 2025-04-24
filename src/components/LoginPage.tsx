import React, { useState } from 'react';
import '../styles/Login.css';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // mdp de base
  const DEMO_PASSWORD = 'todo123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // verif du mdp simple
    if (password === DEMO_PASSWORD) {
      onLogin(username);
    } else {
      setError('Mot de passe incorrect. Essayez "todo123"');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </div>
          <h1>TaskMaster</h1>
        </div>
        
        <h2>Connexion</h2>
        <p className="login-subtitle">Entrez vos identifiants pour accéder à vos tâches</p>
        
        {error && <div className="login-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          
          <div className="form-info">
            <small>Mot de passe de démo: "todo123"</small>
          </div>
          
          <button type="submit" className="login-button">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;