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
  Product,
} from '@/types/product-card-types';

// Context for sharing ProductCard data
interface ProductCardContextValue {
  renderProps: Omit<ProductCardProps, 'children' | 'componentOverrides' | 'className'>;
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
  const {
    isInWishlist = renderProps.isInWishlist || false,
    onAddToWishlist = renderProps.onAddToWishlist,
    children,
  } = props;

  return (
    <RenderPropsWrapper
      props={{ ...renderProps, isInWishlist }}
      override={children || componentOverrides?.wishlistButton?.reactNode}>
      {onAddToWishlist && (
        <Button
          className={cn(
            'cio-product-card-wishlist-btn absolute top-2 sm:top-4 right-2 sm:right-[22px] bg-white size-6 sm:size-[18px]',
            props.className,
          )}
          size='icon'
          variant='secondary'
          conversionType='add_to_wishlist'
          onClick={onAddToWishlist}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
          <img
            src={isInWishlist ? HeartFilled : Heart}
            className='w-3 h-3 sm:w-[9px] sm:h-[9px]'
            alt={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          />
        </Button>
      )}
    </RenderPropsWrapper>
  );
};

const PriceSection: React.FC<PriceSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const {
    product: { price, salePrice },
  } = renderProps;
  const { priceCurrency = renderProps.priceCurrency || '$' } = props;

  return (
    <RenderPropsWrapper
      props={{ ...renderProps, priceCurrency }}
      override={props.children || componentOverrides?.price?.reactNode}>
      {price && (
        <div
          className={cn(
            'cio-product-card-price-section flex items-baseline gap-2',
            props.className,
          )}>
          <span className='text-lg font-bold'>
            {priceCurrency}&nbsp;{salePrice || price}
          </span>
          {salePrice && (
            <span className='text-sm text-gray-400 line-through'>
              {priceCurrency}&nbsp;{price}
            </span>
          )}
        </div>
      )}
    </RenderPropsWrapper>
  );
};

const RatingSection: React.FC<RatingSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { rating: contextRating, reviewsCount: contextReviewsCount } = renderProps.product;

  // Use props with fallback to context values
  const rating = props.rating ?? contextRating;
  const reviewsCount = props.reviewsCount ?? contextReviewsCount;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={props.children || componentOverrides?.rating?.reactNode}>
      {(rating !== undefined && rating !== null) || reviewsCount ? (
        <div
          className={cn(
            'cio-product-card-ratings-section flex justify-between gap-1 text-sm text-gray-500 py-2',
            props.className,
          )}>
          {rating !== undefined && rating !== null && <span>⭐ {rating}</span>}
          {reviewsCount && <span>{reviewsCount} reviews</span>}
        </div>
      ) : null}
    </RenderPropsWrapper>
  );
};

const TagsSection: React.FC<TagsSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { tags: contextTags } = renderProps.product;

  // Use props with fallback to context values
  const tags = props.tags || contextTags;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={props.children || componentOverrides?.tags?.reactNode}>
      <div
        className={cn(
          'cio-product-card-tags-section flex flex-col gap-1 items-center',
          props.className,
        )}>
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
  const { imageUrl: contextImageUrl, name } = renderProps.product;

  // Use props with fallback to context values
  const imageUrl = props.imageUrl || contextImageUrl;

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.image?.reactNode}>
      <div className={cn('cio-product-card-image-section relative', props.className)}>
        <img
          src={imageUrl}
          alt={name || 'product image'}
          className='object-cover w-full min-h-[224px] rounded-2xl'
        />
        {props.children}
      </div>
    </RenderPropsWrapper>
  );
};

const TitleSection: React.FC<TitleSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { name: contextName } = renderProps.product;

  // Use props with fallback to context values
  const name = props.name || contextName;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={props.children || componentOverrides?.title?.reactNode}>
      <p className={cn('cio-product-card-title-section text-base font-medium', props.className)}>
        {name}
      </p>
    </RenderPropsWrapper>
  );
};

const DescriptionSection: React.FC<DescriptionSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { description: contextDescription } = renderProps.product;

  // Use props with fallback to context values
  const description = props.description || contextDescription;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={props.children || componentOverrides?.description?.reactNode}>
      {description && (
        <p className={cn('cio-product-card-description text-sm text-gray-500', props.className)}>
          {description}
        </p>
      )}
    </RenderPropsWrapper>
  );
};

