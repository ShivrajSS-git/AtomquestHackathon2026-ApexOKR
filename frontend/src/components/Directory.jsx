import React, { useState } from 'react';
import { Users, Search, Mail, Phone } from 'lucide-react';

const Directory = () => {
  const mockDirectory = [
    { id: 1, name: 'Alice Cooper', role: 'VP of Sales', department: 'Sales', email: 'alice@apexokr.com', phone: '+1 555-0101' },
    { id: 2, name: 'Bob Smith', role: 'Senior Developer', department: 'Engineering', email: 'bob@apexokr.com', phone: '+1 555-0102' },
    { id: 3, name: 'Charlie Davis', role: 'HR Manager', department: 'Human Resources', email: 'charlie@apexokr.com', phone: '+1 555-0103' },
    { id: 4, name: 'Diana Prince', role: 'Product Manager', department: 'Product', email: 'diana@apexokr.com', phone: '+1 555-0104' },
    { id: 5, name: 'Evan Wright', role: 'Marketing Lead', department: 'Marketing', email: 'evan@apexokr.com', phone: '+1 555-0105' }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredDirectory = mockDirectory.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    person.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-col animate-fade-in" style={{ gap: '2rem', paddingBottom: '2rem' }}>
      <div className="flex-row justify-between mb-2">
        <div>
          <h1>Corporate Directory</h1>
          <p className="text-muted mt-1">Find and connect with colleagues across the organization.</p>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <div className="flex-row mb-4" style={{ background: 'var(--bg-glass)', padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search by name or department..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', width: '100%', fontSize: '1rem' }} 
          />
        </div>

        <div className="grid-3">
          {filteredDirectory.map(person => (
            <div key={person.id} className="card" style={{ padding: '1.5rem', background: 'var(--bg-glass)' }}>
              <div className="flex-row mb-3">
                <div className="avatar" style={{ width: '48px', height: '48px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {person.name.charAt(0)}
                </div>
                <div>
                  <h3 className="m-0">{person.name}</h3>
                  <p className="text-muted" style={{ fontSize: '0.85rem' }}>{person.role}</p>
                </div>
              </div>
              <span className="badge badge-neutral mb-3" style={{ display: 'inline-block' }}>{person.department}</span>
              <div className="flex-col" style={{ gap: '0.5rem' }}>
                <div className="flex-row" style={{ gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Mail size={14} /> {person.email}
                </div>
                <div className="flex-row" style={{ gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Phone size={14} /> {person.phone}
                </div>
              </div>
            </div>
          ))}
          {filteredDirectory.length === 0 && (
            <div className="text-muted" style={{ gridColumn: 'span 3', textAlign: 'center', padding: '2rem' }}>
              No employees found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Directory;
