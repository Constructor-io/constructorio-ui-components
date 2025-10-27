import React, { createContext, useContext } from 'react';
import RenderPropsWrapper from './RenderPropsWrapper';
import { cn } from '@/lib/utils';
import { Card, CardContentProps, CardFooterProps } from '@/components/card';
import Button from '@/components/button';
import Heart from '../assets/heart.svg';
import HeartFilled from '../assets/heart-filled.svg';
import {
  AddToCartButtonProps,
  DescriptionSectionProps,
  ImageSectionProps,
  PriceSectionProps,
  ProductCardProps,
  ProductCardOverrides,
  RatingSectionProps,
  TagsSectionProps,
  TitleSectionProps,
  WishlistButtonProps,
} from '@/types/product-card-types';

// Context for sharing ProductCard data
interface ProductCardContextValue {
  renderProps: ProductCardProps;
  componentOverrides?: ProductCardOverrides;
}

const ProductCardContext = createContext<ProductCardContextValue | null>(null);

const useProductCardContext = () => {
  const context = useContext(ProductCardContext);
  if (!context) {
    throw new Error('ProductCard components must be used within ProductCard');
  }
  return context;
};

const WishlistButton: React.FC<WishlistButtonProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();

  // Use props with fallback to context values
  const onAddToWishlist = props.onAddToWishlist || renderProps.onAddToWishlist;
  const isInWishlist = props.isInWishlist ?? renderProps.isInWishlist;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={
        componentOverrides?.wishlistButton?.reactNode || props.componentOverrides?.reactNode
      }>
      {onAddToWishlist && (
        <Button
          className={cn(
            'absolute top-2 sm:top-4 right-2 sm:right-[22px] bg-white size-6 sm:size-[18px]',
            props.className,
          )}
          size='icon'
          variant='secondary'
          conversionType='add_to_wishlist'
          onClick={onAddToWishlist}>
          <img
            src={isInWishlist ? HeartFilled : Heart}
            className='w-3 h-3 sm:w-[9px] sm:[9px]'
            alt='add-to-wishlist'
          />
        </Button>
      )}
    </RenderPropsWrapper>
  );
};

const PriceSection: React.FC<PriceSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { itemPrice, itemPriceCurrency, itemSalePrice } = renderProps;

  // Use props with fallback to context values
  const price = props.itemPrice ?? itemPrice;
  const priceCurrency = props.itemPriceCurrency || itemPriceCurrency;
  const salePrice = props.itemSalePrice ?? itemSalePrice;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={componentOverrides?.price?.reactNode || props.componentOverrides?.reactNode}>
      {price && (
        <div className={cn('flex items-baseline gap-2', props.className)}>
          <span className='text-lg font-bold'>
            {priceCurrency}&nbsp;
            {salePrice || price}
          </span>
          {salePrice && (
            <span className='text-sm text-gray-400 line-through'>
              {priceCurrency}&nbsp;
              {price}
            </span>
          )}
        </div>
      )}
    </RenderPropsWrapper>
  );
};

const RatingSection: React.FC<RatingSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { itemRating, itemReviewsCount } = renderProps;

  // Use props with fallback to context values
  const rating = props.itemRating ?? itemRating;
  const reviewsCount = props.itemReviewsCount ?? itemReviewsCount;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={componentOverrides?.rating?.reactNode || props.componentOverrides?.reactNode}>
      {(rating || reviewsCount) && (
        <div
          className={cn('flex justify-between gap-1 text-sm text-gray-500 py-2', props.className)}>
          {rating && <span>⭐ {rating}</span>}
          {reviewsCount && <span>{reviewsCount} reviews</span>}
        </div>
      )}
    </RenderPropsWrapper>
  );
};

const TagsSection: React.FC<TagsSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { itemTags } = renderProps;

  // Use props with fallback to context values
  const tags = props.itemTags || itemTags;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={componentOverrides?.tags?.reactNode || props.componentOverrides?.reactNode}>
      <div className={cn('flex flex-col gap-1 items-center', props.className)}>
        {tags &&
          tags.map((tag) => (
            <span key={tag} className='text-xs text-gray-500'>
              {tag}
            </span>
          ))}
      </div>
    </RenderPropsWrapper>
  );
};

const ImageSection: React.FC<ImageSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { itemImageUrl, itemName } = renderProps;

  // Use props with fallback to context values
  const imageUrl = props.itemImageUrl || itemImageUrl;
  const name = props.itemName || itemName;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={componentOverrides?.image?.reactNode || props.componentOverrides?.reactNode}>
      <div className={cn('relative', props.className)}>
        <img
          src={imageUrl}
          alt={name || 'product image'}
          width='100%'
          height={224}
          className='object-cover w-full h-[224px] rounded-2xl'
        />
        {props.children}
      </div>
    </RenderPropsWrapper>
  );
};

const TitleSection: React.FC<TitleSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { itemName } = renderProps;

  // Use props with fallback to context values
  const name = props.itemName || itemName;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={componentOverrides?.title?.reactNode || props.componentOverrides?.reactNode}>
      <p className={cn('text-base font-medium', props.className)}>{name}</p>
    </RenderPropsWrapper>
  );
};