const AddToCartButton: React.FC<AddToCartButtonProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const {
    addToCartText = renderProps.addToCartText || 'Add to Cart',
    onAddToCart = renderProps.onAddToCart,
    children,
  } = props;

  return (
    <RenderPropsWrapper
      props={{ ...renderProps, addToCartText }}
      override={children || componentOverrides?.addToCartButton?.reactNode}>
      {onAddToCart && (
        <Button
          className={cn(
            'cio-product-card-add-to-cart-btn w-full bg-black hover:bg-gray-800 text-white text-sm',
            props.className,
          )}
          conversionType='add_to_cart'
          onClick={onAddToCart}>
          {addToCartText}
        </Button>
      )}
    </RenderPropsWrapper>
  );
};

const ProductCardContent: React.FC<CardContentProps> = ({ children, ...props }) => {
  const { componentOverrides, renderProps } = useProductCardContext();
  const renderPropFn = typeof children === 'function' && children;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={renderPropFn || componentOverrides?.reactNode}>
      <Card.Content
        className={cn('cio-product-card-content flex flex-col gap-1', props.className)}
        {...props}>
        {children}
      </Card.Content>
    </RenderPropsWrapper>
  );
};

const ProductCardFooter: React.FC<CardFooterProps> = ({ children, ...props }) => {
  const { componentOverrides, renderProps } = useProductCardContext();
  const renderPropFn = typeof children === 'function' && children;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={renderPropFn || componentOverrides?.reactNode}>
      <Card.Footer
        className={cn('cio-product-card-footer flex flex-col gap-2', props.className)}
        {...props}>
        {children}
      </Card.Footer>
    </RenderPropsWrapper>
  );
};

function getProductCardDataAttributes({
  id,
  name,
  variationId,
  price,
  salePrice,
  slCampaignId,
  slCampaignOwner,
}: Product) {
  return {
    'data-cnstrc-item-id': id,
    'data-cnstrc-item-variation-id': variationId,
    'data-cnstrc-item-name': name,
    'data-cnstrc-item-price': salePrice || price,
    'data-cnstrc-sl-campaign-id': slCampaignId,
    'data-cnstrc-sl-campaign-owner': slCampaignOwner,
  };
}

function ProductCard({ componentOverrides, children, className, ...props }: ProductCardProps) {
  const contextValue = React.useMemo(
    () => ({
      renderProps: { ...props, ...getProductCardDataAttributes(props.product) },
      componentOverrides,
    }),
    [props, componentOverrides],
  );

  // Extract all ProductCard-specific Props so we don't pass it to Card
  const {
    product,
    priceCurrency,
    onAddToCart,
    onProductClick,
    addToCartText,
    isInWishlist,
    onAddToWishlist,
    ...restProps
  } = props;

  const renderPropFn = typeof children === 'function' && children;

  // Default layout when no children provided or render prop function
  return (
    <ProductCardContext.Provider value={contextValue}>
      <RenderPropsWrapper props={props} override={renderPropFn || componentOverrides?.reactNode}>
        <Card
          className={cn('cio-product-card min-w-[176px] max-w-[256px] cursor-pointer', className)}
          onClick={onProductClick}
          {...getProductCardDataAttributes(product)}
          {...restProps}>
          <RenderPropsWrapper props={props} override={children}>
            {/* Image Section */}
            <ImageSection>
              {/* Badge */}
              {/* <Badge /> */}
              <WishlistButton isInWishlist={isInWishlist} onAddToWishlist={onAddToWishlist} />
            </ImageSection>

            {/* Content Section */}
            <ProductCardContent>
              <PriceSection priceCurrency={priceCurrency} />
              <TitleSection />
              <DescriptionSection />
              <RatingSection />
            </ProductCardContent>

            {/* Footer Section */}
            {(onAddToCart || product.tags) && (
              <ProductCardFooter>
                <AddToCartButton onAddToCart={onAddToCart} addToCartText={addToCartText} />
                <TagsSection />
              </ProductCardFooter>
            )}
          </RenderPropsWrapper>
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
ProductCard.getProductCardDataAttributes = getProductCardDataAttributes;

export default ProductCard;
