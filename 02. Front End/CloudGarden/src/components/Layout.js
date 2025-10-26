// Layout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, LogOut, Menu } from 'lucide-react';
import './Layout.css';

const Layout = ({ children, pageTitle, pageSubtitle }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      // No mobile, iniciar com sidebar fechada
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Atualizar relógio
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNotificationClick = () => {
    navigate('/alertas');
  };

  const handleLogout = () => {
    // Limpar dados de sessão/localStorage se necessário
    // localStorage.removeItem('token');
    // sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
      />

      <main className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        <header className="main-header">
          <div className="header-left">
            {isMobile && (
              <button 
                className="mobile-menu-btn"
                onClick={toggleSidebar}
                aria-label="Menu"
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.5rem',
                  marginRight: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#4db6ac'
                }}
              >
                <Menu size={24} />
              </button>
            )}
            <div>
              <h1>{pageTitle || 'Dashboard'}</h1>
              <p>{pageSubtitle || formatDate(currentTime)}</p>
            </div>
          </div>
          <div className="header-right">
            <div className="time-display">
              {formatTime(currentTime)}
            </div>
            <div className="header-actions">
              <button 
                className="notification-btn" 
                aria-label="Notificações"
                onClick={handleNotificationClick}
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="notification-dot">{notifications}</span>
                )}
              </button>
              <button 
                className="logout-btn" 
                aria-label="Sair"
                onClick={handleLogout}
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;