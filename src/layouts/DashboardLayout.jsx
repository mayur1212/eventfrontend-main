import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const styles = {
  layout: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#0e0e15',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  contentWrapper: {
    padding: '1rem 2rem',
    overflowY: 'auto',
    height: '100%',
    backgroundColor: '#14141f',
    borderTop: '1px solid #333',
  },
};

const DashboardLayout = () => {
  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.mainContent}>
        <Topbar />
        <div style={styles.contentWrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
