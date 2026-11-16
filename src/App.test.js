import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { UserContext } from './context/UserContext';
import { eventStatus } from './pages/dashboard/DashboardHome';

test('admin dashboard guard rejects a logged-in regular user', () => {
  render(<MemoryRouter><UserContext.Provider value={{ user: { role: 'user' }, loading: false }}><ProtectedRoute role="admin"><p>Private admin content</p></ProtectedRoute></UserContext.Provider></MemoryRouter>);
  expect(screen.queryByText('Private admin content')).not.toBeInTheDocument();
});

test('admin dashboard guard allows an admin', () => {
  render(<MemoryRouter><UserContext.Provider value={{ user: { role: 'admin' }, loading: false }}><ProtectedRoute role="admin"><p>Private admin content</p></ProtectedRoute></UserContext.Provider></MemoryRouter>);
  expect(screen.getByText('Private admin content')).toBeInTheDocument();
});

test('event dates include both start and end day in ongoing status', () => {
  jest.useFakeTimers().setSystemTime(new Date(2026, 10, 14, 12));
  try {
    expect(eventStatus({ startDate: '2026-11-14', endDate: '2026-11-14' })).toBe('Ongoing');
    expect(eventStatus({ startDate: '2026-11-15', endDate: '2026-11-16' })).toBe('Upcoming');
    expect(eventStatus({ startDate: '2026-11-12', endDate: '2026-11-13' })).toBe('Completed');
    expect(eventStatus({})).toBe('Unscheduled');
  } finally { jest.useRealTimers(); }
});
