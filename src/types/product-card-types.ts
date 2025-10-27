import { CardContentOverrides, CardFooterOverrides } from '@/components/card';
import { ComponentOverrideProps, RenderPropsChildren } from '@/types';

export interface ProductCardProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  children?: RenderPropsChildren<ProductCardProps> | React.ReactNode;
  itemId: string;
  itemName: string;
  itemVariationId?: string;
  itemDescription?: string;
  itemImageUrl?: string;
  itemPrice?: string | number;
  itemPriceCurrency?: string;
  itemSalePrice?: string | number;
  itemRating?: string | number;
  itemReviewsCount?: string | number;
  itemTags?: string[];
  addToCartText?: string;
  itemSlCampaignId?: string;
  itemSlCampaignOwner?: string;
  isInWishlist?: boolean;
  onAddToCart?: (e: React.MouseEvent) => void;
  onAddToWishlist?: (e: React.MouseEvent) => void;
  onItemClick?: () => void;
  componentOverrides?: ProductCardOverrides;
}

export type ProductCardOverrides = ComponentOverrideProps<ProductCardProps> & {
  image?: ComponentOverrideProps<ProductCardProps>;
  content?: CardContentOverrides;
  footer?: CardFooterOverrides;
  wishlistButton?: ComponentOverrideProps<ProductCardProps>;
  addToCartButton?: ComponentOverrideProps<ProductCardProps>;
  price?: ComponentOverrideProps<ProductCardProps>;
  title?: ComponentOverrideProps<ProductCardProps>;
  description?: ComponentOverrideProps<ProductCardProps>;
  rating?: ComponentOverrideProps<ProductCardProps>;
  tags?: ComponentOverrideProps<ProductCardProps>;
};

// Section component interfaces
export interface WishlistButtonProps {
  componentOverrides?: ComponentOverrideProps<ProductCardProps>;
  onAddToWishlist?: (e: React.MouseEvent) => void;
  isInWishlist?: boolean;
  className?: string;
}

export interface PriceSectionProps {
  componentOverrides?: ComponentOverrideProps<ProductCardProps>;
  itemPrice?: string | number;
  itemPriceCurrency?: string;
  itemSalePrice?: string | number;
  children?: React.ReactNode;
  className?: string;
}

export interface RatingSectionProps {
  componentOverrides?: ComponentOverrideProps<ProductCardProps>;
  itemRating?: string | number;
  itemReviewsCount?: string | number;
  children?: React.ReactNode;
  className?: string;
}

export interface TagsSectionProps {
  componentOverrides?: ComponentOverrideProps<ProductCardProps>;
  itemTags?: string[];
  children?: React.ReactNode;
  className?: string;
}

export interface ImageSectionProps {
  componentOverrides?: ComponentOverrideProps<ProductCardProps>;
  itemImageUrl?: string;
  itemName?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface TitleSectionProps {
  componentOverrides?: ComponentOverrideProps<ProductCardProps>;
  itemName?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface DescriptionSectionProps {
  componentOverrides?: ComponentOverrideProps<ProductCardProps>;
  itemDescription?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface AddToCartButtonProps {
  componentOverrides?: ComponentOverrideProps<ProductCardProps>;
  onAddToCart?: (e: React.MouseEvent) => void;
  addToCartText?: string;
  className?: string;
}
