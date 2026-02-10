import React, { createContext, useCallback, useContext, useRef, forwardRef } from 'react';
import { cn, RenderPropsWrapper, dispatchCioEvent, CIO_EVENTS } from '@/utils';
import { Card, CardContentProps, CardFooterProps } from '@/components/card';
import Button from '@/components/button';
import BadgeComponent from '@/components/badge';
import Heart from '@/assets/svgs/heart.svg';
import HeartFilled from '@/assets/svgs/heart-filled.svg';

import {
  AddToCartButtonProps,
  ProductBadgeProps,
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
} from '@/types/productCardTypes';

// Context for sharing ProductCard data
interface ProductCardContextValue {
  renderProps: Omit<ProductCardProps, 'children' | 'componentOverrides' | 'className'>;
  componentOverrides?: ProductCardOverrides;
  rootRef: React.RefObject<HTMLDivElement | null>;
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
      override={children || componentOverrides?.image?.wishlistButton?.reactNode}>
      {onAddToWishlist && (
        <Button
          className={cn(
            'cio-product-card-wishlist-btn absolute top-2 sm:top-4 right-2 sm:right-[22px] bg-white size-6 sm:size-[18px] border-0',
            props.className,
          )}
          size='icon'
          variant='secondary'
          conversionType='add_to_wishlist'
          onClick={onAddToWishlist}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
          <img
            src={isInWishlist ? HeartFilled : Heart}
            className='w-3 h-3 sm:w-[8px] sm:h-[8px]'
            alt={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          />
        </Button>
      )}
    </RenderPropsWrapper>
  );
};

const PriceSection: React.FC<PriceSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { price, salePrice } = renderProps.product;
  const { priceCurrency = renderProps.priceCurrency || '$' } = props;

  return (
    <RenderPropsWrapper
      props={{ ...renderProps, priceCurrency }}
      override={props.children || componentOverrides?.content?.price?.reactNode}>
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
      override={props.children || componentOverrides?.content?.rating?.reactNode}>
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
      override={props.children || componentOverrides?.footer?.tags?.reactNode}>
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
  const { renderProps, componentOverrides, rootRef } = useProductCardContext();
  const { imageUrl: contextImageUrl, name } = renderProps.product;

  // Use props with fallback to context values
  const imageUrl = props.imageUrl || contextImageUrl;

  const handleMouseEnter = useCallback(() => {
    dispatchCioEvent(
      CIO_EVENTS.productCard.imageEnter,
      { product: renderProps.product },
      rootRef.current,
    );
  }, [renderProps.product, rootRef]);

  const handleMouseLeave = useCallback(() => {
    dispatchCioEvent(
      CIO_EVENTS.productCard.imageLeave,
      { product: renderProps.product },
      rootRef.current,
    );
  }, [renderProps.product, rootRef]);

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.image?.reactNode}>
      <div
        className={cn('cio-product-card-image-section relative', props.className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <img
          src={imageUrl}
          alt={name || 'product image'}
          className='cio-product-card-image object-cover w-full min-h-[224px] rounded-2xl'
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
      override={props.children || componentOverrides?.content?.title?.reactNode}>
      <p
        className={cn(
          'cio-product-card-title-section text-base font-medium line-clamp-2',
          props.className,
        )}>
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
      override={props.children || componentOverrides?.content?.description?.reactNode}>
      {description && (
        <p
          className={cn(
            'cio-product-card-description text-sm text-gray-500 line-clamp-3',
            props.className,
          )}>
          {description}
        </p>
      )}
    </RenderPropsWrapper>
  );
};

const AddToCartButton: React.FC<AddToCartButtonProps> = (props) => {
  const { renderProps, componentOverrides, rootRef } = useProductCardContext();
  const {
    addToCartText = renderProps.addToCartText || 'Add to Cart',
    onAddToCart = renderProps.onAddToCart,
    children,
  } = props;

  const handleAddToCartClick = useCallback(
    (e: React.MouseEvent) => {
      // Prevent product click from firing
      e.stopPropagation();
      dispatchCioEvent(
        CIO_EVENTS.productCard.conversion,
        { product: renderProps.product },
        rootRef.current,
      );
      onAddToCart?.(e);
    },
    [renderProps.product, onAddToCart, rootRef],
  );

  return (
    <RenderPropsWrapper
      props={{ ...renderProps, addToCartText }}
      override={children || componentOverrides?.footer?.addToCartButton?.reactNode}>
      {onAddToCart && (
        <Button
          className={cn(
            'cio-product-card-add-to-cart-btn w-full bg-black hover:bg-gray-800 text-white text-sm border-0',
            props.className,
          )}
          conversionType='add_to_cart'
          onClick={handleAddToCartClick}>
          {addToCartText}
        </Button>
      )}
    </RenderPropsWrapper>
  );
};

