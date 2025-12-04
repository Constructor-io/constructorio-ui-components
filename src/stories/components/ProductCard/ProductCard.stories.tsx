import type { Meta, StoryObj } from '@storybook/react-vite';
import ProductCard from '@/components/product-card';
import '@/styles.css';
import {
  CompleteCustomOverrideCard,
  CompactListStyleCard,
} from '@/stories/components/ProductCard/ProductCardVariants';
import { ProductCardProps } from '@/types/product-card-types';

const DEMO_IMAGE_URL =
  'https://constructorio-integrations.s3.amazonaws.com/tikus-threads/2022-06-29/PANT_ACTIVE-PANT_GWB00623SBL770_1_category.jpg';

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
    onAddToCart: (e) => console.log('Added to cart', e),
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
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
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
    onAddToCart: (e) => console.log('Added to cart', e),
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
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
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
    },
    priceCurrency: '$',
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
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
    onAddToWishlist: (e) => console.log('Removed from wishlist', e),
    onAddToCart: (e) => console.log('Added to cart', e),
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'remove from wishlist clicked' },
  },
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
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
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
          onAddToWishlist={(e: React.MouseEvent) => console.log('Added to wishlist', e)}
        />
      </ProductCard.ImageSection>
      <ProductCard.Content>
        <ProductCard.PriceSection />
        <ProductCard.TitleSection />
        <ProductCard.DescriptionSection />
        <ProductCard.RatingSection />
      </ProductCard.Content>
      <ProductCard.Footer>
        <ProductCard.AddToCartButton
          onAddToCart={(e: React.MouseEvent) => console.log('Added to cart', e)}
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
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
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
    onAddToCart: (e) => console.log('Added to cart', e),
    className: 'overflow-hidden max-w-md',
  },
  render: (args) => (
    <ProductCard {...args}>
      <div className='grid grid-cols-2 gap-4 p-4'>
        <ProductCard.ImageSection />
        <div className='space-y-2'>
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
    onAddToCart: (e) => console.log('Added to cart', e),
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
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
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
    onAddToCart: (e) => console.log('Added to cart', e),
    children: (props: ProductCardProps) => <CompactListStyleCard {...props} />,
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
  },
};

// Example customization overrides for different sections
const priceOverride = {
  reactNode: (renderProps: ProductCardProps) => (
    <div className='bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4 my-2'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <span className='text-xs text-emerald-600 font-medium uppercase tracking-wide'>
            Special Offer
          </span>
          <div className='flex items-baseline gap-2 mt-1'>
            <span className='text-2xl font-bold text-emerald-800'>
              {renderProps.priceCurrency}
              {renderProps.product.salePrice || renderProps.product.price}
            </span>
            {renderProps.product.salePrice && (
              <span className='text-sm text-gray-500 line-through'>
                {renderProps.priceCurrency}
                {renderProps.product.price}
              </span>
            )}
          </div>
          {renderProps.product.salePrice && (
            <span className='text-xs text-emerald-600 font-medium mt-1'>
              Save {renderProps.priceCurrency}
              {Number(renderProps.product.price) - Number(renderProps.product.salePrice)}
            </span>
          )}
        </div>
        <div className='bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold'>
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
    <h3 className='text-xl font-bold text-purple-600 underline'>{props.product.name}</h3>
  ),
};

const addToCartButtonOverride = {
  reactNode: (props: { onAddToCart?: (e: React.MouseEvent) => void; addToCartText?: string }) => (
    <button
      className='w-full bg-gradient-to-r from-purple-500
to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all cursor-pointer border-0'
      onClick={(e) => props.onAddToCart && props.onAddToCart(e)}>
      🛒 {props.addToCartText || 'Add to Cart'}
    </button>
  ),
};

const wishlistButtonOverride = {
  reactNode: (props: ProductCardProps) => (
    <button
      className='absolute top-2 right-2 bg-white
text-white px-1 rounded-md hover:bg-red-200 transition-colors cursor-pointer border-0'
      onClick={(e) => props.onAddToWishlist && props.onAddToWishlist(e)}>
      ❤️
    </button>
  ),
};

