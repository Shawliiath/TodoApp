import React, { useState } from 'react';
import '../styles/Layout.css';

interface NavbarProps {
  username: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <div className="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </div>
          <h1>TaskMaster</h1>
        </div>

        <div className="navbar-links-desktop">
          <a href="#" className="active">Tâches</a>
          <a href="#">Projets</a>
          <a href="#">Statistiques</a>
          <a href="#">Paramètres</a>
        </div>

        <div className="navbar-user">
          <div className="navbar-username">{username}</div>
          <button onClick={onLogout} className="navbar-logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span className="logout-text">Déconnexion</span>
          </button>
        </div>

        <div className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {menuOpen && (
        <div className="navbar-links-mobile">
          <a href="#" className="active">Tâches</a>
          <a href="#">Projets</a>
          <a href="#">Statistiques</a>
          <a href="#">Paramètres</a>
          <div className="mobile-user-info">
            <div className="mobile-username">Connecté en tant que: {username}</div>
            <button onClick={onLogout} className="mobile-logout">
              Se déconnecter
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;