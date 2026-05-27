import type { Meta, StoryObj } from '@storybook/react-vite';
import ProductCard from '../../../components/product-card';
import { CompleteCustomOverrideCard, CompactListStyleCard } from './ProductCardVariants';
import { Product, ProductCardProps } from '../../../types/productCardTypes';
import { DEMO_IMAGE_URL } from '../../constants';

const meta = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    variationId: { control: 'text' },
    description: { control: 'text' },
    imageUrl: { control: 'text' },
    price: { control: 'text' },
    priceCurrency: { control: 'text' },
    salePrice: { control: 'text' },
    rating: { control: 'number' },
    reviewsCount: { control: 'number' },
    addToCartText: { control: 'text' },
    tags: { control: 'object' },
    badge: { control: 'text' },
    slCampaignId: { control: 'text' },
    slCampaignOwner: { control: 'text' },
    isInWishlist: { control: 'boolean' },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<ProductCardProps>;

// Basic card with minimal props
export const Basic: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
    },
  },
};

// Card with price only
export const WithPrice: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '299',
    },
    priceCurrency: '$',
  },
};

// Card with sale price
export const WithSalePrice: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '399',
      salePrice: '299',
    },
    priceCurrency: '$',
  },
};

// Card with description
export const WithDescription: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '299',
      description: 'Premium golf pants designed for comfort and performance on the course',
    },
  },
};

// Card with rating and reviews
export const WithRatingAndReviews: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '299',
      rating: 4.8,
      reviewsCount: 2713,
    },
  },
};

// Card with add to cart functionality
export const WithAddToCart: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '299',
    },
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
  },
};

// Card with wishlist functionality
export const WithWishlist: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '299',
    },
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
  },
  argTypes: {
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
};

// Card with tags
export const WithTags: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '299',
      tags: ['Same day delivery', 'Free shipping'],
    },
  },
};

// Card with custom add to cart text
export const CustomAddToCartText: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '299',
    },
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    addToCartText: 'Buy Now',
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
  },
};

// Card with different currency
export const CustomCurrency: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '150',
      salePrice: '120',
      rating: 4.5,
      reviewsCount: 89,
    },
    priceCurrency: '€',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
    onProductClick: { action: 'product clicked' },
  },
};

// Product with all features enabled
export const FullyFeatured: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      description: 'Premium golf pants designed for comfort and performance on the course',
      price: '899',
      salePrice: '699',
      rating: 4.8,
      reviewsCount: 2713,
      tags: ['Same day delivery', 'Free assembly', '10-year warranty'],
      badge: 'New',
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
    onProductClick: () => console.log('Product clicked'),
    addToCartText: 'Add to Cart',
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
    onProductClick: { action: 'product clicked' },
  },
};

// Card with product already in wishlist
export const InWishlist: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      description: 'Premium golf pants designed for comfort and performance on the course',
      price: '399',
      rating: 4.5,
      reviewsCount: 156,
    },
    priceCurrency: '$',
    isInWishlist: true,
    onAddToWishlist: (e, product) => console.log('Removed from wishlist', e, product),
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'remove from wishlist clicked' },
  },
};

// Card with badge
export const WithBadge: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      description: 'Premium golf pants designed for comfort and performance on the course',
      price: '899',
      badge: 'New Arrival',
    },
    priceCurrency: '$',
  },
};

// Custom badge using component overrides
export const CustomBadge: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      description: 'Premium golf pants designed for comfort and performance on the course',
      price: '899',
      salePrice: '699',
      rating: 4.8,
      reviewsCount: 2713,
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
    componentOverrides: {
      image: {
        badge: {
          reactNode: () => (
            <div className='cio:absolute cio:top-2 cio:sm:top-4 cio:left-2 cio:sm:left-[22px] cio:bg-gradient-to-r cio:from-orange-500 cio:to-red-500 cio:text-white cio:px-3 cio:py-1 cio:rounded-full cio:shadow-lg'>
              <div className='cio:flex cio:items-center cio:gap-1'>
                <span className='cio:text-lg'>🔥</span>
                <span className='cio:text-xs cio:font-bold cio:uppercase cio:tracking-wide'>
                  Hot Deal
                </span>
              </div>
            </div>
          ),
        },
      },
    },
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
};

