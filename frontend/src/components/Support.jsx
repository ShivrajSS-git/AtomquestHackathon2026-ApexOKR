import React, { useState } from 'react';
import { HelpCircle, Book, MessageCircle, FileText, ChevronRight } from 'lucide-react';

const Support = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketBody, setTicketBody] = useState('');

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    alert('Support ticket submitted successfully. Our team will get back to you within 24 hours.');
    setTicketSubject('');
    setTicketBody('');
  };

  return (
    <div className="flex-col animate-fade-in" style={{ gap: '2rem', paddingBottom: '2rem' }}>
      <div className="flex-row justify-between mb-2">
        <div>
          <h1>Help & Support</h1>
          <p className="text-muted mt-1">Get assistance with the portal or report an issue.</p>
        </div>
      </div>

      <div className="grid-3">
        <div className="card flex-col items-center justify-center text-center hover-lift" style={{ cursor: 'pointer' }}>
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
            <Book size={32} color="var(--primary)" />
          </div>
          <h3>Knowledge Base</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>Read guides on goal setting and system workflows.</p>
        </div>
        
        <div className="card flex-col items-center justify-center text-center hover-lift" style={{ cursor: 'pointer' }}>
          <div style={{ padding: '1rem', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
            <MessageCircle size={32} color="var(--warning)" />
          </div>
          <h3>Live Chat</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>Chat with an HR representative during business hours.</p>
        </div>

        <div className="card flex-col items-center justify-center text-center hover-lift" style={{ cursor: 'pointer' }}>
          <div style={{ padding: '1rem', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
            <FileText size={32} color="var(--accent)" />
          </div>
          <h3>Policy Documents</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>View the 2024-25 organizational performance policy.</p>
        </div>
      </div>

      <div className="card mt-2">
        <div className="flex-row mb-4">
          <HelpCircle size={24} color="var(--primary)" />
          <h2 className="m-0">Submit a Ticket</h2>
        </div>
        <form onSubmit={handleTicketSubmit} className="flex-col" style={{ maxWidth: '600px' }}>
          <div className="input-group">
            <label className="label">Issue Subject</label>
            <input 
              className="input" 
              required 
              placeholder="e.g. Cannot lock my goal sheet" 
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="label">Description</label>
            <textarea 
              className="input" 
              required 
              style={{ height: '120px', resize: 'none' }} 
              placeholder="Please provide details about the issue..."
              value={ticketBody}
              onChange={(e) => setTicketBody(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
            Send Request <ChevronRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;