const DescriptionSection: React.FC<DescriptionSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { itemDescription } = renderProps;

  // Use props with fallback to context values
  const description = props.itemDescription || itemDescription;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={componentOverrides?.description?.reactNode || props.componentOverrides?.reactNode}>
      {description && <p className={cn('text-sm text-gray-500', props.className)}>{description}</p>}
    </RenderPropsWrapper>
  );
};

const AddToCartButton: React.FC<AddToCartButtonProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();

  // Use props with fallback to context values
  const onAddToCart = props.onAddToCart || renderProps.onAddToCart;
  const addToCartText = props.addToCartText || renderProps.addToCartText;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={
        componentOverrides?.addToCartButton?.reactNode || props.componentOverrides?.reactNode
      }>
      {onAddToCart && (
        <Button
          className={cn('w-full bg-black hover:bg-gray-800 text-white text-sm', props.className)}
          conversionType='add_to_cart'
          onClick={onAddToCart}>
          {addToCartText}
        </Button>
      )}
    </RenderPropsWrapper>
  );
};

const ProductCardContent: React.FC<CardContentProps> = (props) => {
  const { componentOverrides } = useProductCardContext();

  return (
    <Card.Content
      className={cn('flex flex-col gap-1', props.className)}
      componentOverrides={componentOverrides?.footer || props.componentOverrides}
      {...props}
    />
  );
};

const ProductCardFooter: React.FC<CardFooterProps> = (props) => {
  const { componentOverrides } = useProductCardContext();

  return (
    <Card.Footer
      className={cn('flex flex-col gap-2', props.className)}
      componentOverrides={componentOverrides?.footer || props.componentOverrides}
      {...props}
    />
  );
};

function ProductCard({ componentOverrides, children, className, ...props }: ProductCardProps) {
  const {
    itemId,
    itemName,
    itemVariationId,
    itemPrice,
    itemPriceCurrency = '$',
    itemSalePrice,
    addToCartText = 'Add to Cart',
    itemSlCampaignId,
    itemSlCampaignOwner,
    isInWishlist = false,
    onAddToCart,
    onAddToWishlist,
    onItemClick,
    itemTags,
  } = props || {};

  const renderProps = React.useMemo(
    () => ({
      ...props,
      // Explicitly pass any prop with a default value here,
      // so that the value is available in render props:
      itemPriceCurrency,
      addToCartText,
      isInWishlist,
      // Ensure callbacks are available in renderProps
      onAddToCart,
      onAddToWishlist,
    }),
    [props, itemPriceCurrency, addToCartText, isInWishlist, onAddToCart, onAddToWishlist],
  );

  const contextValue = React.useMemo(
    () => ({
      renderProps,
      componentOverrides,
    }),
    [renderProps, componentOverrides],
  );

  // If children are provided, use compound component pattern
  if (children && typeof children !== 'function') {
    return (
      <ProductCardContext.Provider value={contextValue}>
        <Card
          className={cn('min-w-[176px] max-w-[256px] cursor-pointer', className)}
          onClick={onItemClick}
          externalRenderProps={renderProps}
          data-cnstrc-item-id={itemId}
          data-cnstrc-item-variation-id={itemVariationId}
          data-cnstrc-item-name={itemName}
          data-cnstrc-item-price={itemSalePrice || itemPrice}
          data-cnstrc-sl-campaign-id={itemSlCampaignId}
          data-cnstrc-sl-campaign-owner={itemSlCampaignOwner}>
          {children}
        </Card>
      </ProductCardContext.Provider>
    );
  }

  // Default layout when no children provided or render prop function
  return (
    <ProductCardContext.Provider value={contextValue}>
      <RenderPropsWrapper props={renderProps} override={children || componentOverrides?.reactNode}>
        <Card
          className={cn('min-w-[176px] max-w-[256px] cursor-pointer', className)}
          onClick={onItemClick}
          externalRenderProps={renderProps}
          data-cnstrc-item-id={itemId}
          data-cnstrc-item-variation-id={itemVariationId}
          data-cnstrc-item-name={itemName}
          data-cnstrc-item-price={itemSalePrice || itemPrice}
          data-cnstrc-sl-campaign-id={itemSlCampaignId}
          data-cnstrc-sl-campaign-owner={itemSlCampaignOwner}>
          {/* Image Section */}
          <ImageSection>
            {/* Badge */}
            {/* <Badge /> */}
            <WishlistButton />
          </ImageSection>

          {/* Content Section */}
          <ProductCardContent>
            <PriceSection />
            <TitleSection />
            <DescriptionSection />
            <RatingSection />
          </ProductCardContent>

          {/* Footer Section */}
          {(onAddToCart || itemTags) && (
            <ProductCardFooter>
              <AddToCartButton />
              <TagsSection />
            </ProductCardFooter>
          )}
        </Card>
      </RenderPropsWrapper>
    </ProductCardContext.Provider>
  );
}

// Create compound component with all sub-components attached
ProductCard.ImageSection = ImageSection;
ProductCard.WishlistButton = WishlistButton;
ProductCard.PriceSection = PriceSection;
ProductCard.TitleSection = TitleSection;
ProductCard.DescriptionSection = DescriptionSection;
ProductCard.RatingSection = RatingSection;
ProductCard.TagsSection = TagsSection;
ProductCard.AddToCartButton = AddToCartButton;
ProductCard.Content = ProductCardContent;
ProductCard.Footer = ProductCardFooter;

export default ProductCard;