// Custom badge using compound components
export const CustomBadgeCompound: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      description: 'Premium golf pants designed for comfort and performance on the course',
      price: '899',
      salePrice: '699',
      rating: 4.8,
      reviewsCount: 2713,
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
  },
  render: (args) => (
    <ProductCard {...args}>
      <ProductCard.ImageSection>
        <ProductCard.Badge>Hot Deal</ProductCard.Badge>
        <ProductCard.WishlistButton />
      </ProductCard.ImageSection>
      <ProductCard.Content>
        <ProductCard.PriceSection />
        <ProductCard.TitleSection />
        <ProductCard.DescriptionSection />
        <ProductCard.RatingSection />
      </ProductCard.Content>
      <ProductCard.Footer>
        <ProductCard.AddToCartButton />
      </ProductCard.Footer>
    </ProductCard>
  ),
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
  // Hide from sidebar but keep available for Canvas
  tags: ['!dev'],
};

// ==========================================
// COMPOUND COMPONENT PATTERN STORIES
// ==========================================

// Basic compound component usage (hidden from Storybook UI, used in Code Examples)
export const CompoundBasic: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '299',
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
  },
  render: (args) => (
    <ProductCard {...args}>
      <ProductCard.ImageSection>
        <ProductCard.WishlistButton />
      </ProductCard.ImageSection>
      <ProductCard.Content>
        <ProductCard.PriceSection />
        <ProductCard.TitleSection />
      </ProductCard.Content>
      <ProductCard.Footer>
        <ProductCard.AddToCartButton />
      </ProductCard.Footer>
    </ProductCard>
  ),
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
  // Hide from sidebar but keep available for Canvas
  tags: ['!dev'],
};

// Compound component with all features
export const CompoundFullyFeatured: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      description: 'Premium golf pants designed for comfort and performance on the course',
      price: '899',
      salePrice: '699',
      rating: 4.8,
      reviewsCount: 2713,
      tags: ['Same day delivery', 'Free assembly', '10-year warranty'],
    },
    priceCurrency: '$',
    onProductClick: () => console.log('Product clicked'),
    addToCartText: 'Add to Cart',
  },
  render: (args) => (
    <ProductCard {...args}>
      <ProductCard.ImageSection>
        <ProductCard.WishlistButton
          onAddToWishlist={(e: React.MouseEvent, product: Product) =>
            console.log('Added to wishlist', e, product)
          }
        />
        <ProductCard.Badge>New</ProductCard.Badge>
      </ProductCard.ImageSection>
      <ProductCard.Content>
        <ProductCard.PriceSection />
        <ProductCard.TitleSection />
        <ProductCard.DescriptionSection />
        <ProductCard.RatingSection />
      </ProductCard.Content>
      <ProductCard.Footer>
        <ProductCard.AddToCartButton
          onAddToCart={(e: React.MouseEvent, product: Product) =>
            console.log('Added to cart', e, product)
          }
        />
        <ProductCard.TagsSection />
      </ProductCard.Footer>
    </ProductCard>
  ),
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
    onProductClick: { action: 'product clicked' },
  },
  // Hide from sidebar but keep available for Canvas
  tags: ['!dev'],
};

// Custom layout with compound components - Price after title and description
export const CompoundCustomLayout: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '599',
      salePrice: '449',
      rating: 4.7,
      reviewsCount: 156,
      description: 'Premium golf pants designed for comfort and performance on the course',
      tags: ['Premium', 'Fast Shipping'],
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
  },
  render: (args) => (
    <ProductCard {...args}>
      <ProductCard.ImageSection>
        <ProductCard.WishlistButton />
      </ProductCard.ImageSection>
      <ProductCard.Content>
        {/* Price after title and description */}
        <ProductCard.TitleSection />
        <ProductCard.DescriptionSection />
        <ProductCard.PriceSection />
        <ProductCard.RatingSection />
      </ProductCard.Content>
      <ProductCard.Footer>
        {/* Tags before Add to Cart button */}
        <ProductCard.TagsSection />
        <ProductCard.AddToCartButton />
      </ProductCard.Footer>
    </ProductCard>
  ),
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
  // Hide from sidebar but keep available for Canvas
  tags: ['!dev'],
};

