import React from 'react';
import { LogOut, User, Target } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center mb-8">
      <div className="flex items-center gap-2">
        <Target className="text-primary w-8 h-8" />
        <span className="text-xl font-bold tracking-tight">ApexOKR</span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-text-muted">{user.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <User className="text-white w-5 h-5" />
          </div>
        </div>
        <button onClick={onLogout} className="btn btn-outline p-2">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
