import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useProductSwatch } from '@/hooks/useProductSwatch';
import type { Product, SwatchItem } from '@/types/productCardTypes';

const mockSwatchList: SwatchItem[] = [
  {
    variationId: 'var-red',
    name: 'Red Variant',
    imageUrl: 'https://example.com/red.jpg',
    price: '90',
    swatchPreview: '#e04062',
  },
  {
    variationId: 'var-green',
    name: 'Green Variant',
    imageUrl: 'https://example.com/green.jpg',
    price: '99',
    salePrice: '75',
    swatchPreview: '#a3c43b',
  },
  {
    variationId: 'var-blue',
    name: 'Blue Variant',
    imageUrl: 'https://example.com/blue.jpg',
    price: '95',
    swatchPreview: '#3b82f6',
  },
  {
    variationId: 'var-black',
    name: 'Black Variant',
    imageUrl: 'https://example.com/black.jpg',
    price: '90',
    swatchPreview: '#1a1a1a',
  },
  {
    variationId: 'var-white',
    name: 'White Variant',
    imageUrl: 'https://example.com/white.jpg',
    price: '90',
    swatchPreview: '#f5f5f5',
  },
];

const mockProduct: Product = {
  id: 'test-product',
  name: 'Test Product',
  variationId: 'var-red',
  swatchList: mockSwatchList,
};

describe('useProductSwatch', () => {
  test('selects swatch matching product variationId on mount', () => {
    const { result } = renderHook(() => useProductSwatch(mockProduct));

    expect(result.current.selectedSwatch).toEqual(mockSwatchList[0]);
    expect(result.current.visibleSwatches).toEqual(mockSwatchList);
    expect(result.current.hasMoreSwatches).toBe(false);
  });

  test('returns empty state when product has no swatch data', () => {
    const noSwatchList: Product = { id: 'p1', name: 'P1' };
    const emptySwatchList: Product = { id: 'p2', name: 'P2', swatchList: [] };

    const { result: r1 } = renderHook(() => useProductSwatch(noSwatchList));
    const { result: r2 } = renderHook(() => useProductSwatch(emptySwatchList));

    expect(r1.current.visibleSwatches).toEqual([]);
    expect(r1.current.selectedSwatch).toBeUndefined();
    expect(r2.current.visibleSwatches).toEqual([]);
    expect(r2.current.selectedSwatch).toBeUndefined();
  });

  test('selecting a swatch updates selection, switching and deselecting works', () => {
    const product: Product = { id: 'p1', name: 'P1', swatchList: mockSwatchList };
    const { result } = renderHook(() => useProductSwatch(product));

    // Select first swatch
    act(() => { result.current.onSwatchClick(mockSwatchList[0]); });
    expect(result.current.selectedSwatch).toEqual(mockSwatchList[0]);

    // Switch to another swatch
    act(() => { result.current.onSwatchClick(mockSwatchList[2]); });
    expect(result.current.selectedSwatch).toEqual(mockSwatchList[2]);

    // Deselect by clicking same swatch
    act(() => { result.current.onSwatchClick(mockSwatchList[2]); });
    expect(result.current.selectedSwatch).toBeUndefined();
  });

  test('limits visible swatches when maxSwatches is provided', () => {
    const { result } = renderHook(() => useProductSwatch(mockProduct, 3));

    expect(result.current.visibleSwatches).toHaveLength(3);
    expect(result.current.visibleSwatches).toEqual(mockSwatchList.slice(0, 3));
    expect(result.current.hasMoreSwatches).toBe(true);
  });

  test('onViewMoreSwatchesClick expands to show all swatches', () => {
    const { result } = renderHook(() => useProductSwatch(mockProduct, 3));

    expect(result.current.visibleSwatches).toHaveLength(3);

    act(() => { result.current.onViewMoreSwatchesClick(); });

    expect(result.current.visibleSwatches).toHaveLength(5);
    expect(result.current.hasMoreSwatches).toBe(false);
  });
});
