import { useMemo, useState, useCallback } from 'react';
import type { Product, SwatchItem, ProductSwatchObject } from '@/types/productCardTypes';

export function useProductSwatch(
  { swatchList = [], variationId, id }: Product,
  maxSwatches?: number,
): ProductSwatchObject {
  const [selectedSwatch, setSelectedSwatch] = useState<SwatchItem | undefined>(() =>
    swatchList.find((swatch) => swatch.variationId === variationId),
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const productKey = JSON.stringify([id, variationId ?? null]);
  const [prevProductKey, setPrevProductKey] = useState(productKey);
  if (productKey !== prevProductKey) {
    setPrevProductKey(productKey);
    setSelectedSwatch(swatchList.find((swatch) => swatch.variationId === variationId));
    setIsExpanded(false);
  }

  const onSwatchClick = useCallback((swatch: SwatchItem) => {
    setSelectedSwatch((selectedSwatch) => {
      if (selectedSwatch?.variationId === swatch.variationId) return undefined;
      else return swatch;
    });
  }, []);

  const onViewMoreSwatchesClick = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const { visibleSwatches, hasMoreSwatches } = useMemo(() => {
    if (maxSwatches === undefined || isExpanded) {
      return { visibleSwatches: swatchList, hasMoreSwatches: false };
    }

    const visible = swatchList.slice(0, maxSwatches);
    const hidden = swatchList.slice(maxSwatches);

    return { visibleSwatches: visible, hasMoreSwatches: hidden.length > 0 };
  }, [swatchList, maxSwatches, isExpanded]);

  return {
    selectedSwatch,
    visibleSwatches,
    hasMoreSwatches,
    onSwatchClick,
    onViewMoreSwatchesClick,
  };
}
