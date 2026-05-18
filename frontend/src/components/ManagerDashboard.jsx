import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Check, X, Edit2, MessageSquare } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const ManagerDashboard = ({ user, forcedTab, onTabChange }) => {
  const [team, setTeam] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberGoals, setMemberGoals] = useState([]);
  const [memberAch, setMemberAch] = useState([]);
  
  const [activeTab, setActiveTab] = useState('approvals');
  const [editingGoal, setEditingGoal] = useState(null);
  const [editTarget, setEditTarget] = useState('');
  const [editWeightage, setEditWeightage] = useState('');
  
  const [commentingAch, setCommentingAch] = useState(null);
  const [managerComment, setManagerComment] = useState('');

  useEffect(() => {
    fetchTeam();
  }, []);

  // Sync with Sidebar navigation
  useEffect(() => {
    if (forcedTab && (forcedTab === 'approvals' || forcedTab === 'checkins')) {
      setActiveTab(forcedTab);
    }
  }, [forcedTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  const fetchTeam = async () => {
    const res = await axios.get(`${API_BASE}/manager/team/${user.id}`);
    setTeam(res.data);
  };

  const fetchMemberData = async (memberId) => {
    const resGoals = await axios.get(`${API_BASE}/goals/${memberId}`);
    setMemberGoals(resGoals.data);
    const resAch = await axios.get(`${API_BASE}/achievements/${memberId}`);
    setMemberAch(resAch.data);
  };

  const handleAction = async (goalId, status) => {
    await axios.post(`${API_BASE}/manager/approve`, { goal_id: goalId, approved: status });
    fetchMemberData(selectedMember.id);
  };

  const handleInlineEdit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE}/manager/edit_goal`, {
      goal_id: editingGoal,
      target: editTarget,
      weightage: editWeightage
    });
    setEditingGoal(null);
    fetchMemberData(selectedMember.id);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE}/manager/checkin_comment`, {
      achievement_id: commentingAch,
      manager_comment: managerComment
    });
    setCommentingAch(null);
    fetchMemberData(selectedMember.id);
  };

  return (
    <div className="dashboard-grid animate-fade-in">
      <div className="card flex-col" style={{ padding: '1rem', height: 'fit-content' }}>
        <h2 className="stat-label mb-2 flex-row" style={{ color: 'var(--text-main)' }}>
          <Users size={16} /> My Direct Reports
        </h2>
        <div className="flex-col" style={{ gap: '0.5rem' }}>
          {team.map(member => (
            <button
              key={member.id}
              onClick={() => { setSelectedMember(member); fetchMemberData(member.id); }}
              className={`nav-item ${selectedMember?.id === member.id ? 'active' : ''}`}
              style={{ padding: '1rem', borderRadius: '10px' }}
            >
              <div className="flex-col" style={{ gap: '0.2rem', alignItems: 'flex-start' }}>
                <span className="font-semibold text-main">{member.name}</span>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>{member.email}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-col" style={{ gap: '1.5rem', paddingBottom: '2rem' }}>
        {selectedMember ? (
          <>
            <div className="flex-row justify-between mb-2">
              <div>
                <h1>{selectedMember.name}</h1>
                <p className="text-muted mt-1">Goal Sheet & Quarterly Reviews</p>
              </div>
              <div className="tabs-container">
                <button 
                  className={`tab ${activeTab === 'approvals' ? 'active' : ''}`}
                  onClick={() => handleTabChange('approvals')}
                >
                  Phase 1: Approvals
                </button>
                <button 
                  className={`tab ${activeTab === 'checkins' ? 'active' : ''}`}
                  onClick={() => handleTabChange('checkins')}
                >
                  Phase 2: Check-ins
                </button>
              </div>
            </div>

            {activeTab === 'approvals' && (
              <div className="flex-col" style={{ gap: '1.25rem' }}>
                {memberGoals.length > 0 ? memberGoals.map(goal => (
                  <div key={goal.id} className="card flex-row" style={{ padding: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, paddingRight: '2rem' }}>
                      <div className="flex-row mb-2">
                        <span className="badge badge-neutral">{goal.thrust_area}</span>
                        {goal.approved === 1 && <span className="badge badge-pending">Pending Approval</span>}
                        {goal.approved === 2 && <span className="badge badge-approved">Approved</span>}
                        {goal.approved === 3 && <span className="badge badge-rework">Rework Requested</span>}
                      </div>
                      <h3 className="mb-1">{goal.title}</h3>
                      <p className="text-muted mb-4">{goal.description}</p>

                      {editingGoal === goal.id ? (
                        <form onSubmit={handleInlineEdit} className="flex-row bg-subtle" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                          <div className="input-group">
                            <label className="label">Target</label>
                            <input className="input" value={editTarget} onChange={e => setEditTarget(e.target.value)} required />
                          </div>
                          <div className="input-group">
                            <label className="label">Weightage (%)</label>
                            <input className="input" type="number" value={editWeightage} onChange={e => setEditWeightage(e.target.value)} required />
                          </div>
                          <div className="flex-row mt-4">
                            <button type="button" onClick={() => setEditingGoal(null)} className="btn btn-outline" style={{ padding: '0.75rem' }}>Cancel</button>
                            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem' }}>Save</button>
                          </div>
                        </form>
                      ) : (
                        <div className="grid-3 bg-subtle" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                          <div>
                            <p className="stat-label mb-1">Target</p>
                            <p className="font-semibold text-lg">{goal.target} {goal.uom === '%' ? '%' : ''}</p>
                          </div>
                          <div>
                            <p className="stat-label mb-1">Weightage</p>
                            <p className="font-semibold text-lg" style={{ color: 'var(--primary)' }}>{goal.weightage}%</p>
                          </div>
                          <div>
                            <p className="stat-label mb-1">UoM</p>
                            <p className="font-semibold text-lg">{goal.uom}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {goal.approved === 1 && editingGoal !== goal.id && (
                      <div className="flex-col" style={{ width: '140px', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-glass)' }}>
                        <button onClick={() => handleAction(goal.id, 2)} className="btn btn-outline" style={{ color: 'var(--success)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                          <Check size={16} /> Approve
                        </button>
                        <button onClick={() => {
                          setEditingGoal(goal.id);
                          setEditTarget(goal.target);
                          setEditWeightage(goal.weightage);
                        }} className="btn btn-outline" style={{ color: 'var(--primary)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                          <Edit2 size={16} /> Edit
                        </button>
                        <button onClick={() => handleAction(goal.id, 3)} className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                          <X size={16} /> Return
                        </button>
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="card text-center" style={{ padding: '4rem', background: 'transparent', borderStyle: 'dashed' }}>
                    <p className="text-muted">No goals submitted yet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'checkins' && (
              <div className="flex-col" style={{ gap: '1.25rem' }}>
                {memberGoals.filter(g => g.approved === 2).map(goal => {
                  const ach = memberAch.find(a => a.goal_id === goal.id && a.quarter === 1);
                  return (
                    <div key={goal.id} className="card flex-col" style={{ padding: '1.5rem' }}>
                      <div className="flex-row justify-between mb-3">
                        <h3 className="m-0">{goal.title}</h3>
                        <span className="badge badge-neutral">Target: {goal.target}</span>
                      </div>
                      
                      {ach ? (
                        <div className="bg-subtle" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                          <div className="flex-row justify-between mb-3">
                            <div>
                              <p className="stat-label mb-1">Q1 Actual Achievement</p>
                              <p className="stat-value" style={{ fontSize: '2rem' }}>{ach.actual}</p>
                            </div>
                            <span className={`badge ${ach.status === 'Completed' ? 'badge-approved' : 'badge-pending'}`} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                              {ach.status}
                            </span>
                          </div>
                          
                          <div style={{ height: '1px', background: 'var(--border-glass)', margin: '1.5rem 0' }} />
                          
                          {commentingAch === ach.id ? (
                            <form onSubmit={handleCommentSubmit} className="flex-col">
                              <div className="input-group">
                                <label className="label">Manager Feedback</label>
                                <textarea className="input" style={{ height: '100px', resize: 'none' }} value={managerComment} onChange={e => setManagerComment(e.target.value)} required />
                              </div>
                              <div className="flex-row mt-2">
                                <button type="button" onClick={() => setCommentingAch(null)} className="btn btn-outline" style={{ padding: '0.6rem 1.2rem' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>Save Feedback</button>
                              </div>
                            </form>
                          ) : (
                            <div className="flex-row justify-between" style={{ alignItems: 'flex-start' }}>
                              <div className="flex-1 pr-4">
                                <p className="stat-label mb-2 flex-row text-primary"><MessageSquare size={14} /> Manager Feedback</p>
                                {ach.manager_comment ? (
                                  <p className="text-muted bg-subtle" style={{ fontStyle: 'italic', padding: '1rem', borderRadius: '8px' }}>
                                    "{ach.manager_comment}"
                                  </p>
                                ) : (
                                  <p className="text-muted" style={{ fontStyle: 'italic', opacity: 0.7 }}>No feedback provided yet.</p>
                                )}
                              </div>
                              <button 
                                onClick={() => {
                                  setCommentingAch(ach.id);
                                  setManagerComment(ach.manager_comment || '');
                                }} 
                                className="btn btn-outline"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                              >
                                {ach.manager_comment ? 'Edit Feedback' : 'Add Feedback'}
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="badge badge-pending w-full justify-center" style={{ padding: '1rem', background: 'rgba(251, 191, 36, 0.1)' }}>
                          Employee has not logged Q1 achievement yet.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="card flex-col items-center justify-center" style={{ minHeight: '50vh', background: 'transparent', borderStyle: 'dashed' }}>
            <Users size={48} color="var(--border-glass)" className="mb-3" />
            <h2 className="mb-1 text-muted">Select a team member</h2>
            <p className="text-muted" style={{ opacity: 0.6 }}>Review goal sheets and track quarterly performance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
