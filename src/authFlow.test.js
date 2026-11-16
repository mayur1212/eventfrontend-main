import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import RegisterForm from './components/RegisterForm/RegisterForm';
import { UserContext } from './context/UserContext';
import { api } from './api';

jest.mock('./components/navbar/Navbar', () => () => null);
jest.mock('./components/Footer/Footer', () => () => null);
jest.mock('react-toastify', () => ({ toast: { success: jest.fn(), error: jest.fn() } }));
jest.mock('./api', () => ({
  api: { post: jest.fn() }, authLog: jest.fn(),
  apiError: error => error.response?.data?.message || 'Cannot reach backend',
}));
beforeEach(() => { jest.clearAllMocks(); localStorage.clear(); });
const login = () => render(<UserContext.Provider value={{ setUser: jest.fn() }}><MemoryRouter><Login /></MemoryRouter></UserContext.Provider>);
const submitLogin = () => {
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'mayur@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Login' }));
};
test('login displays backend failure inline without saving a token', async () => {
  api.post.mockRejectedValue({ isAxiosError: true, response: { status: 401, data: { message: 'Invalid credentials' } } });
  login(); submitLogin();
  expect(await screen.findByRole('alert')).toHaveTextContent('Invalid credentials');
  expect(localStorage.getItem('token')).toBeNull();
});
test('login rejects malformed successful responses', async () => {
  api.post.mockResolvedValue({ data: { user: { role: 'admin' } } });
  login(); submitLogin();
  expect(await screen.findByRole('alert')).toHaveTextContent('missing a valid login token');
  expect(localStorage.getItem('token')).toBeNull();
});
test('registration carries success message to login and excludes image and password from logs', async () => {
  api.post.mockResolvedValue({ data: { message: 'Registered' } });
  render(<UserContext.Provider value={{ setUser: jest.fn() }}><MemoryRouter initialEntries={['/register']}><Routes><Route path="/register" element={<RegisterForm />} /><Route path="/login" element={<Login />} /></Routes></MemoryRouter></UserContext.Provider>);
  fireEvent.click(screen.getByPlaceholderText('Select Event'));
  fireEvent.click(screen.getAllByText('Michiana Premier Event')[0]);
  for (const [name, value] of Object.entries({ clientName: 'Mayur', contactNumber: '9876543210', email: 'MAYUR@example.com', password: 'password123', venue: 'Hall', city: 'Pune', startDate: '2026-12-01', endDate: '2026-12-02' })) {
    fireEvent.change(document.querySelector(`[name="${name}"]`), { target: { value } });
  }
  fireEvent.click(screen.getByRole('button', { name: 'Register' }));
  expect(await screen.findByRole('status')).toHaveTextContent('Registration successful');
  expect(screen.getByPlaceholderText('Email')).toHaveValue('mayur@example.com');
  await waitFor(() => expect(api.post).toHaveBeenCalledWith('/register', expect.objectContaining({ email: 'mayur@example.com' })));
  expect(api.post.mock.calls[0][1]).not.toHaveProperty('eventImage');
});
