import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, test, expect, vi, afterEach, beforeEach } from 'vitest';
import CioCarousel from '@/components/carousel';
import { Product } from '@/types/productCardTypes';
import { CarouselRenderProps } from '@/types/carouselTypes';

const mockProducts: Product[] = [
  {
    id: 'product-1',
    name: 'Product 1',
    description: 'Description for product 1',
    imageUrl: 'https://example.com/product1.jpg',
    price: '49.99',
    salePrice: '39.99',
    rating: '4.5',
    reviewsCount: '100',
    tags: ['Popular', 'Sale'],
  },
  {
    id: 'product-2',
    name: 'Product 2',
    description: 'Description for product 2',
    imageUrl: 'https://example.com/product2.jpg',
    price: '59.99',
    rating: '4.8',
    reviewsCount: '200',
  },
  {
    id: 'product-3',
    name: 'Product 3',
    imageUrl: 'https://example.com/product3.jpg',
    price: '69.99',
  },
];

type Article = {
  id: string;
  title: string;
  category: string;
  summary: string;
};

const mockArticles: Article[] = [
  {
    id: 'article-1',
    title: 'Article 1',
    category: 'Tech',
    summary: 'Summary for article 1',
  },
  {
    id: 'article-2',
    title: 'Article 2',
    category: 'Design',
    summary: 'Summary for article 2',
  },
];

