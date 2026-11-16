import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, PackageCheck, ShieldCheck } from 'lucide-react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { api, apiError } from '../../api';
import { getProducts, loadCheckout, money } from '../../services/shop';
import { ProductArt } from './KitsBuy';
import './KitsBuy.css';

export default function KitCheckout() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState(null);
  const [paid, setPaid] = useState(null);
  const [verification, setVerification] = useState(null);
  const attempt = useRef(null);
  const locked = useRef(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', postalCode: '', quantity: 1 });
  useEffect(() => { let active = true; getProducts().then(rows => { if (active) setProduct(rows.find(row => String(row.id) === productId)); }).catch(err => { if (active) setError(apiError(err)); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [productId]);
  const verify = async (booking, response) => {
    try {
      const { data } = await api.post(`/shop/orders/${booking.id}/verify`, response);
      if (data.status !== 'paid') throw new Error('Payment is awaiting confirmation. Retry verification; do not pay again.');
      setPaid(data); setVerification(null);
    } catch (err) { setVerification({ booking, response }); setError(err.response ? apiError(err) : 'Payment confirmation is pending. Retry verification without paying again.'); }
    finally { locked.current = false; setBusy(false); }
  };
  const quantity = Number(form.quantity);
  const validPrice = Number.isSafeInteger(product?.pricePaise) && product.pricePaise > 0;
  const validQuantity = Number.isInteger(quantity) && quantity >= 1 && quantity <= 10;
  const stockKnown = Number.isInteger(product?.stock) && product.stock >= 0;
  const unavailable = stockKnown && quantity > product.stock;
  const quantityMessage = unavailable ? 'Not available — the requested quantity is currently unavailable. Please reduce the quantity.' : !validQuantity ? 'Please select a quantity from 1 to 10.' : '';
  const ready = validPrice && validQuantity && stockKnown && !unavailable;
  const changeQuantity = value => {
    attempt.current = null; setOrder(null); setError('');
    setForm(previous => ({ ...previous, quantity: value }));
  };
  const pay = async event => {
    event.preventDefault();
    if (locked.current) return;
    if (!ready) { setError(quantityMessage || 'This product is not available for payment yet.'); return; }
    locked.current = true; setBusy(true); setError('');
    try {
      await loadCheckout();
      if (!attempt.current) attempt.current = window.crypto.randomUUID();
      const { quantity, ...customer } = form;
      const { data } = await api.post('/shop/orders', { productId, quantity: Number(quantity), customer }, { headers: { 'Idempotency-Key': attempt.current } });
      if (!data.id || !data.razorpayOrderId || !data.keyId || !Number.isSafeInteger(data.amount) || data.amount <= 0 || data.currency !== 'INR') throw new Error('Invalid payment order received from server.');
      setOrder(data);
      let submitted = false;
      const checkout = new window.Razorpay({ key: data.keyId, order_id: data.razorpayOrderId, amount: data.amount, currency: data.currency, name: 'Kits Buy', description: product.name,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        handler: response => { submitted = true; setVerification({ booking: data, response }); verify(data, response); },
        modal: { ondismiss: () => { if (!submitted) { locked.current = false; setBusy(false); setError('Checkout closed. You can retry payment for this order.'); } } },
        theme: { color: '#2563eb' }
      });
      checkout.on('payment.failed', () => { setError('Payment failed. Retry within checkout or close it to try again.'); });
      checkout.open();
    } catch (err) { setError(err.response ? apiError(err) : err.message); locked.current = false; setBusy(false); }
  };
  return <div className="kits-page"><Navbar /><section className={`kit-checkout ${paid ? 'kit-checkout-success' : ''}`}>
    <Link className="kit-back-link" to="/kits-buy"><ArrowLeft size={16} aria-hidden="true" /> Back to products</Link>
    {!paid && <><h1 className="text-3xl font-bold mt-5 mb-2">Complete your kit booking</h1><p className="text-slate-500 mb-6">Product → Delivery details → Razorpay payment → Confirmation</p></>}
    {loading ? <p role="status">Loading product…</p> : paid ? <div className="kit-confirmation" role="status" aria-labelledby="kit-confirmation-title">
      <ol className="kit-success-steps" aria-label="Booking progress">{['Details', 'Payment', 'Confirmation'].map(label => <li key={label}><span><Check size={12} aria-hidden="true" /></span>{label}</li>)}</ol>
      <div className="kit-success-intro">
        <div className="kit-success-icon" aria-hidden="true"><CheckCircle2 size={43} strokeWidth={1.6} /></div>
        <span className="kit-success-eyebrow">ALL SET. TIME TO BUILD.</span>
        <h1 id="kit-confirmation-title">Booking confirmed</h1>
        <p>Thank you{form.name ? `, ${form.name}` : ''}! Your payment is complete.<br />Your next robotics adventure starts here.</p>
      </div>
      <div className="kit-success-receipt">
        <div className="kit-success-receipt-header"><span><PackageCheck size={18} aria-hidden="true" /> Your order</span><span className="kit-paid-badge"><Check size={12} aria-hidden="true" /> Payment confirmed</span></div>
        {product && <div className="kit-success-product"><div className="kit-success-thumbnail"><ProductArt product={product} /></div><div><span>ROBOTICS / KITS BUY</span><h2>{product.name}</h2><p>Quantity: {quantity}</p></div></div>}
        <dl className="kit-success-references"><div><dt>Order ID</dt><dd>{paid.id}</dd></div><div><dt>Payment reference</dt><dd>{paid.paymentId}</dd></div></dl>
        <div className="kit-success-total"><div><span>Total paid</span><p><ShieldCheck size={13} aria-hidden="true" /> Payment verified</p></div><strong>{money(paid.amount)}</strong></div>
      </div>
      <div className="kit-success-actions"><Link className="kit-buy" to="/kits-buy">Continue exploring products <ArrowRight size={17} aria-hidden="true" /></Link><p>Need a hand? <Link to="/help/contactus">Contact our team</Link></p></div>
      <p className="kit-success-note">Keep your order ID and payment reference for future enquiries.</p>
    </div> : !product ? <p role="alert">{error || 'Product not found.'}</p> : <form onSubmit={pay} className="kit-checkout-grid">
      <fieldset disabled={busy || !!verification} className="kit-order-panel"><legend className="font-bold text-xl">Delivery details</legend>
        {['name', 'email', 'phone', 'address', 'city', 'state', 'postalCode'].map(key => <label className="kit-field" key={key}>{({ name: 'Full name', postalCode: 'PIN code' })[key] || key}<input required maxLength={key === 'address' ? 500 : 150} autoComplete={({ name: 'name', email: 'email', phone: 'tel', address: 'street-address', city: 'address-level2', state: 'address-level1', postalCode: 'postal-code' })[key]} type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'} pattern={key === 'phone' ? '[6-9][0-9]{9}' : key === 'postalCode' ? '[1-9][0-9]{5}' : undefined} value={form[key]} onChange={e => { attempt.current = null; setOrder(null); setForm({ ...form, [key]: e.target.value }); }} /></label>)}
      </fieldset>
      <div className="kit-order-panel"><span className="kits-eyebrow">ORDER SUMMARY</span><div className="kit-summary-image"><ProductArt product={product} /></div><h2 className="text-2xl font-bold my-4">{product.name}</h2><p>{product.description}</p>
        <label className="kit-field" htmlFor="kit-quantity">Quantity</label>
        <div className="kit-quantity-controls">
          <button type="button" aria-label="Decrease quantity" disabled={busy || !!verification || quantity <= 1} onClick={() => changeQuantity(Math.max(1, quantity - 1))}>−</button>
          <input id="kit-quantity" type="number" required min="1" step="1" inputMode="numeric" aria-invalid={!!quantityMessage} aria-describedby={quantityMessage ? 'kit-quantity-error' : undefined} disabled={busy || !!verification} value={form.quantity} onChange={e => changeQuantity(e.target.value)} />
          <button type="button" aria-label="Increase quantity" disabled={busy || !!verification || !validQuantity || quantity >= 10} onClick={() => changeQuantity(quantity + 1)}>+</button>
        </div>
        {quantityMessage && <p id="kit-quantity-error" role="alert" className="my-3 text-amber-700">{quantityMessage}</p>}
        <p className="mt-5 text-sm text-slate-500">Product price: <strong>{validPrice ? money(product.pricePaise) : 'Price not available yet'}</strong></p>
        <p className="my-4">Estimated product total: <strong>{validPrice && validQuantity ? money(product.pricePaise * quantity) : '—'}</strong></p>
        <p className="text-sm text-slate-500">Final tax and delivery charges are calculated by the server and shown in Razorpay before payment.</p>
        {order && <p className="my-3">Order: {order.id}<br />Final total: {money(order.amount)}</p>}
        {!validPrice && <p className="my-4 text-amber-700">Payment is unavailable until a valid product price is configured.</p>}
        {!stockKnown && <p className="my-4 text-amber-700">Product availability could not be confirmed. Please try again later.</p>}
        {error && <p role="alert" className="my-4 text-red-700">{error}</p>}
        {verification ? <button type="button" className="kit-buy mt-5" disabled={busy} onClick={() => { locked.current = true; setBusy(true); setError(''); verify(verification.booking, verification.response); }}>{busy ? 'Verifying payment…' : 'Retry payment verification'}</button> : <button className="kit-buy mt-5" disabled={!ready || busy}>{busy ? 'Processing payment…' : 'Pay with Razorpay'}</button>}
      </div>
    </form>}
  </section><Footer /></div>;
}