const footerOverride = {
  reactNode: (props: ProductCardProps) => (
    <div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200'>
      <div className='flex flex-col gap-3'>
        {/* Custom action buttons */}
        <div className='flex flex-col gap-2'>
          <button
            className='flex-1 bg-blue-600 hover:
bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer border-0'
            onClick={(e) => props.onAddToCart && props.onAddToCart(e)}>
            🛒 Quick Buy
          </button>
          <button
            className='flex-1 bg-white hover:bg-gray-50 text-
blue-600 border border-blue-600 py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer border-0'
            onClick={() => console.log('Compare clicked')}>
            ⚖️ Compare
          </button>
        </div>
        {/* Custom info section */}
        <div className='flex flex-col gap-2 items-center justify-between text-sm text-gray-600'>
          <span className='flex items-center gap-1'>🚚 Free shipping</span>
          <span className='flex items-center gap-1'>🔄 30-day returns</span>
        </div>
        {/* Custom tags display */}
        {props.product.tags && props.product.tags.length > 0 && (
          <div className='flex flex-wrap gap-1 justify-center'>
            {props.product.tags.map((tag, index) => (
              <span
                key={index}
                className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'>
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
    onAddToCart: (e) => console.log('Added to cart', e),
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
    onAddToCart: (e) => console.log('Added to cart', e),
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
    onAddToCart: (e) => console.log('Added to cart', e),
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
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
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
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
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
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
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
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
  },
  render: (args) => (
    <ProductCard {...args}>
      <ProductCard.ImageSection>
        {/* Override wishlist handler for this specific button */}
        <ProductCard.WishlistButton
          onAddToWishlist={(e: React.MouseEvent) => {
            e.stopPropagation();
            console.log('Custom wishlist handler - adding to favorites!', e);
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
          onAddToCart={(e: React.MouseEvent) => {
            e.stopPropagation();
            console.log('Special promotional purchase!', e);
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
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
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
            <div className='flex items-baseline gap-2'>
              <span className='text-lg font-bold'>
                {renderProps.priceCurrency}
                {renderProps.product.salePrice || renderProps.product.price}
              </span>
              {renderProps.product.salePrice && (
                <span className='text-sm text-gray-400 line-through'>
                  {renderProps.priceCurrency}
                  {renderProps.product.price}
                </span>
              )}
            </div>

            <p className='text-base font-medium'>{renderProps.product.name}</p>

            <div className='bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 my-2'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-blue-600 font-semibold text-sm'>🎯 Smart Recommendation</span>
              </div>
              <p className='text-gray-700 text-sm'>
                Based on your preferences, this {renderProps.product.name} is perfect for you!
                {renderProps.product.salePrice && (
                  <span className='text-green-600 font-medium'>
                    {' '}
                    Save $
                    {Number(renderProps.product.price) - Number(renderProps.product.salePrice)}{' '}
                    today!
                  </span>
                )}
              </p>
              <div className='flex items-center gap-2 mt-2 justify-center'>
                <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full text-center'>
                  ⭐ {renderProps.product.rating} rating
                </span>
                <span className='bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full text-center'>
                  💬 {renderProps.product.reviewsCount} reviews
                </span>
              </div>
            </div>

            {renderProps.product.description && (
              <p className='text-sm text-gray-500'>{renderProps.product.description}</p>
            )}
          </>
        )}
      </ProductCard.Content>

      {/* Footer section with pure render props - all children are inside a render prop function */}
      <ProductCard.Footer>
        {(renderProps: ProductCardProps) => (
          <div className='space-y-2'>
            <div className='flex gap-2 text-xs text-gray-600'>
              <span className='flex items-center gap-1'>🚚 Free shipping on orders over $500</span>
            </div>

            {renderProps.onAddToCart && (
              <button
                className='w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors'
                onClick={(e) => renderProps.onAddToCart && renderProps.onAddToCart(e)}>
                {renderProps.addToCartText || 'Add to Cart'}
              </button>
            )}

            <button
              className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors'
              onClick={() => console.log(`Quick view for ${renderProps.product.name}`)}>
              👁️ Quick View
            </button>

            {renderProps.product.tags && renderProps.product.tags.length > 0 && (
              <div className='flex flex-col gap-1 items-center'>
                {renderProps.product.tags.map((tag) => (
                  <span key={tag} className='text-xs text-gray-500'>
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
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
    addToCartText: 'Add to Cart',
    componentOverrides: {
      footer: {
        addToCartButton: {
          reactNode: (props: {
            onAddToCart?: (e: React.MouseEvent) => void;
            addToCartText?: string;
          }) => (
            <button
              className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105'
              onClick={(e) => props.onAddToCart && props.onAddToCart(e)}>
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
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
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
        <div className='p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg'>
          <div className='flex items-center gap-3 mb-3'>
            {renderProps.product.imageUrl && (
              <img
                src={renderProps.product.imageUrl}
                alt={renderProps.product.name}
                className='w-16 h-16 object-cover rounded-lg'
              />
            )}
            <div>
              <h3 className='font-bold text-lg text-gray-800'>{renderProps.product.name}</h3>
              <p className='text-sm text-gray-600'>{renderProps.product.description}</p>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='text-xl font-bold text-green-600'>
                {renderProps.priceCurrency}
                {renderProps.product.salePrice || renderProps.product.price}
              </span>
              {renderProps.product.salePrice && (
                <span className='text-sm text-gray-400 line-through'>
                  {renderProps.priceCurrency}
                  {renderProps.product.price}
                </span>
              )}
            </div>

            <div className='flex items-center gap-2'>
              <span className='text-yellow-500'>⭐</span>
              <span className='text-sm font-medium'>{renderProps.product.rating}</span>
              <span className='text-sm text-gray-500'>({renderProps.product.reviewsCount})</span>
            </div>
          </div>

          {renderProps.onAddToCart && (
            <button
              className='w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors'
              onClick={(e) => renderProps.onAddToCart && renderProps.onAddToCart(e)}>
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
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
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
