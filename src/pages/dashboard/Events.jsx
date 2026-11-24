import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, apiError } from "../../api";
import { eventStatus } from "./DashboardHome";

const emptyEvent = { eventName: "", clientName: "", contactNumber: "", email: "", venue: "", city: "", startDate: "", endDate: "" };
export default function Events() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const load = async () => {
    setLoading(true); setError("");
    try {
      const { data } = await api.get("/events");
      if (!Array.isArray(data)) throw new Error("Expected events array");
      setRows(data);
    } catch (err) { setError(apiError(err)); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const filtered = rows.filter(e => [e.eventName, e.clientName, e.city, e.email].some(value => String(value || "").toLowerCase().includes(query.toLowerCase())));
  const pages = Math.max(1, Math.ceil(filtered.length / 8));
  const currentPage = Math.min(page, pages);
  const save = async (event) => {
    event.preventDefault();
    if (form.endDate < form.startDate) return setError("End date must be on or after start date.");
    setSaving(true); setError("");
    const payload = Object.fromEntries(Object.keys(emptyEvent).map(key => [key, form[key]]));
    try {
      if (form._id) await api.put(`/events/${form._id}`, payload);
      else await api.post("/events", payload);
      setForm(null); await load();
    } catch (err) { setError(apiError(err)); }
    finally { setSaving(false); }
  };
  const remove = async (row) => {
    if (!window.confirm(`Delete event "${row.eventName}"?`)) return;
    setDeleting(row._id); setError("");
    try { await api.delete(`/events/${row._id}`); setRows(prev => prev.filter(e => e._id !== row._id)); }
    catch (err) { setError(apiError(err)); }
    finally { setDeleting(null); }
  };
  return <section className="events-page space-y-5">
    <div className="events-page-heading"><h1 className="text-3xl font-bold text-pink-400">Event Requests</h1><p>Manage and review all current event requests</p></div>
    <div className="events-toolbar flex flex-wrap gap-3">
      <input aria-label="Search events" placeholder="Search events..." value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} className="bg-purple-950 border border-purple-600 rounded p-2 flex-1 min-w-0" />
      <button onClick={load} disabled={loading} className="border border-purple-600 rounded px-4">Refresh</button>
      <button onClick={() => { setError(""); setForm({ ...emptyEvent }); }} className="bg-pink-700 rounded px-4 py-2">+ Add event</button>
    </div>
    {error && <p role="alert" className="dashboard-action delete">{error}</p>}
    {loading ? <p role="status">Loading events…</p> : <>
      <div className="overflow-x-auto"><table className="w-full text-left text-sm">
        <thead className="bg-purple-900"><tr>{["Event", "Dates", "Client", "Venue", "Status", "Actions"].map(label => <th key={label} className="p-3">{label}</th>)}</tr></thead>
        <tbody>{filtered.slice((currentPage - 1) * 8, currentPage * 8).map(row => <tr key={row._id} className="border-b border-purple-900">
          <td className="p-3"><Link className="text-pink-300 underline" to={`/dashboard/events/${row._id}`}>{row.eventName}</Link></td>
          <td className="p-3">{row.startDate?.slice(0, 10)} — {row.endDate?.slice(0, 10)}</td>
          <td className="p-3">{row.clientName}<span className="block text-gray-400">{row.email}</span></td>
          <td className="p-3">{row.venue}, {row.city}</td><td className="p-3">{eventStatus(row)}</td>
          <td className="p-3 whitespace-nowrap"><button onClick={() => { setError(""); setForm({ ...row, startDate: row.startDate?.slice(0, 10) || "", endDate: row.endDate?.slice(0, 10) || "" }); }} className="dashboard-action edit mr-3">Edit</button><button disabled={deleting === row._id} onClick={() => remove(row)} className="dashboard-action delete">{deleting === row._id ? "Deleting…" : "Delete"}</button></td>
        </tr>)}</tbody>
      </table></div>
      {!filtered.length && <p className="text-gray-400">{rows.length ? "No matching events." : "No events yet. Create your first event."}</p>}
      <div className="events-pagination flex gap-4 items-center"><button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Previous</button><span>Page {currentPage} of {pages} · {filtered.length} events</span><button disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}>Next</button></div>
    </>}
    {form && <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"><div role="dialog" aria-modal="true" aria-labelledby="event-title" className="bg-white text-gray-900 border border-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <h2 id="event-title" className="text-xl font-bold mb-4">{form._id ? "Edit event" : "Add event"}</h2>
      <form onSubmit={save} className="space-y-3">{Object.keys(emptyEvent).map(key => <label key={key} className="block text-sm">{({ eventName: "Event name", clientName: "Client name", contactNumber: "Contact number", startDate: "Start date", endDate: "End date" })[key] || key}<input required name={key} type={key.includes("Date") ? "date" : key === "email" ? "email" : key === "contactNumber" ? "tel" : "text"} pattern={key === "contactNumber" ? "[0-9]{10}" : undefined} min={key === "endDate" ? form.startDate : undefined} value={form[key] || ""} onChange={e => setForm({ ...form, [key]: e.target.value })} className="block w-full border border-white rounded p-2" /></label>)}
        {error && <p role="alert" className="text-red-700">{error}</p>}
        <div className="flex gap-4"><button disabled={saving} className="bg-purple-700 text-white rounded px-4 py-2">{saving ? "Saving…" : "Save event"}</button><button type="button" disabled={saving} onClick={() => setForm(null)}>Cancel</button></div>
      </form>
    </div></div>}
  </section>;
}
