import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Target, Lock, Plus, Calendar, AlertCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EmployeeDashboard = ({ user, forcedTab, onTabChange }) => {
  const [goals, setGoals] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('planning'); 
  
  const [newGoal, setNewGoal] = useState({
    thrust_area: 'Sales',
    title: '',
    description: '',
    uom: 'Numeric',
    target: '',
    weightage: 10
  });

  const [updateQuarter, setUpdateQuarter] = useState(1);
  const [updateActual, setUpdateActual] = useState('');
  const [updateStatus, setUpdateStatus] = useState('On Track');
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Sync with Sidebar navigation
  useEffect(() => {
    if (forcedTab && (forcedTab === 'planning' || forcedTab === 'tracking')) {
      setActiveTab(forcedTab);
    }
  }, [forcedTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  const fetchData = async () => {
    const resGoals = await axios.get(`${API_BASE}/goals/${user.id}`);
    setGoals(resGoals.data);
    const resAch = await axios.get(`${API_BASE}/achievements/${user.id}`);
    setAchievements(resAch.data);
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    if (goals.length >= 8) return alert('Maximum 8 goals allowed');
    if (newGoal.weightage < 10) return alert('Minimum weightage is 10%');
    
    const currentTotal = goals.reduce((sum, g) => sum + g.weightage, 0);
    if (currentTotal + parseInt(newGoal.weightage) > 100) {
      return alert('Total weightage cannot exceed 100%');
    }

    await axios.post(`${API_BASE}/goals`, { ...newGoal, user_id: user.id, year: 2024 });
    setShowForm(false);
    fetchData();
  };

  const submitForApproval = async () => {
    const total = goals.reduce((sum, g) => sum + g.weightage, 0);
    if (total !== 100) return alert('Total weightage must be exactly 100%');
    await axios.post(`${API_BASE}/goals/submit`, { user_id: user.id });
    fetchData();
  };

  const handleAchievementSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE}/achievements`, {
      goal_id: selectedGoalId,
      quarter: updateQuarter,
      actual: updateActual,
      status: updateStatus
    });
    setSelectedGoalId(null);
    fetchData();
  };

  const isLocked = goals.some(g => g.approved > 0);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <div className="flex-row justify-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1>My Goals</h1>
          <p className="text-muted">FY 2024-25 Performance Cycle</p>
        </div>
        <div className="tabs-container">
          <button 
            className={`tab ${activeTab === 'planning' ? 'active' : ''}`}
            onClick={() => handleTabChange('planning')}
          >
            Phase 1: Planning
          </button>
          <button 
            className={`tab ${activeTab === 'tracking' ? 'active' : ''}`}
            onClick={() => handleTabChange('tracking')}
            disabled={!isLocked}
          >
            Phase 2: Tracking
          </button>
        </div>
      </div>

      {activeTab === 'planning' && (
        <div className="flex-col" style={{ gap: '2rem' }}>
          <div className="card flex-row justify-between">
            <div className="flex-row" style={{ gap: '3rem' }}>
              <div>
                <p className="stat-label">Total Weightage</p>
                <div className="flex-row" style={{ alignItems: 'baseline', gap: '0.5rem' }}>
                  <span className="stat-value">{goals.reduce((sum, g) => sum + g.weightage, 0)}%</span>
                  <span className="text-muted">/ 100%</span>
                </div>
              </div>
              <div>
                <p className="stat-label">Goals Count</p>
                <div className="flex-row" style={{ alignItems: 'baseline', gap: '0.5rem' }}>
                  <span className="stat-value">{goals.length}</span>
                  <span className="text-muted">/ 8 Max</span>
                </div>
              </div>
              <div>
                <p className="stat-label">Sheet Status</p>
                <div className="mt-2">
                  {isLocked ? <span className="badge badge-pending">Pending Approval</span> : <span className="badge badge-neutral">Draft Mode</span>}
                </div>
              </div>
            </div>
            {!isLocked && (
              <div className="flex-row">
                <button onClick={() => setShowForm(true)} className="btn btn-outline" disabled={goals.length >= 8}>
                  <Plus size={18} /> Add Goal
                </button>
                <button onClick={submitForApproval} className="btn btn-primary" disabled={goals.length === 0}>
                  Submit Sheet
                </button>
              </div>
            )}
          </div>

          <div className="grid-2">
            {goals.map(goal => (
              <div key={goal.id} className="card flex-col justify-between">
                <div>
                  <div className="flex-row justify-between mb-2">
                    <span className="badge badge-neutral">{goal.thrust_area}</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{goal.weightage}%</span>
                  </div>
                  <h3 className="mb-1">{goal.title}</h3>
                  <p className="text-muted mb-3" style={{ minHeight: '3rem' }}>{goal.description}</p>
                </div>
                
                <div className="bg-subtle" style={{ padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                  <div className="flex-row justify-between">
                    <div>
                      <p className="stat-label mb-1">Target</p>
                      <p className="font-semibold">{goal.target} {goal.uom === '%' ? '%' : ''}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p className="stat-label mb-1">UoM</p>
                      <p className="font-semibold">{goal.uom}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tracking' && (
        <div className="flex-col" style={{ gap: '2rem' }}>
          <div className="card flex-row" style={{ gap: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
            <div style={{ padding: '1rem', background: 'var(--primary-glow)', borderRadius: '12px' }}>
              <Calendar color="var(--text-main)" size={24} />
            </div>
            <div>
              <h3>Active Window: Q1 Check-in</h3>
              <p className="text-muted">Log your actual achievements against your planned targets.</p>
            </div>
          </div>

          <div className="flex-col">
            {goals.filter(g => g.approved === 2).map(goal => {
              const ach = achievements.find(a => a.goal_id === goal.id && a.quarter === 1);
              return (
                <div key={goal.id} className="card flex-row justify-between" style={{ padding: '1.5rem 2rem' }}>
                  <div style={{ flex: 1, paddingRight: '2rem', borderRight: '1px solid var(--border-glass)' }}>
                    <span className="badge badge-neutral mb-2">{goal.thrust_area}</span>
                    <h3>{goal.title}</h3>
                    <div className="flex-row mt-2 text-muted" style={{ gap: '2rem', fontSize: '0.9rem' }}>
                      <p>Target: <strong style={{ color: 'var(--text-main)' }}>{goal.target} {goal.uom === '%' ? '%' : ''}</strong></p>
                      <p>Weightage: <strong style={{ color: 'var(--text-main)' }}>{goal.weightage}%</strong></p>
                    </div>
                  </div>
                  
                  <div style={{ width: '30%', padding: '0 2rem' }}>
                    <p className="stat-label mb-1">Q1 Actual</p>
                    {ach ? (
                      <div>
                        <p className="stat-value" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                          {ach.actual} {goal.uom === '%' ? '%' : ''}
                        </p>
                        <span className={`badge ${ach.status === 'Completed' ? 'badge-approved' : 'badge-pending'}`}>
                          {ach.status}
                        </span>
                      </div>
                    ) : (
                      <div className="flex-row text-muted" style={{ color: 'var(--warning)', fontWeight: 500 }}>
                        <AlertCircle size={18} /> Pending Update
                      </div>
                    )}
                  </div>
                  
                  <div style={{ paddingLeft: '2rem' }}>
                    <button 
                      className="btn btn-outline"
                      onClick={() => {
                        setSelectedGoalId(goal.id);
                        setUpdateActual(ach?.actual || '');
                        setUpdateStatus(ach?.status || 'On Track');
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="mb-4">Create Goal</h2>
            <form onSubmit={handleGoalSubmit} className="flex-col" style={{ gap: '1.25rem' }}>
              <div className="grid-2">
                <div className="input-group">
                  <label className="label">Thrust Area</label>
                  <select className="input" value={newGoal.thrust_area} onChange={e => setNewGoal({...newGoal, thrust_area: e.target.value})}>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                    <option value="Customer Success">Customer Success</option>
                    <option value="Innovation">Innovation</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="label">Unit of Measure</label>
                  <select className="input" value={newGoal.uom} onChange={e => setNewGoal({...newGoal, uom: e.target.value})}>
                    <option value="Numeric">Numeric</option>
                    <option value="%">%</option>
                    <option value="Timeline">Timeline</option>
                    <option value="Zero">Zero</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label className="label">Goal Title</label>
                <input className="input" required value={newGoal.title} onChange={e => setNewGoal({...newGoal, title: e.target.value})} placeholder="e.g., Increase Q3 Revenue" />
              </div>
              <div className="input-group">
                <label className="label">Description</label>
                <textarea className="input" style={{ height: '80px', resize: 'none' }} value={newGoal.description} onChange={e => setNewGoal({...newGoal, description: e.target.value})} />
              </div>
              <div className="grid-2">
                <div className="input-group">
                  <label className="label">Target Value</label>
                  <input className="input" type="number" required value={newGoal.target} onChange={e => setNewGoal({...newGoal, target: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="label">Weightage (%)</label>
                  <input className="input" type="number" min="10" max="100" required value={newGoal.weightage} onChange={e => setNewGoal({...newGoal, weightage: e.target.value})} />
                </div>
              </div>
              <div className="flex-row mt-2">
                <button type="button" className="btn btn-outline w-full" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary w-full">Save Goal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedGoalId && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <h2 className="mb-4">Log Q1 Actuals</h2>
            <form onSubmit={handleAchievementSubmit} className="flex-col" style={{ gap: '1.25rem' }}>
              <div className="input-group">
                <label className="label">Actual Achievement</label>
                <input className="input" type="number" required value={updateActual} onChange={e => setUpdateActual(e.target.value)} />
              </div>
              <div className="input-group">
                <label className="label">Status Indicator</label>
                <select className="input" value={updateStatus} onChange={e => setUpdateStatus(e.target.value)}>
                  <option value="Not Started">Not Started</option>
                  <option value="On Track">On Track</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex-row mt-2">
                <button type="button" className="btn btn-outline w-full" onClick={() => setSelectedGoalId(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary w-full">Save Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
