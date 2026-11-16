import { api } from '../api';

export const shopEnabled = process.env.REACT_APP_SHOP_API_ENABLED === 'true';
export const money = amount => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount / 100);
export const normalizeProduct = product => ({ ...product, id: product.id || product._id, kind: product.kind || 'hub', color: product.color || 'blue', features: product.features || [] });
export async function getProducts() {
  const { data } = await api.get('/products');
  if (!Array.isArray(data)) throw new Error('Invalid product response');
  return data.map(normalizeProduct);
}

let checkoutScript;
export function loadCheckout() {
  if (window.Razorpay) return Promise.resolve();
  if (!checkoutScript) checkoutScript = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const timer = setTimeout(() => { script.remove(); checkoutScript = null; reject(new Error('Payment checkout timed out. Please retry.')); }, 20000);
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => { clearTimeout(timer); resolve(); };
    script.onerror = () => { clearTimeout(timer); script.remove(); checkoutScript = null; reject(new Error('Unable to load Razorpay. Please retry.')); };
    document.body.appendChild(script);
  });
  return checkoutScript;
}