describe('Carousel component', () => {
  beforeEach(() => {
    // Mock IntersectionObserver - Required by Embla Carousel for detecting when carousel
    // items enter/exit the viewport. Used for lazy loading and visibility tracking.
    // Not available in jsdom test environment.
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    // Mock ResizeObserver - Required by Embla Carousel for detecting size changes in the
    // carousel container. Handles responsive behavior and recalculates slide positions
    // when the viewport or container dimensions change. Not available in jsdom.
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    // Mock matchMedia - Required for responsive breakpoint detection in the carousel.
    // The useCarouselResponsive hook depends on this API to adjust carousel behavior
    // based on screen size. Not fully implemented in jsdom by default.
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe('Basic Rendering', () => {
    test('renders carousel with items prop', () => {
      render(<CioCarousel items={mockProducts} />);

      // Should render product cards for each item
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('Product 3')).toBeInTheDocument();
    });

    test('renders carousel with default configuration', () => {
      const { container } = render(<CioCarousel items={mockProducts} />);

      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel).toBeInTheDocument();
    });

    test('renders navigation buttons by default', () => {
      render(<CioCarousel items={mockProducts} />);

      const prevButton = screen.getByRole('button', { name: /previous/i });
      const nextButton = screen.getByRole('button', { name: /next/i });

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    test('applies custom className', () => {
      const { container } = render(
        <CioCarousel items={mockProducts} className='custom-carousel' data-testid='carousel' />,
      );

      const carousel = container.querySelector('[data-testid="carousel"]');
      expect(carousel).toHaveClass('custom-carousel');
    });
  });

  describe('Carousel Configuration', () => {
    test('renders with autoPlay enabled', () => {
      render(<CioCarousel items={mockProducts} autoPlay />);

      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    test('renders with loop disabled', () => {
      render(<CioCarousel items={mockProducts} loop={false} />);

      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    test('renders with vertical orientation', () => {
      render(<CioCarousel items={mockProducts} orientation='vertical' />);

      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    test('renders with custom slidesToScroll', () => {
      render(<CioCarousel items={mockProducts} slidesToScroll={2} />);

      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    test('renders with custom responsive configuration', () => {
      const responsive = {
        0: { gap: 8, slidesToShow: 1 },
        640: { gap: 12, slidesToShow: 2 },
      };

      render(<CioCarousel items={mockProducts} responsive={responsive} />);

      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });

  describe('Data Attributes', () => {
    test('spreads Constructor.io tracking data attributes', () => {
      const { container } = render(
        <CioCarousel
          items={mockProducts}
          data-cnstrc-recommendations
          data-cnstrc-recommendations-pod-id='pod-id'
          data-cnstrc-result-id='result-id'
          data-cnstrc-num-results='10'
          data-testid='carousel'
        />,
      );

      const carousel = container.querySelector('[data-testid="carousel"]') as HTMLElement;
      expect(carousel).toBeInTheDocument();
      // Boolean data attributes are set to 'true' string in React
      expect(carousel.dataset.cnstrcRecommendations).toBe('true');
      expect(carousel.dataset.cnstrcRecommendationsPodId).toBe('pod-id');
      expect(carousel.dataset.cnstrcResultId).toBe('result-id');
      expect(carousel.dataset.cnstrcNumResults).toBe('10');
    });
  });

  describe('Compound Components', () => {
    test('renders compound component pattern', () => {
      render(
        <CioCarousel autoPlay={false} loop>
          <CioCarousel.Previous />
          <CioCarousel.Next />
          <CioCarousel.Content>
            {mockProducts.map((product) => (
              <CioCarousel.Item key={product.id}>
                <div>{product.name}</div>
              </CioCarousel.Item>
            ))}
          </CioCarousel.Content>
        </CioCarousel>,
      );

      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    test('renders compound components with custom content', () => {
      render(
        <CioCarousel>
          <CioCarousel.Content>
            {mockProducts.map((product) => (
              <CioCarousel.Item key={product.id}>
                <div className='custom-item'>
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </div>
              </CioCarousel.Item>
            ))}
          </CioCarousel.Content>
        </CioCarousel>,
      );

      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('$49.99')).toBeInTheDocument();
    });
  });

  describe('Component Overrides', () => {
    test('renders component override for entire carousel', () => {
      render(
        <CioCarousel
          items={mockProducts}
          componentOverrides={{
            reactNode: <div className='custom-carousel'>Custom Carousel</div>,
          }}
        />,
      );

      const customCarousel = screen.getByText('Custom Carousel');
      expect(customCarousel).toBeInTheDocument();
      expect(customCarousel).toHaveClass('custom-carousel');
      expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    });

    test('Ensure ProductCard componentOverrides are passed down', () => {
      render(
        <CioCarousel
          items={mockProducts}
          componentOverrides={{
            item: {
              productCard: {
                reactNode: (props) => (
                  <div className='custom-product-card'>
                    <h3 data-testid='custom-product-name'>{props.product?.name}</h3>
                    <span data-testid='custom-product-price'>${props.product?.price}</span>
                  </div>
                ),
              },
            },
          }}
        />,
      );

      // All products should use the custom override
      const customNames = screen.getAllByTestId('custom-product-name');
      const customPrices = screen.getAllByTestId('custom-product-price');

      expect(customNames).toHaveLength(3);
      expect(customNames[0].textContent).toEqual(mockProducts[0].name);
      expect(customNames[1].textContent).toEqual(mockProducts[1].name);
      expect(customNames[2].textContent).toEqual(mockProducts[2].name);

      expect(customPrices).toHaveLength(3);
      expect(customPrices[0].textContent).toEqual(`$${mockProducts[0].price}`);
      expect(customPrices[1].textContent).toEqual(`$${mockProducts[1].price}`);
      expect(customPrices[2].textContent).toEqual(`$${mockProducts[2].price}`);
    });

    test('Ensure nested ProductCard componentOverrides are passed down', () => {
      render(
        <CioCarousel
          items={mockProducts}
          componentOverrides={{
            item: {
              productCard: {
                image: {
                  reactNode: (props) => (
                    <div data-testid='custom-image' className='custom-image-override'>
                      {props.product?.imageUrl}
                    </div>
                  ),
                },
              },
            },
          }}
        />,
      );

      // Nested override (ProductCard.image) should be applied
      const customImages = screen.getAllByTestId('custom-image');
      expect(customImages).toHaveLength(3);
      expect(customImages[0].textContent).toEqual(mockProducts[0].imageUrl);
    });

    test('renders component override for navigation buttons', () => {
      render(
        <CioCarousel
          items={mockProducts}
          componentOverrides={{
            previous: {
              reactNode: ({ scrollPrev }: CarouselRenderProps<Product>) => (
                <button onClick={scrollPrev} className='custom-prev'>
                  Custom Prev
                </button>
              ),
            },
            next: {
              reactNode: ({ scrollNext }: CarouselRenderProps<Product>) => (
                <button onClick={scrollNext} className='custom-next'>
                  Custom Next
                </button>
              ),
            },
          }}
        />,
      );

      expect(screen.getByText('Custom Prev')).toBeInTheDocument();
      expect(screen.getByText('Custom Next')).toBeInTheDocument();
      expect(screen.getByText('Custom Prev')).toHaveClass('custom-prev');
      expect(screen.getByText('Custom Next')).toHaveClass('custom-next');
    });

    test('renders component override for item', () => {
      render(
        <CioCarousel
          items={mockProducts}
          componentOverrides={{
            item: {
              reactNode: (props) => (
                <div className='custom-item'>
                  <h3>{props.item?.name}</h3>
                  <span>${props.item?.price}</span>
                </div>
              ),
            },
          }}
        />,
      );

      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('$49.99')).toBeInTheDocument();
    });

    test('renders component override for content', () => {
      render(
        <CioCarousel
          items={mockProducts}
          componentOverrides={{
            content: {
              reactNode: (props: CarouselRenderProps<Product>) => (
                <div className='custom-content'>
                  {props.items?.map((product) => (
                    <CioCarousel.Item key={product.id}>
                      <div>{product.name}</div>
                    </CioCarousel.Item>
                  ))}
                </div>
              ),
            },
          }}
        />,
      );

      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });

  describe('Render Props', () => {
    test('supports render prop function', () => {
      render(
        <CioCarousel items={mockProducts}>
          {(props: CarouselRenderProps<Product>) => (
            <div>
              <h2>Custom Layout</h2>
              <p>Items: {props.items?.length}</p>
              <p>Orientation: {props.orientation}</p>
              <CioCarousel.Content>
                {props.items?.map((product) => (
                  <CioCarousel.Item key={product.id}>
                    <div>{product.name}</div>
                  </CioCarousel.Item>
                ))}
              </CioCarousel.Content>
            </div>
          )}
        </CioCarousel>,
      );

      expect(screen.getByText('Custom Layout')).toBeInTheDocument();
      expect(screen.getByText('Items: 3')).toBeInTheDocument();
      expect(screen.getByText('Orientation: horizontal')).toBeInTheDocument();
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    test('render props receive all carousel configuration', () => {
      const renderPropFn = vi.fn().mockReturnValue(<div>Render Prop Content</div>);

      render(
        <CioCarousel items={mockProducts} autoPlay loop={false} slidesToScroll={2}>
          {renderPropFn}
        </CioCarousel>,
      );

      expect(renderPropFn).toHaveBeenCalled();
      const callArgs = renderPropFn.mock.calls[0][0];
      expect(callArgs.items).toEqual(mockProducts);
      expect(callArgs.autoPlay).toBe(true);
      expect(callArgs.loop).toBe(false);
      expect(callArgs.slidesToScroll).toBe(2);
      expect(callArgs.orientation).toBe('horizontal');
    });

    test('render props provide carousel configuration', () => {
      const renderPropFn = vi.fn().mockReturnValue(<div>Content</div>);

      render(<CioCarousel items={mockProducts}>{renderPropFn}</CioCarousel>);

      expect(renderPropFn).toHaveBeenCalled();
      const callArgs = renderPropFn.mock.calls[0][0];
      // Check that the render props object has the expected configuration
      expect(callArgs).toBeDefined();
      expect(callArgs.items).toEqual(mockProducts);
      expect(callArgs.orientation).toBe('horizontal');
      expect(callArgs.loop).toBe(true);
      expect(callArgs.autoPlay).toBe(false);
      expect(callArgs.slidesToScroll).toBe(1);
    });
  });

  describe('Mixed Patterns', () => {
    test('combines compound components with render props', () => {
      render(
        <CioCarousel items={mockProducts}>
          {(props: CarouselRenderProps<Product>) => (
            <div>
              <div className='custom-header'>
                <h2>Trending Products</h2>
                <span>{props.items?.length} items</span>
              </div>
              <div className='carousel-wrapper'>
                <CioCarousel.Previous />
                <CioCarousel.Content>
                  {props.items?.map((product) => (
                    <CioCarousel.Item key={product.id}>
                      <div>{product.name}</div>
                    </CioCarousel.Item>
                  ))}
                </CioCarousel.Content>
                <CioCarousel.Next />
              </div>
            </div>
          )}
        </CioCarousel>,
      );

      expect(screen.getByText('Trending Products')).toBeInTheDocument();
      expect(screen.getByText('3 items')).toBeInTheDocument();
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    });
  });

  describe('Generic Types', () => {
    test('works with non-product items using generic types', () => {
      render(
        <CioCarousel<Article> items={mockArticles}>
          {(props: CarouselRenderProps<Article>) => (
            <CioCarousel.Content>
              {props.items?.map((article) => (
                <CioCarousel.Item key={article.id}>
                  <article>
                    <h3>{article.title}</h3>
                    <span>{article.category}</span>
                    <p>{article.summary}</p>
                  </article>
                </CioCarousel.Item>
              ))}
            </CioCarousel.Content>
          )}
        </CioCarousel>,
      );

      expect(screen.getByText('Article 1')).toBeInTheDocument();
      expect(screen.getByText('Tech')).toBeInTheDocument();
      expect(screen.getByText('Summary for article 1')).toBeInTheDocument();
    });

    test('renders custom item type with component override', () => {
      render(
        <CioCarousel<Article>
          items={mockArticles}
          componentOverrides={{
            item: {
              reactNode: (props) => (
                <div className='article-card'>
                  <h4>{props.item?.title}</h4>
                  <small>{props.item?.category}</small>
                </div>
              ),
            },
          }}
        />,
      );

      expect(screen.getByText('Article 1')).toBeInTheDocument();
      expect(screen.getByText('Tech')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    test('custom navigation buttons receive correct props', () => {
      const mockScrollPrev = vi.fn();
      const mockScrollNext = vi.fn();

      render(
        <CioCarousel
          items={mockProducts}
          componentOverrides={{
            previous: {
              reactNode: ({ scrollPrev, canScrollPrev }: CarouselRenderProps) => (
                <button
                  onClick={() => {
                    mockScrollPrev();
                    scrollPrev?.();
                  }}
                  disabled={!canScrollPrev}
                  data-testid='custom-prev'>
                  Prev
                </button>
              ),
            },
            next: {
              reactNode: ({ scrollNext, canScrollNext }: CarouselRenderProps) => (
                <button
                  onClick={() => {
                    mockScrollNext();
                    scrollNext?.();
                  }}
                  disabled={!canScrollNext}
                  data-testid='custom-next'>
                  Next
                </button>
              ),
            },
          }}
        />,
      );

      const prevButton = screen.getByTestId('custom-prev');
      const nextButton = screen.getByTestId('custom-next');

      fireEvent.click(nextButton);
      expect(mockScrollNext).toHaveBeenCalled();

      fireEvent.click(prevButton);
      expect(mockScrollPrev).toHaveBeenCalled();
    });
  });

  describe('Empty State', () => {
    test('handles empty items array', () => {
      const { container } = render(<CioCarousel items={[]} />);

      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel).toBeInTheDocument();
    });

    test('handles undefined items', () => {
      const { container } = render(<CioCarousel />);

      const carousel = container.querySelector('[data-slot="carousel"]');
      expect(carousel).toBeInTheDocument();
    });
  });

  describe('itemCallbacks', () => {
    test('calls onProductClick when product card is clicked', () => {
      const onProductClick = vi.fn();
      render(<CioCarousel items={mockProducts} itemCallbacks={{ onProductClick }} />);

      const productCard = screen.getByText('Product 1').closest('.cio-product-card')!;
      fireEvent.click(productCard);
      expect(onProductClick).toHaveBeenCalledWith(mockProducts[0], 0);
    });

    test('calls onAddToCart when add to cart button is clicked', () => {
      const onAddToCart = vi.fn();
      render(<CioCarousel items={mockProducts} itemCallbacks={{ onAddToCart }} />);

      const buttons = screen.getAllByText('Add to Cart');
      fireEvent.click(buttons[0]);
      expect(onAddToCart).toHaveBeenCalledWith(expect.any(Object), mockProducts[0], 0);
    });

    test('calls onAddToWishlist when wishlist button is clicked', () => {
      const onAddToWishlist = vi.fn();
      render(<CioCarousel items={mockProducts} itemCallbacks={{ onAddToWishlist }} />);

      const wishlistButtons = screen.getAllByLabelText(/add to wishlist/i);
      fireEvent.click(wishlistButtons[0]);
      expect(onAddToWishlist).toHaveBeenCalledWith(expect.any(Object), mockProducts[0], 0);
    });

    test('does not throw when itemCallbacks is not provided', () => {
      expect(() => {
        render(<CioCarousel items={mockProducts} />);

        // Without callbacks, clicking should not throw (buttons won't exist)
        const productCard = screen.getByText('Product 1').closest('.cio-product-card')!;
        fireEvent.click(productCard);
      }).not.toThrow();
    });
  });
});
