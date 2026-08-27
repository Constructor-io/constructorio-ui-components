import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { cn, RenderPropsWrapper, dispatchCioEvent, CIO_EVENTS, isHexColor } from '@/utils';
import { Card, CardContentProps, CardFooterProps } from '@/components/card';
import Button from '@/components/button';
import BadgeComponent from '@/components/badge';
import HeartIcon from '@/assets/icons/HeartIcon';
import HeartFilledIcon from '@/assets/icons/HeartFilledIcon';
import { useProductSwatch } from '@/hooks/useProductSwatch';

import {
  AddToCartButtonProps,
  ProductBadgeProps,
  DescriptionSectionProps,
  ImageSectionProps,
  PriceSectionProps,
  ProductCardProps,
  ProductCardOverrides,
  ProductSwatchObject,
  RatingSectionProps,
  TagsSectionProps,
  TitleSectionProps,
  WishlistButtonProps,
  Product,
  SwatchSectionProps,
  SwatchItem,
} from '@/types/productCardTypes';

// Context for sharing ProductCard data
interface ProductCardContextValue {
  renderProps: Omit<ProductCardProps, 'children' | 'componentOverrides' | 'className'> & {
    displayProduct: Product;
    swatch: ProductSwatchObject;
  };
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

  const handleWishlistClick = useCallback(
    (e: React.MouseEvent) => {
      dispatchCioEvent(
        CIO_EVENTS.productCard.wishlist,
        { product: renderProps.displayProduct },
        e.currentTarget,
      );
      onAddToWishlist?.(e, renderProps.displayProduct);
    },
    [renderProps.displayProduct, onAddToWishlist],
  );

  return (
    <RenderPropsWrapper
      props={{ ...renderProps, isInWishlist }}
      override={children || componentOverrides?.image?.wishlistButton?.reactNode}>
      {onAddToWishlist && (
        <Button
          className={cn(
            'cio-product-card-wishlist-btn cio:absolute cio:top-2 cio:sm:top-4 cio:right-2 cio:sm:right-[22px] cio:bg-white cio:size-6 cio:sm:size-[18px] cio:border-0',
            props.className,
          )}
          size='icon'
          variant='secondary'
          conversionType='add_to_wishlist'
          onClick={handleWishlistClick}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
          {isInWishlist ? (
            <HeartFilledIcon
              className='cio:w-3 cio:h-3 cio:sm:w-[8px] cio:sm:h-[8px]'
              aria-label='Remove from wishlist'
            />
          ) : (
            <HeartIcon
              className='cio:w-3 cio:h-3 cio:sm:w-[8px] cio:sm:h-[8px]'
              aria-label='Add to wishlist'
            />
          )}
        </Button>
      )}
    </RenderPropsWrapper>
  );
};

const PriceSection: React.FC<PriceSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { price, salePrice } = renderProps.displayProduct;
  const { priceCurrency = renderProps.priceCurrency || '$' } = props;

  return (
    <RenderPropsWrapper
      props={{ ...renderProps, priceCurrency }}
      override={props.children || componentOverrides?.content?.price?.reactNode}>
      {price && (
        <div
          className={cn(
            'cio-product-card-price-section cio:flex cio:items-baseline cio:gap-2',
            props.className,
          )}>
          <span className='cio:text-lg cio:font-bold'>
            {priceCurrency}&nbsp;{salePrice || price}
          </span>
          {salePrice && (
            <span className='cio:text-sm cio:text-gray-400 cio:line-through'>
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
  const { rating: contextRating, reviewsCount: contextReviewsCount } = renderProps.displayProduct;

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
            'cio-product-card-ratings-section cio:flex cio:justify-between cio:gap-1 cio:text-sm cio:text-gray-500 cio:py-2',
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
  const { tags: contextTags } = renderProps.displayProduct;

  // Use props with fallback to context values
  const tags = props.tags || contextTags;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={props.children || componentOverrides?.footer?.tags?.reactNode}>
      <div
        className={cn(
          'cio-product-card-tags-section cio:flex cio:flex-col cio:gap-1 cio:items-center',
          props.className,
        )}>
        {tags &&
          tags.map((tag) => (
            <span key={tag} className='cio:text-xs cio:text-gray-500'>
              {tag}
            </span>
          ))}
      </div>
    </RenderPropsWrapper>
  );
};

const ImageSection: React.FC<ImageSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { imageUrl: contextImageUrl, name } = renderProps.displayProduct;

  // Use props with fallback to context values
  const imageUrl = props.imageUrl || contextImageUrl;

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      dispatchCioEvent(
        CIO_EVENTS.productCard.imageEnter,
        { product: renderProps.displayProduct },
        e.currentTarget,
      );
    },
    [renderProps.displayProduct],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      dispatchCioEvent(
        CIO_EVENTS.productCard.imageLeave,
        { product: renderProps.displayProduct },
        e.currentTarget,
      );
    },
    [renderProps.displayProduct],
  );

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.image?.reactNode}>
      <div
        className={cn('cio-product-card-image-section cio:relative', props.className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <img
          src={imageUrl}
          alt={name || 'product image'}
          className='cio-product-card-image cio:object-cover cio:w-full cio:min-h-[224px] cio:rounded-2xl'
        />
        {props.children}
      </div>
    </RenderPropsWrapper>
  );
};

