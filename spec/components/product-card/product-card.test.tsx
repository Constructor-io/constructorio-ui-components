import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import ProductCard from '@/components/product-card';
import { CIO_EVENTS } from '@/utils/events';

const mockProductData = {
  product: {
    id: 'test-product-1',
    name: 'Test Product',
    description: 'A great test product',
    imageUrl: 'https://example.com/image.jpg',
    price: '99.99',
    salePrice: '79.99' as string | undefined,
    rating: '4.5',
    reviewsCount: '150',
    tags: ['Popular', 'Sale'],
    variationId: 'variation-1',
    slCampaignId: 'campaign-1',
    slCampaignOwner: 'owner-1',
  },
  priceCurrency: '$',
  addToCartText: 'Add to Cart',
  isInWishlist: false,
};

const mockBasicProduct = {
  id: mockProductData.product.id,
  name: mockProductData.product.name,
};

describe('ProductCard component', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Basic Rendering', () => {
    test('renders product card with required props', () => {
      render(<ProductCard product={mockBasicProduct} />);

      expect(screen.getByText(mockProductData.product.name)).toBeInTheDocument();
    });

    test('renders product card with all props', () => {
      render(<ProductCard {...mockProductData} onAddToCart={vi.fn()} />);

      expect(screen.getByText(mockProductData.product.name)).toBeInTheDocument();
      expect(screen.getByText(mockProductData.product.description)).toBeInTheDocument();
      expect(screen.getByText('$ 79.99')).toBeInTheDocument();
      expect(screen.getByText('$ 99.99')).toBeInTheDocument();
      expect(screen.getByText('⭐ 4.5')).toBeInTheDocument();
      expect(screen.getByText('150 reviews')).toBeInTheDocument();
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
      expect(screen.getByText('Popular')).toBeInTheDocument();
      expect(screen.getByText('Sale')).toBeInTheDocument();
    });

    test('renders product image with correct alt text', () => {
      render(<ProductCard {...mockProductData} />);

      const image = screen.getByAltText(mockProductData.product.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockProductData.product.imageUrl);
    });

    test('applies custom className', () => {
      render(
        <ProductCard
          {...mockProductData}
          className='custom-product-card'
          data-testid='product-card'
        />,
      );
      const productCard = screen.getByTestId('product-card');
      expect(productCard).toHaveClass('custom-product-card');
    });
  });

  describe('Event Handlers', () => {
    test('calls onAddToCart when add to cart button is clicked', () => {
      const mockOnAddToCart = vi.fn();
      render(<ProductCard {...mockProductData} onAddToCart={mockOnAddToCart} />);
      fireEvent.click(screen.getByText('Add to Cart'));
      expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
      expect(mockOnAddToCart).toHaveBeenCalledWith(expect.any(Object), mockProductData.product);
    });

    test('calls onAddToWishlist when wishlist button is clicked', () => {
      const mockOnAddToWishlist = vi.fn();
      render(<ProductCard {...mockProductData} onAddToWishlist={mockOnAddToWishlist} />);
      fireEvent.click(screen.getByRole('button', { name: /add to wishlist/i }));
      expect(mockOnAddToWishlist).toHaveBeenCalledTimes(1);
      expect(mockOnAddToWishlist).toHaveBeenCalledWith(expect.any(Object), mockProductData.product);
    });

    test('calls onProductClick when product card is clicked', () => {
      const mockOnProductClick = vi.fn();
      render(
        <ProductCard
          {...mockProductData}
          onProductClick={mockOnProductClick}
          data-testid='product-card'
        />,
      );
      fireEvent.click(screen.getByTestId('product-card'));
      expect(mockOnProductClick).toHaveBeenCalledTimes(1);
      expect(mockOnProductClick).toHaveBeenCalledWith(mockProductData.product);
    });

    test('does not render add to cart button when onAddToCart is not provided', () => {
      render(<ProductCard product={mockBasicProduct} />);
      expect(screen.queryByText('Add to Cart')).not.toBeInTheDocument();
    });

    test('does not render wishlist button when onAddToWishlist is not provided', () => {
      render(<ProductCard product={mockBasicProduct} />);
      expect(screen.queryByRole('button', { name: /add to wishlist/i })).not.toBeInTheDocument();
    });
  });

  describe('Data Attributes', () => {
    test('spreads Constructor.io tracking data attributes', () => {
      render(<ProductCard {...mockProductData} data-testid='product-card' />);
      const productCard = screen.getByTestId('product-card');
      expect(productCard.dataset.cnstrcItemId).toBe(mockProductData.product.id);
      expect(productCard.dataset.cnstrcItemVariationId).toBe(mockProductData.product.variationId);
      expect(productCard.dataset.cnstrcItemName).toBe(mockProductData.product.name);
      expect(productCard.dataset.cnstrcItemPrice).toBe(mockProductData.product.salePrice);
      expect(productCard.dataset.cnstrcSlCampaignId).toBe(mockProductData.product.slCampaignId);
      expect(productCard.dataset.cnstrcSlCampaignOwner).toBe(
        mockProductData.product.slCampaignOwner,
      );
    });

    test('uses regular price when sale price is not provided', () => {
      const productWithoutSale = structuredClone(mockProductData);
      productWithoutSale.product.salePrice = undefined;

      render(<ProductCard {...productWithoutSale} data-testid='product-card' />);

      const productCard = screen.getByTestId('product-card');

      expect(productCard.dataset.cnstrcItemPrice).toBe(mockProductData.product.price);
    });
  });

  describe('Compound Components', () => {
    test('renders compound component pattern', () => {
      render(
        <ProductCard {...mockProductData} onAddToCart={vi.fn()}>
          <ProductCard.ImageSection>
            <ProductCard.WishlistButton />
          </ProductCard.ImageSection>
          <ProductCard.Content>
            <ProductCard.TitleSection />
            <ProductCard.PriceSection />
            <ProductCard.DescriptionSection />
            <ProductCard.RatingSection />
          </ProductCard.Content>
          <ProductCard.Footer>
            <ProductCard.AddToCartButton />
            <ProductCard.TagsSection />
          </ProductCard.Footer>
        </ProductCard>,
      );
      expect(screen.getByText(mockProductData.product.name)).toBeInTheDocument();
      expect(screen.getByText('$ 79.99')).toBeInTheDocument();
      expect(screen.getByText(mockProductData.product.description)).toBeInTheDocument();
      expect(screen.getByText('⭐ 4.5')).toBeInTheDocument();
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
      expect(screen.getByText('Popular')).toBeInTheDocument();
    });

    test('compound components can override props', () => {
      render(
        <ProductCard {...mockProductData}>
          <ProductCard.Content>
            <ProductCard.TitleSection name='Custom Title' />
            <ProductCard.PriceSection priceCurrency='€' />
          </ProductCard.Content>
        </ProductCard>,
      );
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('€ 79.99')).toBeInTheDocument();
    });

    test('compound components support custom className', () => {
      render(
        <ProductCard {...mockProductData}>
          <ProductCard.Content>
            <ProductCard.TitleSection className='custom-title' />
          </ProductCard.Content>
        </ProductCard>,
      );
      const titleElement = screen.getByText(mockProductData.product.name);
      expect(titleElement).toHaveClass('custom-title');
    });
  });

  describe('Component Overrides', () => {
    test('renders component override for entire product card', () => {
      render(
        <ProductCard
          {...mockProductData}
          componentOverrides={{
            reactNode: <div className='custom-product-card'>Custom Product Card</div>,
          }}
        />,
      );
      const customCard = screen.getByText('Custom Product Card');
      expect(customCard).toBeInTheDocument();
      expect(customCard).toHaveClass('custom-product-card');
      expect(screen.queryByText(mockProductData.product.name)).not.toBeInTheDocument();
    });

    test('renders component override for title section', () => {
      render(
        <ProductCard
          {...mockProductData}
          componentOverrides={{
            content: {
              title: {
                reactNode: <h2 className='custom-title'>Custom Title Override</h2>,
              },
            },
          }}
        />,
      );
      const customTitle = screen.getByText('Custom Title Override');
      expect(customTitle).toBeInTheDocument();
      expect(customTitle.tagName).toBe('H2');
      expect(customTitle).toHaveClass('custom-title');
    });

    test('renders component override for add to cart button', () => {
      render(
        <ProductCard
          {...mockProductData}
          onAddToCart={vi.fn()}
          componentOverrides={{
            footer: {
              addToCartButton: {
                reactNode: <button className='custom-button'>Custom Add to Cart</button>,
              },
            },
          }}
        />,
      );

      const customButton = screen.getByText('Custom Add to Cart');
      expect(customButton).toBeInTheDocument();
      expect(customButton).toHaveClass('custom-button');
    });
  });

  describe('Render Props', () => {
    test('supports render prop function', () => {
      render(
        <ProductCard {...mockProductData}>
          {(renderProps) => (
            <div>
              <h3>Custom Layout</h3>
              <p>Product: {renderProps.product.name}</p>
              <p>
                Price: {renderProps.priceCurrency}
                {renderProps.product.salePrice || renderProps.product.price}
              </p>
            </div>
          )}
        </ProductCard>,
      );

      expect(screen.getByText('Custom Layout')).toBeInTheDocument();
      expect(screen.getByText('Product: Test Product')).toBeInTheDocument();
      expect(screen.getByText('Price: $79.99')).toBeInTheDocument();
    });

    test('render props receive all product data', () => {
      const renderPropFn = vi.fn().mockReturnValue(<div>Render Prop Content</div>);

      render(<ProductCard {...mockProductData}>{renderPropFn}</ProductCard>);

      expect(renderPropFn).toHaveBeenCalledWith(expect.objectContaining(mockProductData));
    });
  });

  describe('Conditional Rendering', () => {
    test('does not render footer when no add to cart or tags', () => {
      render(<ProductCard product={mockBasicProduct} />);

      // Footer should not be rendered when no onAddToCart and no tags
      expect(screen.queryByText('Add to Cart')).not.toBeInTheDocument();
    });

    test('renders footer when tags are provided', () => {
      render(<ProductCard product={{ ...mockBasicProduct, tags: ['Tag1', 'Tag2'] }} />);

      expect(screen.getByText('Tag1')).toBeInTheDocument();
      expect(screen.getByText('Tag2')).toBeInTheDocument();
    });

    test('does not render rating section when no rating or reviews', () => {
      render(<ProductCard product={mockBasicProduct} />);

      expect(screen.queryByText(/⭐/)).not.toBeInTheDocument();
      expect(screen.queryByText(/reviews/)).not.toBeInTheDocument();
    });

    test('renders only rating when reviews count is not provided', () => {
      render(<ProductCard product={{ ...mockBasicProduct, rating: '4.0' }} />);

      expect(screen.getByText('⭐ 4.0')).toBeInTheDocument();
      expect(screen.queryByText(/reviews/)).not.toBeInTheDocument();
    });

    test('renders only reviews when rating is not provided', () => {
      render(<ProductCard product={{ ...mockBasicProduct, reviewsCount: '25' }} />);

      expect(screen.getByText('25 reviews')).toBeInTheDocument();
      expect(screen.queryByText(/⭐/)).not.toBeInTheDocument();
    });
  });

  describe('Wishlist State', () => {
    test('shows empty heart when not in wishlist', () => {
      render(<ProductCard {...mockProductData} isInWishlist={false} onAddToWishlist={vi.fn()} />);

      const wishlistButton = screen.getByRole('button', { name: /add to wishlist/i });
      const heartImage = wishlistButton.querySelector('img');
      expect(heartImage?.alt).toBe('Add to wishlist');
      // Check that the image src contains SVG data for empty heart (stroke but no fill)
      expect(heartImage?.src).toMatch(/fill='none'/);
    });

    test('shows filled heart when in wishlist', () => {
      render(<ProductCard {...mockProductData} isInWishlist={true} onAddToWishlist={vi.fn()} />);

      const wishlistButton = screen.getByRole('button', { name: /remove from wishlist/i });
      const heartImage = wishlistButton.querySelector('img');
      expect(heartImage?.alt).toBe('Remove from wishlist');
      // Check that the image src contains SVG data for filled heart (has fill color)
      expect(heartImage?.src).toMatch(/fill='%230F172A'/);
    });
  });

  describe('Price Display', () => {
    test('shows sale price and crossed out original price', () => {
      render(<ProductCard {...mockProductData} />);

      const salePrice = screen.getByText('$ 79.99');
      const originalPrice = screen.getByText('$ 99.99');

      expect(salePrice).toBeInTheDocument();
      expect(originalPrice).toBeInTheDocument();
      expect(originalPrice).toHaveClass('line-through');
    });

    test('shows only regular price when no sale price', () => {
      const productWithoutSale = structuredClone(mockProductData);
      productWithoutSale.product.salePrice = undefined;

      render(<ProductCard {...productWithoutSale} />);

      expect(screen.getByText('$ 99.99')).toBeInTheDocument();
      expect(screen.queryByText('$ 79.99')).not.toBeInTheDocument();
    });

    test('uses custom currency', () => {
      render(<ProductCard {...mockProductData} priceCurrency='€' />);

      expect(screen.getByText('€ 79.99')).toBeInTheDocument();
      expect(screen.getByText('€ 99.99')).toBeInTheDocument();
    });
  });

  describe('Badge', () => {
    test('renders badge when badge is provided', () => {
      const productWithBadge = {
        ...mockProductData,
        product: {
          ...mockProductData.product,
          badge: 'New',
        },
      };
      render(<ProductCard {...productWithBadge} />);

      const badge = screen.getByText('New');
      expect(badge).toBeInTheDocument();
    });

    test('does not render badge when badge text is not provided', () => {
      const { container } = render(<ProductCard {...mockProductData} />);

      const badgeElement = container.querySelector('.cio-product-card-badge');
      expect(badgeElement).not.toBeInTheDocument();
    });
  });

  describe('Pub-Sub Events', () => {
    afterEach(() => {
      cleanup();
    });

    test('dispatches productCard.click event on root element with correct product detail', () => {
      render(<ProductCard {...mockProductData} data-testid='product-card' />);

      const el = screen.getByTestId('product-card');
      const listener = vi.fn();
      el.addEventListener(CIO_EVENTS.productCard.click, listener);

      fireEvent.click(el);

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail.product).toEqual(mockProductData.product);

      el.removeEventListener(CIO_EVENTS.productCard.click, listener);
    });

    test('dispatches productCard.click event AND calls onProductClick callback', () => {
      const mockOnProductClick = vi.fn();
      render(
        <ProductCard
          {...mockProductData}
          onProductClick={mockOnProductClick}
          data-testid='product-card'
        />,
      );

      const el = screen.getByTestId('product-card');
      const listener = vi.fn();
      el.addEventListener(CIO_EVENTS.productCard.click, listener);

      fireEvent.click(el);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(mockOnProductClick).toHaveBeenCalledTimes(1);
      expect(mockOnProductClick).toHaveBeenCalledWith(mockProductData.product);

      el.removeEventListener(CIO_EVENTS.productCard.click, listener);
    });

    test('events bubble up so window listeners still work', () => {
      const listener = vi.fn();
      window.addEventListener(CIO_EVENTS.productCard.click, listener);

      render(<ProductCard {...mockProductData} data-testid='product-card' />);
      fireEvent.click(screen.getByTestId('product-card'));

      expect(listener).toHaveBeenCalledTimes(1);

      window.removeEventListener(CIO_EVENTS.productCard.click, listener);
    });

    test('dispatches productCard.click event even without onProductClick prop', () => {
      render(<ProductCard product={mockBasicProduct} data-testid='product-card' />);

      const el = screen.getByTestId('product-card');
      const listener = vi.fn();
      el.addEventListener(CIO_EVENTS.productCard.click, listener);

      fireEvent.click(el);

      expect(listener).toHaveBeenCalledTimes(1);

      el.removeEventListener(CIO_EVENTS.productCard.click, listener);
    });

    test('dispatches productCard.conversion event on root element on add-to-cart click', () => {
      const mockOnAddToCart = vi.fn();
      render(<ProductCard {...mockProductData} onAddToCart={mockOnAddToCart} data-testid='product-card' />);

      const el = screen.getByTestId('product-card');
      const listener = vi.fn();
      el.addEventListener(CIO_EVENTS.productCard.conversion, listener);

      fireEvent.click(screen.getByText('Add to Cart'));

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail.product).toEqual(mockProductData.product);
      expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
      expect(mockOnAddToCart).toHaveBeenCalledWith(expect.any(Object), mockProductData.product);

      el.removeEventListener(CIO_EVENTS.productCard.conversion, listener);
    });

    test('clicking add-to-cart does NOT also dispatch productCard.click', () => {
      render(<ProductCard {...mockProductData} onAddToCart={vi.fn()} data-testid='product-card' />);

      const el = screen.getByTestId('product-card');
      const clickListener = vi.fn();
      const conversionListener = vi.fn();
      el.addEventListener(CIO_EVENTS.productCard.click, clickListener);
      el.addEventListener(CIO_EVENTS.productCard.conversion, conversionListener);

      fireEvent.click(screen.getByText('Add to Cart'));

      expect(conversionListener).toHaveBeenCalledTimes(1);
      expect(clickListener).not.toHaveBeenCalled();

      el.removeEventListener(CIO_EVENTS.productCard.click, clickListener);
      el.removeEventListener(CIO_EVENTS.productCard.conversion, conversionListener);
    });

    test('clicking add-to-cart does NOT call onProductClick callback', () => {
      const mockOnProductClick = vi.fn();
      render(
        <ProductCard {...mockProductData} onAddToCart={vi.fn()} onProductClick={mockOnProductClick} />,
      );
      fireEvent.click(screen.getByText('Add to Cart'));
      expect(mockOnProductClick).not.toHaveBeenCalled();
    });

    test('dispatches productCard.wishlist event on root element on wishlist click', () => {
      const mockOnAddToWishlist = vi.fn();
      render(<ProductCard {...mockProductData} onAddToWishlist={mockOnAddToWishlist} data-testid='product-card' />);

      const el = screen.getByTestId('product-card');
      const listener = vi.fn();
      el.addEventListener(CIO_EVENTS.productCard.wishlist, listener);

      fireEvent.click(screen.getByRole('button', { name: /add to wishlist/i }));

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail.product).toEqual(mockProductData.product);
      expect(mockOnAddToWishlist).toHaveBeenCalledTimes(1);
      expect(mockOnAddToWishlist).toHaveBeenCalledWith(expect.any(Object), mockProductData.product);

      el.removeEventListener(CIO_EVENTS.productCard.wishlist, listener);
    });

    test('clicking wishlist button does NOT call onProductClick callback', () => {
      const mockOnProductClick = vi.fn();
      render(
        <ProductCard
          {...mockProductData}
          onAddToWishlist={vi.fn()}
          onProductClick={mockOnProductClick}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: /add to wishlist/i }));
      expect(mockOnProductClick).not.toHaveBeenCalled();
    });

    test('clicking wishlist button does NOT dispatch productCard.click event', () => {
      const clickListener = vi.fn();
      window.addEventListener(CIO_EVENTS.productCard.click, clickListener);

      render(<ProductCard {...mockProductData} onAddToWishlist={vi.fn()} />);
      fireEvent.click(screen.getByRole('button', { name: /add to wishlist/i }));

      expect(clickListener).not.toHaveBeenCalled();

      window.removeEventListener(CIO_EVENTS.productCard.click, clickListener);
    });

    test('dispatches productCard.imageEnter on root element on mouseEnter of image section', () => {
      render(<ProductCard {...mockProductData} data-testid='product-card' />);

      const el = screen.getByTestId('product-card');
      const listener = vi.fn();
      el.addEventListener(CIO_EVENTS.productCard.imageEnter, listener);

      const imageSection = el.querySelector('.cio-product-card-image-section')!;
      fireEvent.mouseEnter(imageSection);

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail.product).toEqual(mockProductData.product);

      el.removeEventListener(CIO_EVENTS.productCard.imageEnter, listener);
    });

    test('dispatches productCard.imageLeave on root element on mouseLeave of image section', () => {
      render(<ProductCard {...mockProductData} data-testid='product-card' />);

      const el = screen.getByTestId('product-card');
      const listener = vi.fn();
      el.addEventListener(CIO_EVENTS.productCard.imageLeave, listener);

      const imageSection = el.querySelector('.cio-product-card-image-section')!;
      fireEvent.mouseLeave(imageSection);

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail.product).toEqual(mockProductData.product);

      el.removeEventListener(CIO_EVENTS.productCard.imageLeave, listener);
    });

    test('two product cards: events do not cross-pollinate', () => {
      const product2 = { ...mockProductData, product: { ...mockProductData.product, id: 'product-2', name: 'Product 2' } };

      render(
        <>
          <div data-testid='wrapper-1'>
            <ProductCard {...mockProductData} data-testid='card-1' />
          </div>
          <div data-testid='wrapper-2'>
            <ProductCard {...product2} data-testid='card-2' />
          </div>
        </>,
      );

      const wrapper1 = screen.getByTestId('wrapper-1');
      const wrapper2 = screen.getByTestId('wrapper-2');
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      wrapper1.addEventListener(CIO_EVENTS.productCard.click, listener1);
      wrapper2.addEventListener(CIO_EVENTS.productCard.click, listener2);

      // Click only the first card
      fireEvent.click(screen.getByTestId('card-1'));

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).not.toHaveBeenCalled();

      wrapper1.removeEventListener(CIO_EVENTS.productCard.click, listener1);
      wrapper2.removeEventListener(CIO_EVENTS.productCard.click, listener2);
    });
  });
});
