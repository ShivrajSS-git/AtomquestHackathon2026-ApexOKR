import React, { useState } from 'react';
import { MessageSquare, Bell, Search } from 'lucide-react';

const Messages = () => {
  const [activeThread, setActiveTab] = useState('inbox');
  
  const mockMessages = [
    { id: 1, sender: 'HR Department', subject: 'Q1 Performance Review Cycle Opened', time: '10:30 AM', unread: true },
    { id: 2, sender: 'Jane Smith (Manager)', subject: 'Please update your Sales Target', time: 'Yesterday', unread: true },
    { id: 3, sender: 'System Admin', subject: 'System Maintenance Scheduled', time: 'May 14', unread: false },
    { id: 4, sender: 'John Doe', subject: 'Collaboration on Project X', time: 'May 12', unread: false }
  ];

  return (
    <div className="flex-col animate-fade-in" style={{ gap: '2rem', paddingBottom: '2rem', height: '100%' }}>
      <div className="flex-row justify-between mb-2">
        <div>
          <h1>Messages & Notifications</h1>
          <p className="text-muted mt-1">Communicate with your team and receive system alerts.</p>
        </div>
      </div>

      <div className="dashboard-grid" style={{ height: '600px', gridTemplateColumns: '320px 1fr' }}>
        {/* Sidebar/List */}
        <div className="card flex-col" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-glass)' }}>
            <div className="flex-row" style={{ background: 'var(--bg-glass)', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', width: '100%', fontSize: '0.9rem' }} 
              />
            </div>
          </div>
          
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {mockMessages.map(msg => (
              <div 
                key={msg.id} 
                style={{ 
                  padding: '1.25rem', 
                  borderBottom: '1px solid var(--border-glass)', 
                  background: msg.unread ? 'var(--primary-glow)' : 'transparent',
                  cursor: 'pointer',
                  borderLeft: msg.unread ? '3px solid var(--primary)' : '3px solid transparent',
                  transition: 'background 0.2s'
                }}
              >
                <div className="flex-row justify-between mb-1">
                  <span style={{ fontWeight: msg.unread ? 700 : 500, color: msg.unread ? 'var(--text-main)' : 'var(--text-muted)' }}>{msg.sender}</span>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>{msg.time}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: msg.unread ? 'var(--text-main)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {msg.subject}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Message View Area */}
        <div className="card flex-col justify-center items-center" style={{ background: 'var(--bg-glass)', borderStyle: 'dashed' }}>
          <MessageSquare size={48} color="var(--border-glass)" className="mb-3" />
          <h2 className="mb-1 text-muted">Select a message</h2>
          <p className="text-muted" style={{ opacity: 0.6 }}>Choose a message from the list to view its contents.</p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