// Grid layout with compound components
export const CompoundGridLayout: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '799',
      rating: 4.8,
      reviewsCount: 203,
      description: 'Premium golf pants designed for comfort and performance on the course',
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    className: 'overflow-hidden max-w-md',
  },
  render: (args) => (
    <ProductCard {...args}>
      <div className='cio:grid cio:grid-cols-2 cio:gap-4 cio:p-4'>
        <ProductCard.ImageSection />
        <div className='cio:space-y-2'>
          <ProductCard.PriceSection />
          <ProductCard.TitleSection />
          <ProductCard.RatingSection />
        </div>
      </div>
      <ProductCard.Footer>
        <ProductCard.AddToCartButton />
      </ProductCard.Footer>
    </ProductCard>
  ),
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
  },
  // Hide from sidebar but keep available for Canvas
  tags: ['!dev'],
};

// Minimal compound layout - just image, title, and button
export const CompoundMinimal: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '199',
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
  },
  render: (args) => (
    <ProductCard {...args}>
      <ProductCard.ImageSection />
      <ProductCard.Content>
        <ProductCard.TitleSection />
      </ProductCard.Content>
      <ProductCard.Footer>
        <ProductCard.AddToCartButton />
      </ProductCard.Footer>
    </ProductCard>
  ),
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
  },
  // Hide from sidebar but keep available for Canvas
  tags: ['!dev'],
};

// ==========================================
// RENDER PROPS & COMPONENT OVERRIDES STORIES
// ==========================================

// Complete custom override using children render prop
export const CompleteCustomOverride: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '599',
      salePrice: '449',
      rating: 4.7,
      reviewsCount: 892,
      description: 'Premium golf pants designed for comfort and performance on the course',
      tags: ['Premium', 'Limited Edition'],
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
    children: (props: ProductCardProps) => <CompleteCustomOverrideCard {...props} />,
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
};

// Compact list-style override
export const CompactListStyle: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '249',
      salePrice: '199',
      rating: 4.3,
      reviewsCount: 156,
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    children: (props: ProductCardProps) => <CompactListStyleCard {...props} />,
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
  },
};

// Example customization overrides for different sections
const priceOverride = {
  reactNode: (renderProps: ProductCardProps) => (
    <div className='cio:bg-gradient-to-r cio:from-emerald-50 cio:to-teal-50 cio:border cio:border-emerald-200 cio:rounded-lg cio:p-4 cio:my-2'>
      <div className='cio:flex cio:items-center cio:justify-between'>
        <div className='cio:flex cio:flex-col'>
          <span className='cio:text-xs cio:text-emerald-600 cio:font-medium cio:uppercase cio:tracking-wide'>
            Special Offer
          </span>
          <div className='cio:flex cio:items-baseline cio:gap-2 cio:mt-1'>
            <span className='cio:text-2xl cio:font-bold cio:text-emerald-800'>
              {renderProps.priceCurrency}
              {renderProps.product.salePrice || renderProps.product.price}
            </span>
            {renderProps.product.salePrice && (
              <span className='cio:text-sm cio:text-gray-500 cio:line-through'>
                {renderProps.priceCurrency}
                {renderProps.product.price}
              </span>
            )}
          </div>
          {renderProps.product.salePrice && (
            <span className='cio:text-xs cio:text-emerald-600 cio:font-medium cio:mt-1'>
              Save {renderProps.priceCurrency}
              {Number(renderProps.product.price) - Number(renderProps.product.salePrice)}
            </span>
          )}
        </div>
        <div className='cio:bg-emerald-100 cio:text-emerald-800 cio:px-3 cio:py-1 cio:rounded-full cio:text-xs cio:font-bold'>
          {renderProps.product.salePrice
            ? `${Math.round(
                ((Number(renderProps.product.price) - Number(renderProps.product.salePrice)) /
                  Number(renderProps.product.price)) *
                  100,
              )}% OFF`
            : 'Best Price'}
        </div>
      </div>
    </div>
  ),
};

const titleOverride = {
  reactNode: (props: ProductCardProps) => (
    <h3 className='cio:text-xl cio:font-bold cio:text-purple-600 cio:underline'>
      {props.product.name}
    </h3>
  ),
};

