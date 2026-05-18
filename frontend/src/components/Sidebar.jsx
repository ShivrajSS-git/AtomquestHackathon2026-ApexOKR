import React, { useState, useEffect } from 'react';
import { Target, User, LogOut, LayoutDashboard, MessageSquare, Users, HelpCircle, Moon, Sun } from 'lucide-react';

const Sidebar = ({ user, onLogout, currentView, onViewChange }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="sidebar animate-fade-in">
      <div className="sidebar-header">
        <div className="sidebar-logo text-inverse">
          <Target size={24} />
        </div>
        <span className="sidebar-title">ApexOKR</span>
      </div>
      
      <div className="sidebar-nav">
        <div className="label mb-1" style={{ paddingLeft: '1.25rem' }}>Navigation</div>
        
        <button 
          className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => onViewChange('dashboard')}
        >
          <LayoutDashboard size={20} /> Dashboard
        </button>

        <button 
          className={`nav-item ${currentView === 'messages' ? 'active' : ''}`}
          onClick={() => onViewChange('messages')}
        >
          <MessageSquare size={20} /> Messages
        </button>

        <button 
          className={`nav-item ${currentView === 'directory' ? 'active' : ''}`}
          onClick={() => onViewChange('directory')}
        >
          <Users size={20} /> Directory
        </button>

        <button 
          className={`nav-item ${currentView === 'support' ? 'active' : ''}`}
          onClick={() => onViewChange('support')}
        >
          <HelpCircle size={20} /> Support
        </button>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">
            <User size={24} color="var(--primary)" />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
            <div className="text-muted" style={{ fontSize: '0.85rem' }}>{user.role}</div>
          </div>
        </div>
        <div className="flex-col" style={{ gap: '0.5rem' }}>
          <button onClick={toggleTheme} className="btn btn-outline w-full" style={{ padding: '0.6rem' }}>
            {theme === 'light' ? <><Moon size={16} /> Dark Mode</> : <><Sun size={16} /> Light Mode</>}
          </button>
          <button onClick={onLogout} className="btn btn-outline w-full" style={{ padding: '0.6rem' }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
