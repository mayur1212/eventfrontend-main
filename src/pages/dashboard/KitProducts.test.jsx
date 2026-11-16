import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KitProducts from './KitProducts';
import { api } from '../../api';
jest.mock('../../api', () => ({ api: { get: jest.fn() }, apiError: () => 'Backend unavailable' }));
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
