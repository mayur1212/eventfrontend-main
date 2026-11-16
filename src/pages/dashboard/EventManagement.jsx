import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, apiError } from "../../api";
import { eventStatus } from "./DashboardHome";
export default function EventManagement() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    setLoading(true); setError("");
    api.get(`/events/${id}`).then(({ data }) => { if (active) setEvent(data); }).catch(err => { if (active) setError(apiError(err)); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);
  return <section className="space-y-5">
    <Link to="/dashboard/events" className="text-pink-300 underline">← Back to events</Link>
    {loading ? <p role="status">Loading event…</p> : error ? <p role="alert" className="text-red-300">{error}</p> : event && <>
      <h1 className="text-3xl font-bold">{event.eventName}</h1><p className="text-pink-300">{eventStatus(event)}</p>
      <dl className="grid sm:grid-cols-2 gap-5 bg-purple-950 rounded-xl p-6">{["clientName", "email", "contactNumber", "venue", "city", "startDate", "endDate"].map(key => <div key={key}><dt className="text-gray-400">{key}</dt><dd className="mt-1 break-words">{key.includes("Date") ? event[key]?.slice(0, 10) : event[key] || "—"}</dd></div>)}</dl>
      <p className="text-gray-400">Use Edit in the event list to update these details.</p>
    </>}
  </section>;
}
