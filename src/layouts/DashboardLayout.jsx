import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './dashboard.css';

export default function DashboardLayout() {
  return <div className="dashboard-shell"><Sidebar /><div className="dashboard-main"><Topbar /><main className="dashboard-content"><div className="dashboard-container"><Outlet /></div></main></div></div>;
}