const addToCartButtonOverride = {
  reactNode: (props: {
    onAddToCart?: (e: React.MouseEvent, product: Product) => void;
    addToCartText?: string;
    product: Product;
  }) => (
    <button
      className='cio:w-full cio:bg-gradient-to-r cio:from-purple-500 cio:to-pink-500 cio:text-white cio:py-2 cio:px-4 cio:rounded-lg cio:hover:from-purple-600 cio:hover:to-pink-600 cio:transition-all cio:cursor-pointer cio:border-0'
      onClick={(e) => props.onAddToCart && props.onAddToCart(e, props.product)}>
      🛒 {props.addToCartText || 'Add to Cart'}
    </button>
  ),
};

const wishlistButtonOverride = {
  reactNode: (props: ProductCardProps) => (
    <button
      className='cio:absolute cio:top-2 cio:right-2 cio:bg-white cio:text-white cio:px-1 cio:rounded-md cio:hover:bg-red-200 cio:transition-colors cio:cursor-pointer cio:border-0'
      onClick={(e) => props.onAddToWishlist && props.onAddToWishlist(e, props.product)}>
      ❤️
    </button>
  ),
};

const footerOverride = {
  reactNode: (props: ProductCardProps) => (
    <div className='cio:bg-gradient-to-r cio:from-blue-50 cio:to-indigo-50 cio:p-4 cio:rounded-lg cio:border cio:border-blue-200'>
      <div className='cio:flex cio:flex-col cio:gap-3'>
        {/* Custom action buttons */}
        <div className='cio:flex cio:flex-col cio:gap-2'>
          <button
            className='cio:flex-1 cio:bg-blue-600 cio:hover:bg-blue-700 cio:text-white cio:py-2 cio:px-4 cio:rounded-lg cio:font-medium cio:transition-colors cio:cursor-pointer cio:border-0'
            onClick={(e) => props.onAddToCart && props.onAddToCart(e, props.product)}>
            🛒 Quick Buy
          </button>
          <button
            className='cio:flex-1 cio:bg-white cio:hover:bg-gray-50 cio:text-blue-600 cio:border cio:border-blue-600 cio:py-2 cio:px-4 cio:rounded-lg cio:font-medium cio:transition-colors cio:cursor-pointer'
            onClick={() => console.log('Compare clicked')}>
            ⚖️ Compare
          </button>
        </div>
        {/* Custom info section */}
        <div className='cio:flex cio:flex-col cio:gap-2 cio:items-center cio:justify-between cio:text-sm cio:text-gray-600'>
          <span className='cio:flex cio:items-center cio:gap-1'>🚚 Free shipping</span>
          <span className='cio:flex cio:items-center cio:gap-1'>🔄 30-day returns</span>
        </div>
        {/* Custom tags display */}
        {props.product.tags && props.product.tags.length > 0 && (
          <div className='cio:flex cio:flex-wrap cio:gap-1 cio:justify-center'>
            {props.product.tags.map((tag, index) => (
              <span
                key={index}
                className='cio:bg-blue-100 cio:text-blue-800 cio:text-xs cio:px-2 cio:py-1 cio:rounded-full'>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  ),
};

// Custom Price Section
export const CustomPriceSection: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '599',
      rating: 4.8,
      reviewsCount: 156,
      description: 'Premium golf pants designed for comfort and performance on the course',
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    componentOverrides: {
      content: {
        price: priceOverride,
      },
    },
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
  },
};

// Custom Title Section
export const CustomTitleSection: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '449',
      rating: 4.5,
      reviewsCount: 89,
      description: 'Premium golf pants designed for comfort and performance on the course',
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    componentOverrides: {
      content: {
        title: titleOverride,
      },
    },
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
  },
};

// Custom Add to Cart Button
export const CustomAddToCartButton: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '399',
      rating: 4.3,
      reviewsCount: 67,
      description: 'Premium golf pants designed for comfort and performance on the course',
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    componentOverrides: {
      footer: {
        addToCartButton: addToCartButtonOverride,
      },
    },
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
  },
};

// Custom Wishlist Button
export const CustomWishlistButton: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '529',
      rating: 4.7,
      reviewsCount: 123,
      description: 'Premium golf pants designed for comfort and performance on the course',
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
    componentOverrides: {
      image: {
        wishlistButton: wishlistButtonOverride,
      },
    },
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
};

