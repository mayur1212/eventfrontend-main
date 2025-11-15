// src/components/AdminRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading)
    return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;

  if (!user || user.role !== "admin") return <Navigate to="/" replace />;

  return children || <Outlet />;
};

export default AdminRoute;
