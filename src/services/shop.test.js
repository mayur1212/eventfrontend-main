import { api } from '../api';
import { getProducts } from './shop';
jest.mock('../api', () => ({ api: { get: jest.fn() } }));
beforeEach(() => jest.clearAllMocks());
test('catalogue loads backend product details', async () => {
  api.get.mockResolvedValue({ data: [{ id: 'backend-product', name: 'Dashboard Motor', pricePaise: 45000, stock: 8, features: ['Metal gearbox'] }] });
  expect(await getProducts()).toEqual([expect.objectContaining({ id: 'backend-product', name: 'Dashboard Motor', pricePaise: 45000, stock: 8 })]);
  expect(api.get).toHaveBeenCalledWith('/products');
});
test('empty backend catalogue stays empty', async () => {
  api.get.mockResolvedValue({ data: [] });
  expect(await getProducts()).toEqual([]);
});
test('backend failure is surfaced without static products', async () => {
  api.get.mockRejectedValue(new Error('offline'));
  await expect(getProducts()).rejects.toThrow('offline');
});
