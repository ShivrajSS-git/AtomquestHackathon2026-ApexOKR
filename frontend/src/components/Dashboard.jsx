import React from 'react';
import EmployeeDashboard from './EmployeeDashboard';
import ManagerDashboard from './ManagerDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = ({ user, activeSubTab, onTabChange }) => {
  switch (user.role) {
    case 'Employee':
      return <EmployeeDashboard user={user} forcedTab={activeSubTab} onTabChange={onTabChange} />;
    case 'Manager':
      return <ManagerDashboard user={user} forcedTab={activeSubTab} onTabChange={onTabChange} />;
    case 'Admin':
      return <AdminDashboard user={user} forcedTab={activeSubTab} onTabChange={onTabChange} />;
    default:
      return <div>Unauthorized Role</div>;
  }
};

export default Dashboard;
