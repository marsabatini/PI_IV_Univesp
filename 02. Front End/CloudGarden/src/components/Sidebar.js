// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, History, Droplets, Bell, Settings, TrendingUp, 
  Trophy, User, Menu, X, LogOut
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ collapsed, onToggle }) => {
  const [notifications] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fechar sidebar no mobile ao mudar de rota
  useEffect(() => {
    if (isMobile && !collapsed) {
      onToggle();
    }
  }, [location.pathname]);

  const menuItems = [
    { icon: Home, label: 'Início', path: '/dashboard' },
    { icon: Droplets, label: 'Irrigação', path: '/irrigacao' },
    { icon: Bell, label: 'Alertas', path: '/alertas', badge: notifications },
    { icon: TrendingUp, label: 'Evolução', path: '/evolucao' },
    // { icon: Trophy, label: 'Ranking', path: '/ranking' },
    { icon: History, label: 'Histórico', path: '/historico' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
    { icon: LogOut, label: 'Sair', path: '/login', isLogout: true }
  ];

  const handleNavigation = (path, isLogout) => {
    if (isLogout) {
      // Limpar dados de sessão/localStorage se necessário
      // localStorage.removeItem('token');
      // sessionStorage.clear();
      navigate(path);
    } else {
      navigate(path);
    }
  };

  const handleOverlayClick = () => {
    if (isMobile && !collapsed) {
      onToggle();
    }
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isMobile && !collapsed && (
        <div 
          className="sidebar-overlay active" 
          onClick={handleOverlayClick}
        />
      )}

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmx1ZUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwYWNmZjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDA3OGZmO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JlZW5HcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2Y2ZmNjc7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzRjYWY1MDtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoIGQ9Ik0yMCAzQzE1IDMgMTAgOCAxMCAxNUMxMCAyMiAxNSAzMCAyMCAzMFMzMCAyMiAzMCAxNUMzMCA4IDI1IDMgMjAgM1oiIGZpbGw9InVybCgjYmx1ZUdyYWRpZW50KSIvPgogIDxlbGxpcHNlIGN4PSIxMiIgY3k9IjIwIiByeD0iOCIgcnk9IjEyIiBmaWxsPSJ1cmwoI2dyZWVuR3JhZGllbnQpIi8+CiAgPHBhdGggZD0iTTggMjBRMTIgMjQgMTYgMjAiIHN0cm9rZT0iIzJlN2QzMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxyZWN0IHg9IjIxIiB5PSIxMiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgZmlsbD0id2hpdGUiIHJ4PSIwLjUiLz4KICA8cmVjdCB4PSIyNiIgeT0iMTIiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IndoaXRlIiByeD0iMC4zIi8+CiAgPHJlY3QgeD0iMjEiIHk9IjE3IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSJ3aGl0ZSIgcng9IjAuMyIvPgogIDxyZWN0IHg9IjI1IiB5PSIxNyIgd2lkdGg9IjMiIGhlaWdodD0iMyIgZmlsbD0id2hpdGUiIHJ4PSIwLjUiLz4KICA8cmVjdCB4PSIyMSIgeT0iMjIiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGZpbGw9IndoaXRlIiByeD0iMC41Ii8+Cjwvc3ZnPg==" 
              alt="CloudGarden" 
            />
            {!collapsed && <span>CloudGarden</span>}
          </div>
          <button 
            className="sidebar-toggle"
            onClick={onToggle}
            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className={`nav-item ${location.pathname === item.path ? 'active' : ''} ${item.isLogout ? 'logout-item' : ''}`}
              onClick={() => handleNavigation(item.path, item.isLogout)}
              title={collapsed ? item.label : ''}
            >
              <item.icon size={20} />
              {!collapsed && (
                <>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="badge">{item.badge}</span>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <User size={20} />
            </div>
            {!collapsed && (
              <div className="user-details">
                <span className="user-name">Maria Silva</span>
                <span className="user-role">Professora</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;