// Custom Footer Section
export const CustomFooterSection: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '649',
      rating: 4.8,
      reviewsCount: 198,
      description: 'Premium golf pants designed for comfort and performance on the course',
      tags: ['Premium Quality', 'Fast Delivery', 'Eco-Friendly'],
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
    componentOverrides: {
      footer: footerOverride,
    },
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
};

// Multiple Customizations
export const MultipleCustomizations: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '699',
      rating: 4.9,
      reviewsCount: 234,
      description: 'Premium golf pants designed for comfort and performance on the course',
      tags: ['All Custom', 'Premium', 'Limited Edition'],
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
    componentOverrides: {
      content: {
        price: priceOverride,
        title: titleOverride,
      },
      footer: {
        addToCartButton: addToCartButtonOverride,
        ...footerOverride,
      },
      image: {
        wishlistButton: wishlistButtonOverride,
      },
    },
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
};

// ==========================================
// Compound Components with Direct Props Override
// ==========================================

// Demonstrates passing props directly to compound components to override context values
// This is useful when you want to customize individual sections with different data
export const CompoundWithDirectPropsOverride: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '799',
      salePrice: '399',
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
  },
  render: (args) => (
    <ProductCard {...args}>
      <ProductCard.ImageSection>
        {/* Override wishlist handler for this specific button */}
        <ProductCard.WishlistButton
          onAddToWishlist={(e: React.MouseEvent, product: Product) => {
            e.stopPropagation();
            console.log('Custom wishlist handler - adding to favorites!', e, product);
          }}
          isInWishlist={true}
        />
      </ProductCard.ImageSection>

      <ProductCard.Content>
        {/* Override title with custom text */}
        <ProductCard.TitleSection name='Premium Edition - Highland Golf Pants' />

        {/* Override price with promotional pricing */}
        <ProductCard.PriceSection />

        {/* Override rating with different values */}
        <ProductCard.RatingSection rating='4.9' reviewsCount='500' />

        <ProductCard.DescriptionSection />
      </ProductCard.Content>

      <ProductCard.Footer>
        {/* Override tags with promotional tags */}
        <ProductCard.TagsSection
          tags={['🎉 50% OFF', '🚚 Express Shipping', '🎁 Gift Wrap Available']}
        />

        {/* Override button text and handler */}
        <ProductCard.AddToCartButton
          addToCartText='Buy Now - Limited Offer!'
          onAddToCart={(e: React.MouseEvent, product: Product) => {
            e.stopPropagation();
            console.log('Special promotional purchase!', e, product);
          }}
        />
      </ProductCard.Footer>
    </ProductCard>
  ),
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
  // Hide from sidebar but keep available for Canvas
  tags: ['!dev'],
};

// ==========================================
// Compound Components with Render Props
// ==========================================

