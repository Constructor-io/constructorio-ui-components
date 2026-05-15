import { Product, SwatchItem } from '@/types/productCardTypes';

export function getDisplayProduct(product: Product, selectedSwatch?: SwatchItem): Product {
  if (!selectedSwatch) return product;
  return {
    ...product,
    name: selectedSwatch.name || product.name,
    imageUrl: selectedSwatch.imageUrl || product.imageUrl,
    price: selectedSwatch.price ?? product.price,
    salePrice: selectedSwatch.salePrice ?? product.salePrice,
    variationId: selectedSwatch.variationId || product.variationId,
  };
}
