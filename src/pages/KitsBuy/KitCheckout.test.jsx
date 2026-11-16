import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import KitCheckout from './KitCheckout';
import { api } from '../../api';
import { getProducts, loadCheckout } from '../../services/shop';

jest.mock('../../components/navbar/Navbar', () => () => null);
jest.mock('../../components/Footer/Footer', () => () => null);
jest.mock('../../api', () => ({ api: { post: jest.fn() }, apiError: () => 'Verification failed' }));
jest.mock('../../services/shop', () => ({ shopEnabled: true, getProducts: jest.fn(), loadCheckout: jest.fn(), money: amount => `INR ${amount / 100}` }));
const product = { id: 'motor', name: 'DC Motor', description: 'Robot motor', pricePaise: 50000, stock: 3 };
const order = { id: 'booking_1', razorpayOrderId: 'order_1', keyId: 'rzp_test_public', amount: 50000, currency: 'INR' };
let options;
beforeEach(() => {
  jest.clearAllMocks();
  getProducts.mockResolvedValue([product]);
  loadCheckout.mockResolvedValue();
  Object.defineProperty(window, 'crypto', { configurable: true, value: { randomUUID: () => 'unique-attempt' } });
  window.Razorpay = jest.fn().mockImplementation(value => { options = value; return { on: jest.fn(), open: jest.fn() }; });
});
function mount() { render(<MemoryRouter initialEntries={['/kits-buy/checkout/motor']}><Routes><Route path="/kits-buy/checkout/:productId" element={<KitCheckout />} /></Routes></MemoryRouter>); }
async function submit() {
  await screen.findByText('DC Motor');
  const values = { 'Full name': 'Test Buyer', email: 'buyer@example.com', phone: '9876543210', address: 'Example Street', city: 'Pune', state: 'Maharashtra', 'PIN code': '411001' };
  Object.entries(values).forEach(([label, value]) => fireEvent.change(screen.getByLabelText(label), { target: { value } }));
  fireEvent.click(screen.getByRole('button', { name: 'Pay with Razorpay' }));
  await waitFor(() => expect(window.Razorpay).toHaveBeenCalled());
}
test('sends only product, quantity and delivery to server, then confirms only verified payment', async () => {
  api.post.mockResolvedValueOnce({ data: order }).mockResolvedValueOnce({ data: { id: 'booking_1', status: 'paid', amount: 50000, paymentId: 'pay_1' } });
  mount(); await submit();
  expect(api.post.mock.calls[0][1]).toEqual({ productId: 'motor', quantity: 1, customer: expect.objectContaining({ name: 'Test Buyer' }) });
  expect(api.post.mock.calls[0][1]).not.toHaveProperty('amount');
  expect(screen.queryByText('Booking confirmed')).not.toBeInTheDocument();
  await act(async () => { options.handler({ razorpay_order_id: 'order_1', razorpay_payment_id: 'pay_1', razorpay_signature: 'proof' }); });
  expect(await screen.findByText('Booking confirmed')).toBeInTheDocument();
  expect(api.post).toHaveBeenLastCalledWith('/shop/orders/booking_1/verify', expect.objectContaining({ razorpay_signature: 'proof' }));
});
test('failed verification permits verification retry without another charge', async () => {
  api.post.mockResolvedValueOnce({ data: order }).mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ data: { id: 'booking_1', status: 'paid', amount: 50000, paymentId: 'pay_1' } });
  mount(); await submit();
  await act(async () => { options.handler({ razorpay_payment_id: 'pay_1', razorpay_order_id: 'order_1', razorpay_signature: 'proof' }); });
  const retry = await screen.findByRole('button', { name: 'Retry payment verification' });
  expect(screen.queryByText('Booking confirmed')).not.toBeInTheDocument();
  fireEvent.click(retry);
  await screen.findByText('Booking confirmed');
  expect(window.Razorpay).toHaveBeenCalledTimes(1);
  expect(api.post.mock.calls.filter(([url]) => url === '/shop/orders')).toHaveLength(1);
});
test('out of stock products cannot create an order', async () => {
  getProducts.mockResolvedValue([{ ...product, stock: 0 }]);
  mount(); await screen.findByText('DC Motor');
  expect(screen.getByRole('button', { name: 'Pay with Razorpay' })).toBeDisabled();
  expect(api.post).not.toHaveBeenCalled();
});
test('rejects malformed server payment orders before opening checkout', async () => {
  api.post.mockResolvedValue({ data: { ...order, razorpayOrderId: undefined } });
  mount(); await screen.findByText('DC Motor');
  fireEvent.submit(screen.getByRole('button', { name: 'Pay with Razorpay' }).closest('form'));
  expect(await screen.findByRole('alert')).toHaveTextContent('Invalid payment order');
  expect(window.Razorpay).not.toHaveBeenCalled();
});

test('quantity controls start at one and reject orders above available stock without exposing the count', async () => {
  getProducts.mockResolvedValue([{ ...product, stock: 10, imageUrl: 'https://example.com/kit.png' }]);
  mount(); await screen.findByText('DC Motor');
  expect(screen.getByRole('img', { name: 'DC Motor' })).toHaveAttribute('src', 'https://example.com/kit.png');
  const quantity = screen.getByLabelText('Quantity');
  expect(quantity).toHaveValue(1);
  expect(screen.getByRole('button', { name: 'Decrease quantity' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Increase quantity' }));
  expect(quantity).toHaveValue(2);
  fireEvent.change(quantity, { target: { value: '11' } });
  expect(screen.getByRole('alert')).toHaveTextContent('Not available');
  expect(quantity).not.toHaveAttribute('max');
  expect(screen.getByRole('button', { name: 'Pay with Razorpay' })).toBeDisabled();
  fireEvent.submit(quantity.closest('form'));
  expect(api.post).not.toHaveBeenCalled();
  fireEvent.change(quantity, { target: { value: '10' } });
  expect(screen.getByRole('button', { name: 'Pay with Razorpay' })).toBeEnabled();
});
test('blank quantity and zero prices never show a misleading zero estimated total or permit payment', async () => {
  getProducts.mockResolvedValue([{ ...product, pricePaise: 0 }]);
  mount(); await screen.findByText('DC Motor');
  expect(screen.getByText('Price not available yet')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '' } });
  expect(screen.queryByText('INR 0')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Pay with Razorpay' })).toBeDisabled();
});
