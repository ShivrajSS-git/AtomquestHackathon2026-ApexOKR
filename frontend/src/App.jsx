import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Messages from './components/Messages';
import Directory from './components/Directory';
import Support from './components/Support';
import './index.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'messages', 'directory', 'support'
  const [activeSubTab, setActiveSubTab] = useState(null);

  const handleLogin = async (email) => {
    try {
      const res = await axios.post(`${API_BASE}/login`, { email });
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      setCurrentView('dashboard');
      setActiveSubTab(null);
    } catch (err) {
      alert('Login failed. Check credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCurrentView('dashboard');
    setActiveSubTab(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'messages':
        return <Messages />;
      case 'directory':
        return <Directory />;
      case 'support':
        return <Support />;
      case 'dashboard':
      default:
        return (
          <Dashboard 
            user={user} 
            activeSubTab={activeSubTab}
            onTabChange={setActiveSubTab}
          />
        );
    }
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/" 
          element={
            user ? (
              <div className="app-container">
                <Sidebar 
                  user={user} 
                  onLogout={handleLogout} 
                  currentView={currentView}
                  onViewChange={setCurrentView}
                />
                <main className="main-content">
                  {renderContent()}
                </main>
              </div>
            ) : <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
