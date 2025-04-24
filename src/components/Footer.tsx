import React from 'react';
import '../styles/Layout.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>TaskMaster</h3>
          <p>Simplifiez votre organisation quotidienne avec notre gestionnaire de tâches intuitif.</p>
        </div>
        
        <div className="footer-section">
          <h4>Liens rapides</h4>
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Tâches</a></li>
            <li><a href="#">À propos</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Ressources</h4>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} TaskMaster. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;