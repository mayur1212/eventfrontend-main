import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowUpRight, ArrowRight, Clock3, CircleCheck, RefreshCw, MapPin, AlertCircle } from "lucide-react";
import { UserContext } from "../../context/UserContext";
import { api, apiError } from "../../api";

export const eventStatus = (event) => {
  const today = new Date();
  const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  if (!event.startDate || !event.endDate) return "Unscheduled";
  if (event.endDate.slice(0, 10) < date) return "Completed";
  return event.startDate.slice(0, 10) > date ? "Upcoming" : "Ongoing";
};

export default function DashboardHome() {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/events");
      if (!Array.isArray(data)) throw new Error("Expected an events array from backend.");
      setEvents(data);
    } catch (err) { setError(err.response || !err.message?.startsWith("Expected") ? apiError(err) : err.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const upcoming = events.filter(e => eventStatus(e) === "Upcoming").sort((a, b) => a.startDate.localeCompare(b.startDate));
  const ongoing = events.filter(e => eventStatus(e) === "Ongoing").length;
  const completed = events.filter(e => eventStatus(e) === "Completed").length;
  const unscheduled = events.filter(e => eventStatus(e) === "Unscheduled").length;
  const stats = [["Total events", events.length, CalendarDays, "violet", "All event records"], ["Upcoming", upcoming.length, Clock3, "blue", "Scheduled ahead"], ["Ongoing", ongoing, ArrowUpRight, "amber", "Happening today"], ["Completed", completed, CircleCheck, "green", "Successfully concluded"]];
  return <section className="overview-page">
    <div className="overview-heading"><div><div className="overview-eyebrow">YOUR WORKSPACE AT A GLANCE</div><h1>Event overview<span>.</span></h1><p>Welcome back, {user?.clientName || user?.name || "Administrator"}. Here’s what’s happening with your events.</p></div><button onClick={load} disabled={loading} className="dashboard-button secondary"><RefreshCw size={16} className={loading ? "animate-spin" : ""} />{loading ? "Refreshing…" : "Refresh data"}</button></div>
    {error ? <div role="alert" className="dashboard-error"><AlertCircle size={20} /><div><strong>Unable to load your events</strong><p>{error}</p></div><button onClick={load} className="dashboard-button secondary">Try again</button></div> : loading ? <div role="status" className="dashboard-loading"><RefreshCw size={23} className="animate-spin" /><p>Loading your event overview…</p></div> : <>
      <div className="dashboard-stats">{stats.map(([label, count, Icon, color, description]) => <article key={label} className="dashboard-stat"><div className="stat-top"><span>{label}</span><span className={`stat-icon ${color}`}><Icon size={20} /></span></div><div className="stat-value">{count.toLocaleString()}</div><p>{description}</p></article>)}</div>
      <div className="overview-grid"><section className="dashboard-panel"><div className="panel-heading"><div><h2>Upcoming events</h2><p>Your next dates, all in one place.</p></div><Link to="/dashboard/events" className="panel-link">View all <ArrowRight size={15} /></Link></div>
        {!upcoming.length ? <div className="dashboard-empty"><span className="empty-icon"><CalendarDays size={28} /></span><h3>Your next event starts here</h3><p>No upcoming events scheduled yet.<br />Create an event to start planning.</p><Link to="/dashboard/events" className="dashboard-button primary">Manage events <ArrowUpRight size={16} /></Link></div> : <div className="upcoming-list">{upcoming.slice(0, 5).map(e => { const date = new Date(`${e.startDate.slice(0, 10)}T12:00:00`); return <Link key={e._id} to={`/dashboard/events/${e._id}`} className="upcoming-row"><span className="event-date"><small>{date.toLocaleDateString("en", { month: "short" })}</small><strong>{date.getDate()}</strong></span><span className="event-summary"><strong>{e.eventName}</strong><span><MapPin size={13} />{[e.venue, e.city].filter(Boolean).join(", ") || "Venue to be confirmed"}</span></span><span className="event-badge">Upcoming</span><ArrowUpRight size={17} className="event-arrow" /></Link>; })}</div>}
      </section><section className="dashboard-panel distribution-panel"><div className="panel-heading"><div><h2>Event breakdown</h2><p>Where your events stand today.</p></div></div><div className="distribution-total"><strong>{events.length}</strong><span>events in your workspace</span></div><div className="distribution-bars">{[["Upcoming", upcoming.length, "blue"], ["Ongoing", ongoing, "amber"], ["Completed", completed, "green"], ...(unscheduled ? [["Unscheduled", unscheduled, "violet"]] : [])].map(([label, count, color]) => <div key={label} className="distribution-item"><div><span><i className={color} />{label}</span><strong>{count}</strong></div><div className="distribution-track"><div className={color} style={{ width: `${events.length ? count / events.length * 100 : 0}%` }} /></div></div>)}</div><p className="distribution-note">Status is based on each event’s start and end dates.</p></section></div>
    </>}
    <div className="dashboard-footer"><span>Eventspace · Event management, made simple.</span><Link to="/dashboard/events">Go to events <ArrowRight size={14} /></Link></div>
  </section>;
}