// Compound components with render props - respecting the constraint that direct children
// of a single element should be either all compound components OR inside a render prop function
export const CompoundWithRenderProps: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      price: '899',
      salePrice: '699',
      rating: 4.9,
      reviewsCount: 456,
      description: 'Premium golf pants designed for comfort and performance on the course',
      tags: ['Premium', 'Custom Layout'],
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
  },
  render: (args) => (
    <ProductCard {...args}>
      {/* Image section with compound components */}
      <ProductCard.ImageSection>
        <ProductCard.WishlistButton />
      </ProductCard.ImageSection>

      {/* Content section with pure render props - all children are inside a render prop function */}
      <ProductCard.Content>
        {(renderProps: ProductCardProps) => (
          <>
            <div className='cio:flex cio:items-baseline cio:gap-2'>
              <span className='cio:text-lg cio:font-bold'>
                {renderProps.priceCurrency}
                {renderProps.product.salePrice || renderProps.product.price}
              </span>
              {renderProps.product.salePrice && (
                <span className='cio:text-sm cio:text-gray-400 cio:line-through'>
                  {renderProps.priceCurrency}
                  {renderProps.product.price}
                </span>
              )}
            </div>

            <p className='cio:text-base cio:font-medium'>{renderProps.product.name}</p>

            <div className='cio:bg-gradient-to-r cio:from-blue-50 cio:to-purple-50 cio:border cio:border-blue-200 cio:rounded-lg cio:p-3 cio:my-2'>
              <div className='cio:flex cio:items-center cio:gap-2 cio:mb-2'>
                <span className='cio:text-blue-600 cio:font-semibold cio:text-sm'>
                  🎯 Smart Recommendation
                </span>
              </div>
              <p className='cio:text-gray-700 cio:text-sm'>
                Based on your preferences, this {renderProps.product.name} is perfect for you!
                {renderProps.product.salePrice && (
                  <span className='cio:text-green-600 cio:font-medium'>
                    {' '}
                    Save $
                    {Number(renderProps.product.price) - Number(renderProps.product.salePrice)}{' '}
                    today!
                  </span>
                )}
              </p>
              <div className='cio:flex cio:items-center cio:gap-2 cio:mt-2 cio:justify-center'>
                <span className='cio:bg-blue-100 cio:text-blue-800 cio:text-xs cio:px-2 cio:py-1 cio:rounded-full cio:text-center'>
                  ⭐ {renderProps.product.rating} rating
                </span>
                <span className='cio:bg-purple-100 cio:text-purple-800 cio:text-xs cio:px-2 cio:py-1 cio:rounded-full cio:text-center'>
                  💬 {renderProps.product.reviewsCount} reviews
                </span>
              </div>
            </div>

            {renderProps.product.description && (
              <p className='cio:text-sm cio:text-gray-500'>{renderProps.product.description}</p>
            )}
          </>
        )}
      </ProductCard.Content>

      {/* Footer section with pure render props - all children are inside a render prop function */}
      <ProductCard.Footer>
        {(renderProps: ProductCardProps) => (
          <div className='cio:space-y-2'>
            <div className='cio:flex cio:gap-2 cio:text-xs cio:text-gray-600'>
              <span className='cio:flex cio:items-center cio:gap-1'>
                🚚 Free shipping on orders over $500
              </span>
            </div>

            {renderProps.onAddToCart && (
              <button
                className='cio:w-full cio:mt-3 cio:bg-indigo-600 cio:hover:bg-indigo-700 cio:text-white cio:py-2 cio:px-4 cio:rounded-lg cio:font-medium cio:transition-colors cio:border-0 cio:cursor-pointer'
                onClick={(e) =>
                  renderProps.onAddToCart && renderProps.onAddToCart(e, renderProps.product)
                }>
                {renderProps.addToCartText || 'Add to Cart'}
              </button>
            )}

            <button
              className='cio:w-full cio:bg-gray-100 cio:hover:bg-gray-200 cio:text-gray-700 cio:py-2 cio:px-4 cio:rounded-lg cio:text-sm cio:font-medium cio:transition-colors cio:border-0 cio:cursor-pointer'
              onClick={() => console.log(`Quick view for ${renderProps.product.name}`)}>
              👁️ Quick View
            </button>

            {renderProps.product.tags && renderProps.product.tags.length > 0 && (
              <div className='cio:flex cio:flex-col cio:gap-1 cio:items-center'>
                {renderProps.product.tags.map((tag) => (
                  <span key={tag} className='cio:text-xs cio:text-gray-500'>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </ProductCard.Footer>
    </ProductCard>
  ),
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
  // Hide from sidebar but keep available for Canvas
  tags: ['!dev'],
};

// --- Usage Examples

export const ComponentOverrideExample: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      description: 'Premium golf pants designed for comfort and performance on the course',
      price: '899',
      salePrice: '699',
      rating: 4.8,
      reviewsCount: 2713,
      tags: ['Same day delivery', 'Free assembly'],
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
    addToCartText: 'Add to Cart',
    componentOverrides: {
      footer: {
        addToCartButton: {
          reactNode: (props: {
            onAddToCart?: (e: React.MouseEvent, product: Product) => void;
            addToCartText?: string;
            product: Product;
          }) => (
            <button
              className='cio:w-full cio:bg-gradient-to-r cio:from-purple-500 cio:to-pink-500 cio:hover:from-purple-600 cio:hover:to-pink-600 cio:text-white cio:py-2 cio:px-4 cio:rounded-lg cio:font-medium cio:transition-all cio:duration-200 cio:transform cio:hover:scale-105'
              onClick={(e) => props.onAddToCart && props.onAddToCart(e, props.product)}>
              🛒 {props.addToCartText || 'Add to Cart'}
            </button>
          ),
        },
      },
    },
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
  // '!autodocs' removes this story from being rendered as part of the <Stories /> component in the auto-generated docs.
  // '!dev' prevents a story from being listed in the sidebar.
  tags: ['!autodocs', '!dev'],
};

export const DataAttributesExample: Story = {
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      description: 'Premium golf pants designed for comfort and performance on the course',
      price: '899',
      rating: 4.8,
      reviewsCount: 2713,
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
    addToCartText: 'Add to Cart',
    // @ts-expect-error: Data Attribute
    'data-cnstrc-item-id': 'product-123',
    'data-cnstrc-price': 29.99,
    'data-cnstrc-category': 'electronics',
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
  // '!autodocs' removes this story from being rendered as part of the <Stories /> component in the auto-generated docs.
  // '!dev' prevents a story from being listed in the sidebar.
  tags: ['!autodocs', '!dev'],
};

export const RenderPropsExample: Story = {
  render: (args) => (
    <ProductCard {...args}>
      {(renderProps: ProductCardProps) => (
        <div className='cio:p-4 cio:bg-gradient-to-br cio:from-blue-50 cio:to-indigo-100 cio:rounded-lg'>
          <div className='cio:flex cio:items-center cio:gap-3 cio:mb-3'>
            {renderProps.product.imageUrl && (
              <img
                src={renderProps.product.imageUrl}
                alt={renderProps.product.name}
                className='cio:w-16 cio:h-16 cio:object-cover cio:rounded-lg'
              />
            )}
            <div>
              <h3 className='cio:font-bold cio:text-lg cio:text-gray-800'>
                {renderProps.product.name}
              </h3>
              <p className='cio:text-sm cio:text-gray-600'>{renderProps.product.description}</p>
            </div>
          </div>

          <div className='cio:flex cio:items-center cio:justify-between'>
            <div className='cio:flex cio:items-center cio:gap-2'>
              <span className='cio:text-xl cio:font-bold cio:text-green-600'>
                {renderProps.priceCurrency}
                {renderProps.product.salePrice || renderProps.product.price}
              </span>
              {renderProps.product.salePrice && (
                <span className='cio:text-sm cio:text-gray-400 cio:line-through'>
                  {renderProps.priceCurrency}
                  {renderProps.product.price}
                </span>
              )}
            </div>

            <div className='cio:flex cio:items-center cio:gap-2'>
              <span className='cio:text-yellow-500'>⭐</span>
              <span className='cio:text-sm cio:font-medium'>{renderProps.product.rating}</span>
              <span className='cio:text-sm cio:text-gray-500'>
                ({renderProps.product.reviewsCount})
              </span>
            </div>
          </div>

          {renderProps.onAddToCart && (
            <button
              className='cio:w-full cio:mt-3 cio:bg-indigo-600 cio:hover:bg-indigo-700 cio:text-white cio:py-2 cio:px-4 cio:rounded-lg cio:font-medium cio:transition-colors'
              onClick={(e) =>
                renderProps.onAddToCart && renderProps.onAddToCart(e, renderProps.product)
              }>
              {renderProps.addToCartText || 'Add to Cart'}
            </button>
          )}
        </div>
      )}
    </ProductCard>
  ),
  args: {
    product: {
      id: 'highland-golf-pants',
      variationId: 'highland-golf-pants--navy',
      name: 'Highland Golf Pants',
      imageUrl: DEMO_IMAGE_URL,
      description: 'Premium golf pants designed for comfort and performance on the course',
      price: '899',
      salePrice: '699',
      rating: 4.8,
      reviewsCount: 2713,
    },
    priceCurrency: '$',
    onAddToCart: (e, product) => console.log('Added to cart', e, product),
    onAddToWishlist: (e, product) => console.log('Added to wishlist', e, product),
    addToCartText: 'Add to Cart',
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
  // '!autodocs' removes this story from being rendered as part of the <Stories /> component in the auto-generated docs.
  // '!dev' prevents a story from being listed in the sidebar.
  tags: ['!autodocs', '!dev'],
};
