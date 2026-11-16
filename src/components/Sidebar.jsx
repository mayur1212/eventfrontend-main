import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import firstLogo from "../assets/footer-logo.jpg";
import { CalendarDays, Package, ShoppingBag, LayoutDashboard, UserRound, ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return <aside className={`dashboard-sidebar ${collapsed ? "is-collapsed" : ""}`}>
    <div className="sidebar-logo-row">
      <NavLink to="/dashboard" className="dashboard-brand" aria-label="Dashboard overview"><img className="sidebar-first-logo" src={firstLogo} alt="FIRST" /></NavLink>
      <button type="button" className="sidebar-toggle" aria-label={collapsed ? "Expand navigation" : "Collapse navigation"} aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}</button>
    </div>
    <nav aria-label="Dashboard navigation">{[["/dashboard", "Overview", LayoutDashboard], ["/dashboard/events", "Events", CalendarDays], ["/dashboard/products", "Kit Products", Package], ["/dashboard/kit-orders", "Kit Orders", ShoppingBag], ["/dashboard/profile", "My profile", UserRound]].map(([path, label, Icon]) => <NavLink key={path} end={path === "/dashboard"} title={label} to={path} className={({ isActive }) => `dashboard-nav-link ${isActive ? "is-active" : ""}`}><Icon size={19} /><span className="sidebar-label">{label}</span></NavLink>)}</nav>
  </aside>;
}
