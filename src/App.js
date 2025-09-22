// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from './pages/Home/home';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import DashboardHome from './pages/dashboard/DashboardHome';
import Events from './pages/dashboard/Events';
import EventManagement from './pages/dashboard/EventManagement';
import Profile from './pages/dashboard/Profile';
import NotFound from './pages/NotFound/NotFound'; // ✅ 404 page

// Auth & Context
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<Login />} />
            <Route path="navbar" element={<Navbar />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Route>

          {/* ✅ Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventManagement />} />
            <Route path="profile" element={<Profile />} />
            {/* Catch-all inside dashboard → redirect to 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* ✅ Global Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
