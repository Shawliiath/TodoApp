import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Layout.css';

interface MainLayoutProps {
  children: React.ReactNode;
  username: string;
  onLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, username, onLogout }) => {
  return (
    <div className="layout-container">
      <Navbar username={username} onLogout={onLogout} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;