const TitleSection: React.FC<TitleSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { name: contextName } = renderProps.displayProduct;

  // Use props with fallback to context values
  const name = props.name || contextName;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={props.children || componentOverrides?.content?.title?.reactNode}>
      <p
        className={cn(
          'cio-product-card-title-section cio:text-base cio:font-medium cio:line-clamp-2',
          props.className,
        )}>
        {name}
      </p>
    </RenderPropsWrapper>
  );
};

const DescriptionSection: React.FC<DescriptionSectionProps> = (props) => {
  const { renderProps, componentOverrides } = useProductCardContext();
  const { description: contextDescription } = renderProps.displayProduct;

  // Use props with fallback to context values
  const description = props.description || contextDescription;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={props.children || componentOverrides?.content?.description?.reactNode}>
      {description && (
        <p
          className={cn(
            'cio-product-card-description cio:text-sm cio:text-gray-500 cio:line-clamp-3',
            props.className,
          )}>
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

  const handleAddToCartClick = useCallback(
    (e: React.MouseEvent) => {
      dispatchCioEvent(
        CIO_EVENTS.productCard.conversion,
        { product: renderProps.displayProduct },
        e.currentTarget,
      );
      onAddToCart?.(e, renderProps.displayProduct);
    },
    [renderProps.displayProduct, onAddToCart],
  );

  return (
    <RenderPropsWrapper
      props={{ ...renderProps, addToCartText }}
      override={children || componentOverrides?.footer?.addToCartButton?.reactNode}>
      {onAddToCart && (
        <Button
          className={cn(
            'cio-product-card-add-to-cart-btn cio:w-full cio:bg-black cio:hover:bg-gray-800 cio:text-white cio:text-sm cio:border-0',
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
  const { badge: contextBadge } = renderProps.displayProduct;

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
            'cio-product-card-badge cio:absolute cio:top-2 cio:sm:top-4 cio:left-2 cio:sm:left-[22px] cio:border-0',
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
        className={cn(
          'cio-product-card-content cio:flex cio:flex-col cio:gap-1 cio:flex-1',
          props.className,
        )}
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
        className={cn(
          'cio-product-card-footer cio:flex cio:flex-col cio:gap-2 cio:mt-auto',
          props.className,
        )}
        {...props}>
        {children}
      </Card.Footer>
    </RenderPropsWrapper>
  );
};

const SwatchSection: React.FC<SwatchSectionProps> = ({
  children,
  swatchList = [],
  selectedSwatch,
  onSwatchClick,
  showViewMoreSwatches,
  viewMoreSwatchesLabel,
  onViewMoreSwatchesClick,
  className,
}) => {
  const { componentOverrides, renderProps } = useProductCardContext();

  if (!swatchList?.length) return null;

  return (
    <RenderPropsWrapper
      props={renderProps}
      override={children || componentOverrides?.content?.swatches?.reactNode}>
      <div
        className={cn(
          'cio-product-card-swatch-section cio:flex cio:flex-wrap cio:gap-2.5 cio:py-2 cio:cursor-default',
          className,
        )}>
        {swatchList.map((swatchItem) => {
          const isSelected = swatchItem.variationId === selectedSwatch?.variationId;
          const bgValue = isHexColor(swatchItem.swatchPreview)
            ? swatchItem.swatchPreview
            : `url("${swatchItem.swatchPreview.replace(/["\\]/g, '\\$&')}") center/cover`;

          return (
            <button
              type='button'
              key={swatchItem.variationId}
              data-testid={`cio-swatch-${swatchItem.variationId}`}
              data-cnstrc-item-variation-id={swatchItem.variationId}
              className={cn(
                'cio-swatch-item cio:size-[25px] cio:rounded-full cio:border cio:border-black cio:cursor-pointer cio:p-0',
                isSelected &&
                  'cio:outline-3 cio:outline-offset-[4px] cio:outline-current cio:opacity-60',
              )}
              style={{ background: bgValue }}
              onClick={(e) => {
                e.stopPropagation();
                onSwatchClick?.(e, swatchItem);
              }}
              aria-label={swatchItem.name || swatchItem.variationId}
              aria-pressed={isSelected}
            />
          );
        })}
        {showViewMoreSwatches && (
          <button
            type='button'
            data-testid='cio-swatch-show-more'
            className='cio-swatch-show-more cio:bg-transparent cio:border-0 cio:p-0 cio:text-xs cio:underline cio:cursor-pointer cio:text-[var(--cio-swatch-more-color,#333)] cio:hover:text-[var(--cio-swatch-more-hover-color,#000)]'
            onClick={(e) => {
              e.stopPropagation();
              onViewMoreSwatchesClick?.(e, selectedSwatch);
            }}
            aria-label={viewMoreSwatchesLabel || 'View more'}>
            {viewMoreSwatchesLabel || 'View more'}
          </button>
        )}
      </div>
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
  const swatch = useProductSwatch(
    props.product,
    props.showViewMoreSwatches ? props.maxSwatches : undefined,
  );
  const displayProduct = useMemo(() => {
    const filtered = Object.fromEntries(
      Object.entries(swatch.selectedSwatch || {}).filter(([, v]) => v !== undefined),
    );
    return { ...props.product, ...filtered };
  }, [props.product, swatch.selectedSwatch]);

  const contextValue = React.useMemo(
    () => ({
      renderProps: {
        ...props,
        displayProduct,
        swatch,
        ...getProductCardDataAttributes(displayProduct),
      },
      componentOverrides,
    }),
    [props, displayProduct, swatch, componentOverrides],
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
    expandInline = true,
    onViewMoreSwatchesClick,
    viewMoreSwatchesLabel,
    showViewMoreSwatches,
    maxSwatches,
    ...restProps
  } = props;

  const handleProductClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;

      // Do not fire if a conversion button (AddToCart / Wishlist) is clicked
      if (target.closest('[data-cnstrc-btn]')) {
        return;
      }

      dispatchCioEvent(CIO_EVENTS.productCard.click, { product: displayProduct }, e.currentTarget);
      onProductClick?.(displayProduct);
    },
    [displayProduct, onProductClick],
  );

  const handleViewMoreSwatchesClick = useCallback(
    (e: React.MouseEvent, selected: SwatchItem | undefined) => {
      if (expandInline) {
        swatch.onViewMoreSwatchesClick();
      }
      onViewMoreSwatchesClick?.(e, selected);
    },
    [expandInline, swatch.onViewMoreSwatchesClick, onViewMoreSwatchesClick],
  );

  const renderPropFn = typeof children === 'function' && children;

  // Default layout when no children provided or render prop function
  return (
    <ProductCardContext.Provider value={contextValue}>
      <RenderPropsWrapper props={props} override={renderPropFn || componentOverrides?.reactNode}>
        <Card
          className={cn(
            'cio-product-card cio:min-w-[176px] cio:max-w-[256px] cio:h-full cio:cursor-pointer cio:border-0',
            className,
          )}
          onClick={handleProductClick}
          {...getProductCardDataAttributes(displayProduct)}
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
              <SwatchSection
                swatchList={swatch.visibleSwatches}
                selectedSwatch={swatch.selectedSwatch}
                onSwatchClick={(_e, selectedSwatch) => swatch.onSwatchClick(selectedSwatch)}
                showViewMoreSwatches={swatch.hasMoreSwatches}
                viewMoreSwatchesLabel={viewMoreSwatchesLabel}
                onViewMoreSwatchesClick={handleViewMoreSwatchesClick}
              />
              <RatingSection />
            </ProductCardContent>

            {/* Footer Section */}
            {(onAddToCart || displayProduct.tags) && (
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

// Attach compound components to ProductCard
ProductCard.SwatchSection = SwatchSection;
ProductCard.ImageSection = ImageSection;
ProductCard.Badge = Badge;
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
