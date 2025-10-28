import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import ProductCard from '../../../src/components/product-card';

const mockProductData = {
  itemId: 'test-product-1',
  itemName: 'Test Product',
  itemDescription: 'A great test product',
  itemImageUrl: 'https://example.com/image.jpg',
  itemPrice: '99.99',
  itemPriceCurrency: '$',
  itemSalePrice: '79.99',
  itemRating: '4.5',
  itemReviewsCount: '150',
  itemTags: ['Popular', 'Sale'],
  addToCartText: 'Add to Cart',
  itemVariationId: 'variation-1',
  itemSlCampaignId: 'campaign-1',
  itemSlCampaignOwner: 'owner-1',
  isInWishlist: false,
};

describe('ProductCard component', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Basic Rendering', () => {
    test('renders product card with required props', () => {
      render(<ProductCard itemId={mockProductData.itemId} itemName={mockProductData.itemName} />);

      expect(screen.getByText(mockProductData.itemName)).toBeInTheDocument();
    });

    test('renders product card with all props', () => {
      render(<ProductCard {...mockProductData} onAddToCart={vi.fn()} />);

      expect(screen.getByText(mockProductData.itemName)).toBeInTheDocument();
      expect(screen.getByText(mockProductData.itemDescription)).toBeInTheDocument();
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

      const image = screen.getByAltText(mockProductData.itemName);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockProductData.itemImageUrl);
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
      expect(mockOnAddToCart).toHaveBeenCalledWith(expect.any(Object));
    });

    test('calls onAddToWishlist when wishlist button is clicked', () => {
      const mockOnAddToWishlist = vi.fn();
      render(<ProductCard {...mockProductData} onAddToWishlist={mockOnAddToWishlist} />);
      fireEvent.click(screen.getByRole('button', { name: /add-to-wishlist/i }));
      expect(mockOnAddToWishlist).toHaveBeenCalledTimes(1);
      expect(mockOnAddToWishlist).toHaveBeenCalledWith(expect.any(Object));
    });

    test('calls onItemClick when product card is clicked', () => {
      const mockOnItemClick = vi.fn();
      render(
        <ProductCard
          {...mockProductData}
          onItemClick={mockOnItemClick}
          data-testid='product-card'
        />,
      );
      fireEvent.click(screen.getByTestId('product-card'));
      expect(mockOnItemClick).toHaveBeenCalledTimes(1);
    });

    test('does not render add to cart button when onAddToCart is not provided', () => {
      render(<ProductCard itemId={mockProductData.itemId} itemName={mockProductData.itemName} />);
      expect(screen.queryByText('Add to Cart')).not.toBeInTheDocument();
    });

    test('does not render wishlist button when onAddToWishlist is not provided', () => {
      render(<ProductCard itemId={mockProductData.itemId} itemName={mockProductData.itemName} />);
      expect(screen.queryByRole('button', { name: /add-to-wishlist/i })).not.toBeInTheDocument();
    });
  });

  describe('Data Attributes', () => {
    test('spreads Constructor.io tracking data attributes', () => {
      render(<ProductCard {...mockProductData} data-testid='product-card' />);
      const productCard = screen.getByTestId('product-card');
      expect(productCard.dataset.cnstrcItemId).toBe(mockProductData.itemId);
      expect(productCard.dataset.cnstrcItemVariationId).toBe(mockProductData.itemVariationId);
      expect(productCard.dataset.cnstrcItemName).toBe(mockProductData.itemName);
      expect(productCard.dataset.cnstrcItemPrice).toBe(mockProductData.itemSalePrice);
      expect(productCard.dataset.cnstrcSlCampaignId).toBe(mockProductData.itemSlCampaignId);
      expect(productCard.dataset.cnstrcSlCampaignOwner).toBe(mockProductData.itemSlCampaignOwner);
    });

    test('uses regular price when sale price is not provided', () => {
      const productWithoutSale = { ...mockProductData, itemSalePrice: undefined };
      render(<ProductCard {...productWithoutSale} data-testid='product-card' />);
      const productCard = screen.getByTestId('product-card');
      expect(productCard.dataset.cnstrcItemPrice).toBe(mockProductData.itemPrice);
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
      expect(screen.getByText(mockProductData.itemName)).toBeInTheDocument();
      expect(screen.getByText('$ 79.99')).toBeInTheDocument();
      expect(screen.getByText(mockProductData.itemDescription)).toBeInTheDocument();
      expect(screen.getByText('⭐ 4.5')).toBeInTheDocument();
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
      expect(screen.getByText('Popular')).toBeInTheDocument();
    });

    test('compound components can override props', () => {
      render(
        <ProductCard {...mockProductData}>
          <ProductCard.Content>
            <ProductCard.TitleSection itemName='Custom Title' />
            <ProductCard.PriceSection itemPrice='199.99' itemPriceCurrency='€' />
          </ProductCard.Content>
        </ProductCard>,
      );
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('€ 199.99')).toBeInTheDocument();
    });

    test('compound components support custom className', () => {
      render(
        <ProductCard {...mockProductData}>
          <ProductCard.Content>
            <ProductCard.TitleSection className='custom-title' />
          </ProductCard.Content>
        </ProductCard>,
      );
      const titleElement = screen.getByText(mockProductData.itemName);
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
      expect(screen.queryByText(mockProductData.itemName)).not.toBeInTheDocument();
    });

    test('renders component override for title section', () => {
      render(
        <ProductCard
          {...mockProductData}
          componentOverrides={{
            title: {
              reactNode: <h2 className='custom-title'>Custom Title Override</h2>,
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
            addToCartButton: {
              reactNode: <button className='custom-button'>Custom Add to Cart</button>,
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
              <p>Product: {renderProps.itemName}</p>
              <p>
                Price: {renderProps.itemPriceCurrency}
                {renderProps.itemSalePrice || renderProps.itemPrice}
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

      expect(renderPropFn).toHaveBeenCalledWith(
        expect.objectContaining({
          itemId: mockProductData.itemId,
          itemName: mockProductData.itemName,
          itemPrice: mockProductData.itemPrice,
          itemPriceCurrency: mockProductData.itemPriceCurrency,
          itemSalePrice: mockProductData.itemSalePrice,
          onAddToCart: undefined,
          onAddToWishlist: undefined,
        }),
      );
    });
  });

  describe('Conditional Rendering', () => {
    test('does not render footer when no add to cart or tags', () => {
      render(<ProductCard itemId={mockProductData.itemId} itemName={mockProductData.itemName} />);

      // Footer should not be rendered when no onAddToCart and no itemTags
      expect(screen.queryByText('Add to Cart')).not.toBeInTheDocument();
    });

    test('renders footer when tags are provided', () => {
      render(
        <ProductCard
          itemId={mockProductData.itemId}
          itemName={mockProductData.itemName}
          itemTags={['Tag1', 'Tag2']}
        />,
      );

      expect(screen.getByText('Tag1')).toBeInTheDocument();
      expect(screen.getByText('Tag2')).toBeInTheDocument();
    });

    test('does not render rating section when no rating or reviews', () => {
      render(<ProductCard itemId={mockProductData.itemId} itemName={mockProductData.itemName} />);

      expect(screen.queryByText(/⭐/)).not.toBeInTheDocument();
      expect(screen.queryByText(/reviews/)).not.toBeInTheDocument();
    });

    test('renders only rating when reviews count is not provided', () => {
      render(
        <ProductCard
          itemId={mockProductData.itemId}
          itemName={mockProductData.itemName}
          itemRating='4.0'
        />,
      );

      expect(screen.getByText('⭐ 4.0')).toBeInTheDocument();
      expect(screen.queryByText(/reviews/)).not.toBeInTheDocument();
    });

    test('renders only reviews when rating is not provided', () => {
      render(
        <ProductCard
          itemId={mockProductData.itemId}
          itemName={mockProductData.itemName}
          itemReviewsCount='25'
        />,
      );

      expect(screen.getByText('25 reviews')).toBeInTheDocument();
      expect(screen.queryByText(/⭐/)).not.toBeInTheDocument();
    });
  });

  describe('Wishlist State', () => {
    test('shows empty heart when not in wishlist', () => {
      render(<ProductCard {...mockProductData} isInWishlist={false} onAddToWishlist={vi.fn()} />);

      const wishlistButton = screen.getByRole('button', { name: /add-to-wishlist/i });
      const heartImage = wishlistButton.querySelector('img');
      expect(heartImage?.alt).toBe('add-to-wishlist');
      // Check that the image src contains SVG data for empty heart (stroke but no fill)
      expect(heartImage?.src).toMatch(/fill='none'/);
    });

    test('shows filled heart when in wishlist', () => {
      render(<ProductCard {...mockProductData} isInWishlist={true} onAddToWishlist={vi.fn()} />);

      const wishlistButton = screen.getByRole('button', { name: /add-to-wishlist/i });
      const heartImage = wishlistButton.querySelector('img');
      expect(heartImage?.alt).toBe('add-to-wishlist');
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
      const productWithoutSale = { ...mockProductData, itemSalePrice: undefined };

      render(<ProductCard {...productWithoutSale} />);

      expect(screen.getByText('$ 99.99')).toBeInTheDocument();
      expect(screen.queryByText('$ 79.99')).not.toBeInTheDocument();
    });

    test('uses custom currency', () => {
      render(<ProductCard {...mockProductData} itemPriceCurrency='€' />);

      expect(screen.getByText('€ 79.99')).toBeInTheDocument();
      expect(screen.getByText('€ 99.99')).toBeInTheDocument();
    });
  });
});
