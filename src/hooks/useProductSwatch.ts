import { useMemo, useState, useCallback } from 'react';
import type { Product, SwatchItem, ProductSwatchObject } from '@/types/productCardTypes';

function buildSwatchList(product: Product): SwatchItem[] {
  if (!product.swatchList?.length) return [];

  return product.swatchList.reduce<SwatchItem[]>((list, item) => {
    if (item.swatchPreview) {
      list.push({
        name: item.name || product.name,
        url: item.url,
        imageUrl: item.imageUrl || product.imageUrl,
        price: item.price ?? product.price,
        salePrice: item.salePrice ?? product.salePrice,
        swatchPreview: item.swatchPreview,
        variationId: item.variationId,
        rolloverImage: item.rolloverImage,
      });
    }
    return list;
  }, []);
}

export function useProductSwatch(product: Product): ProductSwatchObject {
  const swatchList = useMemo(() => buildSwatchList(product), [product]);

  const [selectedSwatch, setSelectedSwatch] = useState<SwatchItem | undefined>(() =>
    swatchList.find((swatch) => swatch.variationId === product.variationId),
  );

  const selectSwatch = useCallback((swatch: SwatchItem) => {
    setSelectedSwatch(swatch);
  }, []);

  return { swatchList, selectedSwatch, selectSwatch };
}
