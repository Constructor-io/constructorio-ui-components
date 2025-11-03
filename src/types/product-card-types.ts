import { ComponentOverrideProps, IncludeRenderProps, RenderPropsChildren } from '@/types';

export interface Product {
  itemId: string;
  itemName: string;
  itemVariationId?: string;
  itemDescription?: string;
  itemImageUrl?: string;
  itemPrice?: string | number;
  itemSalePrice?: string | number;
  itemRating?: string | number;
  itemReviewsCount?: string | number;
  itemTags?: string[];
  itemSlCampaignId?: string;
  itemSlCampaignOwner?: string;
}

export interface ProductCardProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  product: Product;
  itemPriceCurrency?: string;
  addToCartText?: string;
  isInWishlist?: boolean;
  onAddToCart?: (e: React.MouseEvent) => void;
  onAddToWishlist?: (e: React.MouseEvent) => void;
  onItemClick?: () => void;
  children?: RenderPropsChildren<ProductCardProps>;
  componentOverrides?: ProductCardOverrides;
}

export type ProductCardOverrides = ComponentOverrideProps<ProductCardProps> & {
  image?: ComponentOverrideProps<ProductCardProps>;
  content?: ComponentOverrideProps<ProductCardProps>;
  footer?: ComponentOverrideProps<ProductCardProps>;
  wishlistButton?: ComponentOverrideProps<ProductCardProps>;
  addToCartButton?: ComponentOverrideProps<ProductCardProps>;
  price?: ComponentOverrideProps<ProductCardProps>;
  title?: ComponentOverrideProps<ProductCardProps>;
  description?: ComponentOverrideProps<ProductCardProps>;
  rating?: ComponentOverrideProps<ProductCardProps>;
  tags?: ComponentOverrideProps<ProductCardProps>;
};

// Section component interfaces
export interface WishlistButtonProps extends IncludeRenderProps<ProductCardProps> {
  onAddToWishlist?: (e: React.MouseEvent) => void;
  isInWishlist?: boolean;
  className?: string;
}

export interface PriceSectionProps extends IncludeRenderProps<ProductCardProps> {
  itemPrice?: string | number;
  itemPriceCurrency?: string;
  itemSalePrice?: string | number;
  className?: string;
}

export interface RatingSectionProps extends IncludeRenderProps<ProductCardProps> {
  itemRating?: string | number;
  itemReviewsCount?: string | number;
  className?: string;
}

export interface TagsSectionProps extends IncludeRenderProps<ProductCardProps> {
  itemTags?: string[];
  className?: string;
}

export interface ImageSectionProps {
  itemImageUrl?: string;
  itemName?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface TitleSectionProps extends IncludeRenderProps<ProductCardProps> {
  itemName?: string;
  className?: string;
}

export interface DescriptionSectionProps extends IncludeRenderProps<ProductCardProps> {
  itemDescription?: string;
  className?: string;
}

export interface AddToCartButtonProps extends IncludeRenderProps<ProductCardProps> {
  onAddToCart?: (e: React.MouseEvent) => void;
  addToCartText?: string;
  className?: string;
}
