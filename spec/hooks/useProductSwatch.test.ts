import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useProductSwatch } from '@/hooks/useProductSwatch';
import type { Product } from '@/types/productCardTypes';

const baseProduct: Product = {
  id: 'product-1',
  name: 'Base Product',
  imageUrl: 'https://example.com/base.jpg',
  price: '100',
  salePrice: '80',
  variationId: 'var-1',
};

const productWithSwatches: Product = {
  ...baseProduct,
  swatchList: [
    {
      variationId: 'var-1',
      name: 'Red Variant',
      imageUrl: 'https://example.com/red.jpg',
      price: '100',
      swatchPreview: '#FF0000',
    },
    {
      variationId: 'var-2',
      name: 'Blue Variant',
      imageUrl: 'https://example.com/blue.jpg',
      price: '120',
      salePrice: '95',
      swatchPreview: '#0000FF',
    },
    {
      variationId: 'var-3',
      name: 'No Swatch Variant',
      imageUrl: 'https://example.com/none.jpg',
      price: '110',
      swatchPreview: '',
    },
  ],
};

describe('useProductSwatch', () => {
  test('returns empty swatchList when product has no swatchList', () => {
    const { result } = renderHook(() => useProductSwatch(baseProduct));

    expect(result.current.swatchList).toEqual([]);
    expect(result.current.selectedSwatch).toBeUndefined();
  });

  test('returns empty swatchList when product.swatchList is empty', () => {
    const { result } = renderHook(() => useProductSwatch({ ...baseProduct, swatchList: [] }));

    expect(result.current.swatchList).toEqual([]);
  });

  test('builds swatchList from items with truthy swatchPreview only', () => {
    const { result } = renderHook(() => useProductSwatch(productWithSwatches));

    expect(result.current.swatchList).toHaveLength(2);
    expect(result.current.swatchList[0].variationId).toBe('var-1');
    expect(result.current.swatchList[1].variationId).toBe('var-2');
  });

  test('falls back to product name when swatch item has no name', () => {
    const product: Product = {
      ...baseProduct,
      swatchList: [
        {
          variationId: 'var-1',
          swatchPreview: '#FF0000',
        },
      ],
    };

    const { result } = renderHook(() => useProductSwatch(product));

    expect(result.current.swatchList[0].name).toBe('Base Product');
  });

  test('falls back to product price when swatch item has no price', () => {
    const product: Product = {
      ...baseProduct,
      swatchList: [
        {
          variationId: 'var-1',
          swatchPreview: '#FF0000',
        },
      ],
    };

    const { result } = renderHook(() => useProductSwatch(product));

    expect(result.current.swatchList[0].price).toBe('100');
    expect(result.current.swatchList[0].salePrice).toBe('80');
  });

  test('selectSwatch updates selectedSwatch', () => {
    const { result } = renderHook(() => useProductSwatch(productWithSwatches));

    act(() => {
      result.current.selectSwatch(result.current.swatchList[1]);
    });

    expect(result.current.selectedSwatch?.variationId).toBe('var-2');
  });

  test('initial selectedSwatch matches product.variationId', () => {
    const { result } = renderHook(() => useProductSwatch(productWithSwatches));

    expect(result.current.selectedSwatch?.variationId).toBe('var-1');
  });

  test('initial selectedSwatch is undefined when variationId does not match', () => {
    const product: Product = {
      ...productWithSwatches,
      variationId: 'non-existent',
    };

    const { result } = renderHook(() => useProductSwatch(product));

    expect(result.current.selectedSwatch).toBeUndefined();
  });
});
