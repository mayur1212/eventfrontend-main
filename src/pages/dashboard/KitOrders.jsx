import React, { useEffect, useState } from 'react';
import { api, apiError } from '../../api';
import { money } from '../../services/shop';
export default function KitOrders() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const load = async () => {
    setLoading(true); setError('');
    try { const { data } = await api.get('/admin/shop/orders'); if (!Array.isArray(data)) throw new Error('Invalid orders response'); setRows(data); }
    catch (err) { setError(apiError(err)); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  return <section className="space-y-5"><div className="flex justify-between"><h1 className="text-3xl font-bold">Kit Orders</h1><button disabled={loading} onClick={load}>Refresh</button></div><p>Track product bookings and verified payment status.</p>{error && <p role="alert">{error}</p>}{loading ? <p role="status">Loading orders…</p> : <div className="overflow-auto"><table className="w-full text-left text-sm"><thead><tr>{['Order', 'Product', 'Customer / delivery', 'Total', 'Payment', 'Date'].map(label => <th className="p-3" key={label}>{label}</th>)}</tr></thead><tbody>{rows.map(row => <tr className="border-t border-white/20" key={row.id}><td className="p-3">{row.id}<span className="block">{row.paymentId}</span></td><td className="p-3">{row.productName} × {row.quantity}</td><td className="p-3">{row.customer.name}<br />{row.customer.email}<br />{row.customer.phone}<br />{row.customer.address}, {row.customer.city}, {row.customer.state} {row.customer.postalCode}</td><td className="p-3">{money(row.amount)}</td><td className="p-3">{row.status}</td><td className="p-3">{new Date(row.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>)}</tbody></table>{!error && !rows.length && <p className="p-4">No kit orders yet.</p>}</div>}</section>;
}
