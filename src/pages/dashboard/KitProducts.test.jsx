import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KitProducts from './KitProducts';
import { api } from '../../api';
jest.mock('../../api', () => ({ api: { get: jest.fn(), put: jest.fn() }, apiError: () => 'Backend unavailable' }));
jest.mock('../../services/shop', () => ({ shopEnabled: false, money: value => `INR ${value / 100}` }));
test('admin catalogue loads and Add product works without the checkout flag', async () => {
  api.get.mockResolvedValue({ data: [] });
  render(<KitProducts />);
  expect(await screen.findByText('No products yet. Add your first kit product.')).toBeInTheDocument();
  expect(api.get).toHaveBeenCalledWith('/admin/products');
  expect(screen.queryByText(/Backend connection pending/)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '+ Add product' }));
  expect(screen.getByRole('heading', { name: 'Add product' })).toBeInTheDocument();
});

test('archived products can be republished from the catalogue', async () => {
  const product = { id: 'kit-1', name: 'Starter Kit', pricePaise: 100, active: false, archivedAt: '2026-11-24', stock: 8 };
  api.get.mockResolvedValueOnce({ data: [product] })
    .mockResolvedValueOnce({ data: [{ ...product, active: true, archivedAt: null }] });
  api.put.mockResolvedValue({});
  const confirm = jest.spyOn(window, 'confirm').mockReturnValue(true);
  try {
    render(<KitProducts />);
    const button = await screen.findByRole('button', { name: 'Republish' });
    expect(screen.getByText('Archived')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(await screen.findByText('Published')).toBeInTheDocument();
    expect(api.put).toHaveBeenCalledWith('/admin/products/kit-1/republish', {});
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  } finally {
    confirm.mockRestore();
  }
});