const Badge: React.FC<ProductBadgeProps> = ({ children, ...props }) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { badge: contextBadge } = renderProps.product;

  // If children is a render prop function, use it as override
  const renderPropFn = typeof children === 'function' && children;

  // Get the badge content - use non-function children or badge from context
  const badgeContent = children && typeof children !== 'function' ? children : contextBadge;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={renderPropFn || componentOverrides?.image?.badge?.reactNode}>
      {!!badgeContent && (
        <BadgeComponent
          variant='outline'
          className={cn(
            'cio-product-card-badge absolute top-2 sm:top-4 left-2 sm:left-[22px] border-0',
            props.className,
          )}
          {...props}>
          {badgeContent}
        </BadgeComponent>
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
      override={renderPropFn || componentOverrides?.content?.reactNode}>
      <Card.Content
        className={cn('cio-product-card-content flex flex-col gap-1 flex-1', props.className)}
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
      override={renderPropFn || componentOverrides?.footer?.reactNode}>
      <Card.Footer
        className={cn('cio-product-card-footer flex flex-col gap-2 mt-auto', props.className)}
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

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(function ProductCard(
  { componentOverrides, children, className, ...props },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null);

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      (rootRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  const contextValue = React.useMemo(
    () => ({
      renderProps: { ...props, ...getProductCardDataAttributes(props.product) },
      componentOverrides,
      rootRef,
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

  const handleProductClick = useCallback(() => {
    dispatchCioEvent(CIO_EVENTS.productCard.click, { product }, rootRef.current);
    onProductClick?.();
  }, [product, onProductClick]);

  const renderPropFn = typeof children === 'function' && children;

  // Default layout when no children provided or render prop function
  return (
    <ProductCardContext.Provider value={contextValue}>
      <RenderPropsWrapper props={props} override={renderPropFn || componentOverrides?.reactNode}>
        <Card
          ref={setRootRef}
          className={cn(
            'cio-product-card min-w-[176px] max-w-[256px] h-full cursor-pointer border-0',
            className,
          )}
          onClick={handleProductClick}
          {...getProductCardDataAttributes(product)}
          {...restProps}>
          <RenderPropsWrapper props={props} override={children}>
            {/* Image Section */}
            <ImageSection>
              <Badge />
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
});

// Attach compound sub-components to the forwardRef'd ProductCard
const ProductCardNamespace = ProductCard as typeof ProductCard & {
  ImageSection: typeof ImageSection;
  Badge: typeof Badge;
  WishlistButton: typeof WishlistButton;
  PriceSection: typeof PriceSection;
  TitleSection: typeof TitleSection;
  DescriptionSection: typeof DescriptionSection;
  RatingSection: typeof RatingSection;
  TagsSection: typeof TagsSection;
  AddToCartButton: typeof AddToCartButton;
  Content: typeof ProductCardContent;
  Footer: typeof ProductCardFooter;
  getProductCardDataAttributes: typeof getProductCardDataAttributes;
};
ProductCardNamespace.ImageSection = ImageSection;
ProductCardNamespace.Badge = Badge;
ProductCardNamespace.WishlistButton = WishlistButton;
ProductCardNamespace.PriceSection = PriceSection;
ProductCardNamespace.TitleSection = TitleSection;
ProductCardNamespace.DescriptionSection = DescriptionSection;
ProductCardNamespace.RatingSection = RatingSection;
ProductCardNamespace.TagsSection = TagsSection;
ProductCardNamespace.AddToCartButton = AddToCartButton;
ProductCardNamespace.Content = ProductCardContent;
ProductCardNamespace.Footer = ProductCardFooter;
ProductCardNamespace.getProductCardDataAttributes = getProductCardDataAttributes;

export default ProductCardNamespace;
