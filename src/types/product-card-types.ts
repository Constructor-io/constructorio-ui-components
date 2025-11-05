import { ComponentOverrideProps, IncludeRenderProps, RenderPropsChildren } from '@/types';

export interface Product {
  id: string;
  name: string;
  variationId?: string;
  description?: string;
  imageUrl?: string;
  price?: string | number;
  salePrice?: string | number;
  rating?: string | number;
  reviewsCount?: string | number;
  tags?: string[];
  slCampaignId?: string;
  slCampaignOwner?: string;
}

export interface ProductCardProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  product: Product;
  priceCurrency?: string;
  addToCartText?: string;
  isInWishlist?: boolean;
  onAddToCart?: (e: React.MouseEvent) => void;
  onAddToWishlist?: (e: React.MouseEvent) => void;
  onProductClick?: () => void;
  children?: RenderPropsChildren<ProductCardProps>;
  componentOverrides?: ProductCardOverrides;
}

export type ProductCardOverrides = ComponentOverrideProps<ProductCardProps> & {
  image?: ComponentOverrideProps<ProductCardProps> & {
    wishlistButton?: ComponentOverrideProps<ProductCardProps>;
  };
  content?: ComponentOverrideProps<ProductCardProps> & {
    title?: ComponentOverrideProps<ProductCardProps>;
    description?: ComponentOverrideProps<ProductCardProps>;
    rating?: ComponentOverrideProps<ProductCardProps>;
    price?: ComponentOverrideProps<ProductCardProps>;
  };
  footer?: ComponentOverrideProps<ProductCardProps> & {
    addToCartButton?: ComponentOverrideProps<ProductCardProps>;
    tags?: ComponentOverrideProps<ProductCardProps>;
  };
};

// Section component interfaces
export interface WishlistButtonProps extends IncludeRenderProps<ProductCardProps> {
  onAddToWishlist?: (e: React.MouseEvent) => void;
  isInWishlist?: boolean;
  className?: string;
}

export interface PriceSectionProps extends IncludeRenderProps<ProductCardProps> {
  price?: string | number;
  priceCurrency?: string;
  salePrice?: string | number;
  className?: string;
}

export interface RatingSectionProps extends IncludeRenderProps<ProductCardProps> {
  rating?: string | number;
  reviewsCount?: string | number;
  className?: string;
}

export interface TagsSectionProps extends IncludeRenderProps<ProductCardProps> {
  tags?: string[];
  className?: string;
}

export interface ImageSectionProps {
  imageUrl?: string;
  name?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface TitleSectionProps extends IncludeRenderProps<ProductCardProps> {
  name?: string;
  className?: string;
}

export interface DescriptionSectionProps extends IncludeRenderProps<ProductCardProps> {
  description?: string;
  className?: string;
}

export interface AddToCartButtonProps extends IncludeRenderProps<ProductCardProps> {
  onAddToCart?: (e: React.MouseEvent) => void;
  addToCartText?: string;
  className?: string;
}
