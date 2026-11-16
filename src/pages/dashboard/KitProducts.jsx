import React, { useEffect, useRef, useState } from 'react';
import { api, apiError } from '../../api';
import { money } from '../../services/shop';
import { PackagePlus, X, Save, Layers3 } from 'lucide-react';

function ProductDialog({ children, saving, close }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (dialog.showModal) dialog.showModal();
    else dialog.setAttribute('open', '');
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);
  return <dialog ref={ref} className="product-modal" aria-labelledby="product-modal-title" aria-describedby="product-modal-description" onCancel={event => { event.preventDefault(); if (!saving) close(); }} onClick={event => { if (event.target === ref.current && !saving) { const bounds = ref.current.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close(); } }}>{children}</dialog>;
}

const blank = { name: '', category: 'Motion', description: '', use: '', imageUrl: '', price: '', stock: '0', active: true, kind: 'hub', color: 'blue', features: '' };
export default function KitProducts() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState('');
  const load = async () => {
    setLoading(true); setError('');
    try { const { data } = await api.get('/admin/products'); if (!Array.isArray(data)) throw new Error('Invalid product response'); setRows(data); }
    catch (err) { setError(apiError(err)); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const save = async event => {
    event.preventDefault(); setSaving(true); setError('');
    try {
      const pricePaise = Math.round(Number(form.price) * 100);
      if (!Number.isSafeInteger(pricePaise) || pricePaise <= 0 || !Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) throw new Error('Enter a valid price and whole-number stock.');
      const { id } = form;
      const fields = Object.fromEntries(['name', 'category', 'description', 'use', 'imageUrl', 'active', 'kind', 'color'].map(key => [key, form[key]]));
      const payload = { ...fields, pricePaise, stock: Number(form.stock), features: form.features.split('\n').map(value => value.trim()).filter(Boolean) };
      if (id) await api.put(`/admin/products/${id}`, payload); else await api.post('/admin/products', payload);
      setForm(null); await load();
    } catch (err) { setError(err.response ? apiError(err) : err.message); } finally { setSaving(false); }
  };
  const remove = async row => {
    if (!window.confirm(`Archive ${row.name}? It will be removed from the public catalogue. Existing orders will be retained.`)) return;
    setSaving(true); setError('');
    try { await api.delete(`/admin/products/${row.id || row._id}`); await load(); } catch (err) { setError(apiError(err)); } finally { setSaving(false); }
  };
  return <section className="space-y-5"><div className="flex flex-wrap justify-between gap-4"><div><h1 className="text-3xl font-bold">Kit Products</h1><p className="mt-2">Manage products, pricing and stock for Kits Buy.</p></div><button disabled={saving || !!form} className="dashboard-button primary" onClick={() => { setError(''); setForm({ ...blank }); }}>+ Add product</button></div>
    
    {error && !form && <p role="alert" className="p-3 border border-red-400 rounded">{error}</p>}
    <div className="flex gap-3"><input aria-label="Search kit products" placeholder="Search products" value={query} onChange={e => setQuery(e.target.value)} className="bg-transparent border rounded p-2 flex-1 min-w-0" /><button onClick={load} disabled={loading}>Refresh</button></div>
    {loading ? <p role="status">Loading products…</p> : <div className="overflow-auto"><table className="w-full text-left"><thead><tr>{['Product', 'Category', 'Price', 'Stock', 'Visibility', 'Actions'].map(text => <th className="p-3" key={text}>{text}</th>)}</tr></thead><tbody>{rows.filter(row => row.name.toLowerCase().includes(query.toLowerCase())).map(row => <tr className="border-t border-white/20" key={row.id || row._id}><td className="p-3">{row.name}</td><td className="p-3">{row.category}</td><td className="p-3">{money(row.pricePaise)}</td><td className="p-3">{row.stock}</td><td className="p-3">{row.active ? 'Published' : 'Hidden'}</td><td className="p-3"><button disabled={saving} className="mr-4 underline" onClick={() => { setError(''); setForm({ ...blank, ...row, id: row.id || row._id, price: (row.pricePaise / 100).toFixed(2), features: (row.features || []).join('\n') }); }}>Edit</button><button disabled={saving} className="underline" onClick={() => remove(row)}>Archive</button></td></tr>)}</tbody></table>{!error && !rows.length && <p className="p-4">No products yet. Add your first kit product.</p>}</div>}
    {form && <ProductDialog saving={saving} close={() => setForm(null)}><form onSubmit={save} className="product-modal-form">
      <header className="product-modal-header"><div className="product-modal-symbol"><PackagePlus size={24} aria-hidden="true" /></div><div><span className="product-modal-eyebrow">KITS BUY / CATALOGUE</span><h2 id="product-modal-title">{form.id ? 'Edit product' : 'Add product'}</h2><p id="product-modal-description">Bring your next robotics essential to the store.</p></div><button type="button" className="product-modal-close" aria-label="Close product form" disabled={saving} onClick={() => setForm(null)}><X size={20} /></button></header>
      <div className="product-modal-body">
      {error && <p role="alert" className="product-modal-error">{error}</p>}
      <div className="product-modal-section"><Layers3 size={15} aria-hidden="true" /> Product information <span>All fields required unless marked optional</span></div>
      <div className="product-modal-grid">
      {['name', 'description', 'use', 'imageUrl', 'price', 'stock'].map(key => <label className={`kit-field ${['name', 'description', 'use', 'imageUrl'].includes(key) ? 'product-field-wide' : ''}`} key={key}>{({ use: 'Use / उपयोग', imageUrl: 'Image URL (optional)', price: 'Price in INR', stock: 'Stock quantity' })[key] || key}<input autoFocus={key === 'name'} placeholder={({ name: 'e.g. Robotics Starter Kit', description: 'Describe the product and what is included', use: 'Explain what this product is used for', imageUrl: 'https://example.com/product.jpg', price: '0.00', stock: '0' })[key]} required={key !== 'imageUrl'} maxLength={key === 'description' ? 2000 : 500} type={key === 'imageUrl' ? 'url' : ['price', 'stock'].includes(key) ? 'number' : 'text'} min={key === 'price' ? '0.01' : key === 'stock' ? '0' : undefined} step={key === 'price' ? '0.01' : key === 'stock' ? '1' : undefined} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} disabled={saving} /></label>)}
      <label className="kit-field">Category<select value={form.category} disabled={saving} onChange={e => setForm({ ...form, category: e.target.value })}>{['Motion', 'Electronics', 'Structure'].map(category => <option className="text-black" key={category}>{category}</option>)}</select></label>
      <label className="kit-field product-field-wide">Features (one per line)<textarea rows={3} placeholder={"DC motors and servo motors\nWheels, gears and structural parts"} disabled={saving} value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} /></label>
      </div>
      <label className="product-publish"><input type="checkbox" disabled={saving} checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} /><span><strong>Publish in Kits Buy</strong><small>Make this product visible in the public catalogue.</small></span></label>
      </div>
      <footer className="product-modal-footer"><span>Stock counts are visible to admins only.</span><div><button className="product-modal-cancel" type="button" disabled={saving} onClick={() => setForm(null)}>Cancel</button><button className="product-modal-save" disabled={saving}><Save size={16} aria-hidden="true" />{saving ? 'Saving…' : 'Save product'}</button></div></footer>
    </form></ProductDialog>}

  </section>;
}
