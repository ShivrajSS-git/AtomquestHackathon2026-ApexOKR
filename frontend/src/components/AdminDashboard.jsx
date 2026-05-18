import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, ShieldCheck, Download, Settings, History, Save, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = ({ user, forcedTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState('completion');
  const [showConfig, setShowConfig] = useState(false);
  const [cycleConfig, setCycleConfig] = useState({
    name: 'FY 2024-25',
    goalSettingStart: '2024-05-01',
    q1Start: '2024-07-01',
    q2Start: '2024-10-01',
    q3Start: '2025-01-01',
    annualStart: '2025-03-01'
  });
  useEffect(() => {
    if (forcedTab && (forcedTab === 'completion' || forcedTab === 'audit' || forcedTab === 'config')) {
      setActiveTab(forcedTab);
    }
  }, [forcedTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  const downloadCSV = () => {
    try {
      const demoData = [
        { employee_name: 'Employee User', title: 'Increase Sales by 10%', thrust_area: 'Sales', uom: 'Numeric', target: '100', weightage: '40', approved: 2 },
        { employee_name: 'Employee User', title: 'Launch New Feature', thrust_area: 'Operations', uom: 'Timeline', target: 'Q3', weightage: '60', approved: 2 },
        { employee_name: 'Jane Doe', title: 'Reduce Server Costs', thrust_area: 'Innovation', uom: '%', target: '15', weightage: '100', approved: 1 }
      ];

      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Employee,Goal Title,Thrust Area,UoM,Target,Weightage,Status\n";

      demoData.forEach(g => {
        csvContent += `${g.employee_name},"${g.title}",${g.thrust_area},${g.uom},${g.target},${g.weightage}%,${g.approved === 2 ? 'Approved' : 'Pending'}\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `ApexOKR_Achievement_Report_${new Date().toLocaleDateString()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Error generating report. No data found to export.");
    }
  };

  return (
    <div className="flex-col animate-fade-in" style={{ gap: '2rem', paddingBottom: '2rem' }}>
      <div className="flex-row justify-between mb-2">
        <div>
          <h1>Admin Console</h1>
          <p className="text-muted mt-1">Organization Governance & Oversight</p>
        </div>
        <button
          className="btn btn-primary"
          style={{ padding: '0.75rem 1.5rem' }}
          onClick={downloadCSV}
        >
          <Download size={18} /> Export Achievement Report
        </button>
      </div>

      <div className="tabs-container">
        <button
          onClick={() => handleTabChange('completion')}
          className={`tab flex-row ${activeTab === 'completion' ? 'active' : ''}`}
        >
          <BarChart3 size={16} /> Completion Dashboard
        </button>
        <button
          onClick={() => handleTabChange('audit')}
          className={`tab flex-row ${activeTab === 'audit' ? 'active' : ''}`}
        >
          <History size={16} /> Audit Trail
        </button>
        <button
          onClick={() => handleTabChange('config')}
          className={`tab flex-row ${activeTab === 'config' ? 'active' : ''}`}
        >
          <Settings size={16} /> System Config
        </button>
      </div>

      {activeTab === 'completion' && (
        <div className="grid-4">
          <div className="card">
            <h3 className="stat-label mb-3">Goal Setting Phase</h3>
            <p className="stat-value">84%</p>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '84%', background: 'var(--primary)' }}></div>
            </div>
            <p className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>126 / 150 Employees Completed</p>
          </div>

          <div className="card">
            <h3 className="stat-label mb-3">Manager Approvals</h3>
            <p className="stat-value">62%</p>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '62%', background: 'var(--warning)' }}></div>
            </div>
            <p className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>93 / 150 Sheets Reviewed</p>
          </div>

          <div className="card">
            <h3 className="stat-label mb-3">Q1 Check-ins</h3>
            <p className="stat-value">12%</p>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '12%', background: 'var(--secondary)' }}></div>
            </div>
            <p className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>Window active since July 1</p>
          </div>

          <div className="card" style={{ background: 'transparent', borderStyle: 'dashed' }}>
            <h3 className="stat-label mb-3">System Health</h3>
            <div className="flex-row mt-3" style={{ color: 'var(--primary)' }}>
              <ShieldCheck size={28} />
              <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Optimal</span>
            </div>
            <p className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>All services operational</p>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="card p-0" style={{ overflow: 'hidden' }}>
          <table className="table">
            <thead style={{ background: 'rgba(0,0,0,0.2)' }}>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-muted">2024-05-16 14:25</td>
                <td style={{ fontWeight: 600 }}>Manager User</td>
                <td><span className="badge badge-approved">Approved</span></td>
                <td>Goal Sheet #401</td>
                <td className="text-muted">Finalized for FY 2024-25</td>
              </tr>
              <tr>
                <td className="text-muted">2024-05-16 12:10</td>
                <td style={{ fontWeight: 600 }}>Employee User</td>
                <td><span className="badge badge-pending">Submitted</span></td>
                <td>Goal Sheet #401</td>
                <td className="text-muted">New draft submitted for review</td>
              </tr>
              <tr>
                <td className="text-muted">2024-05-15 09:45</td>
                <td style={{ fontWeight: 600 }}>Admin User</td>
                <td><span className="badge badge-neutral">Update</span></td>
                <td>System Config</td>
                <td className="text-muted">Modified Q1 Window deadlines</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="card" style={{ maxWidth: '700px' }}>
          <div className="flex-row justify-between mb-4">
            <h3 className="text-xl m-0">Cycle Configuration: {cycleConfig.name}</h3>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={() => setShowConfig(true)}>
              <Settings size={16} /> Modify Schedule
            </button>
          </div>
          <div className="flex-col" style={{ gap: '1rem' }}>
            <div className="flex-row justify-between" style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div>
                <span style={{ fontWeight: 600, display: 'block' }}>Phase 1: Goal Setting</span>
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>Start Date: {cycleConfig.goalSettingStart}</span>
              </div>
              <span className="badge badge-approved">Active Now</span>
            </div>
            <div className="flex-row justify-between" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div>
                <span style={{ fontWeight: 500, display: 'block' }}>Q1 Check-in Window</span>
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>Opens: {cycleConfig.q1Start}</span>
              </div>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>Upcoming</span>
            </div>
          </div>
        </div>
      )}

      {showConfig && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex-row justify-between mb-4">
              <h2 className="m-0">Configure Cycle Schedule</h2>
              <button className="btn btn-outline p-2" onClick={() => setShowConfig(false)}><X size={20} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowConfig(false); alert('Configuration saved!'); }} className="flex-col">
              <div className="input-group">
                <label className="label">Cycle Name</label>
                <input className="input" value={cycleConfig.name} onChange={e => setCycleConfig({ ...cycleConfig, name: e.target.value })} />
              </div>
              <div className="grid-2">
                <div className="input-group">
                  <label className="label">Goal Setting Start</label>
                  <input type="date" className="input" value={cycleConfig.goalSettingStart} onChange={e => setCycleConfig({ ...cycleConfig, goalSettingStart: e.target.value })} />
                </div>
                <div className="input-group">
                  <label className="label">Q1 Window Start</label>
                  <input type="date" className="input" value={cycleConfig.q1Start} onChange={e => setCycleConfig({ ...cycleConfig, q1Start: e.target.value })} />
                </div>
              </div>
              <div className="flex-row mt-4">
                <button type="button" className="btn btn-outline w-full" onClick={() => setShowConfig(false)}>Discard</button>
                <button type="submit" className="btn btn-primary w-full"><Save size={18} /> Save Config</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
