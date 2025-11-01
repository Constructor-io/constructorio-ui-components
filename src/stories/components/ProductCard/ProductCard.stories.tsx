import type { Meta, StoryObj } from '@storybook/react-vite';
import ProductCard from '../../../components/product-card';
import '@/styles.css';
import { CompleteCustomOverrideCard, CompactListStyleCard } from './ProductCardVariants';
import { ProductCardProps } from '../../../types/product-card-types';

const DEMO_IMAGE_URL =
  'https://magnoliahome.co.in/wp-content/uploads/2021/08/Jasper-Arm-Chair-1.1-1.jpg';

const meta = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    itemId: { control: 'text' },
    itemName: { control: 'text' },
    itemVariationId: { control: 'text' },
    itemDescription: { control: 'text' },
    itemImageUrl: { control: 'text' },
    itemPrice: { control: 'text' },
    itemPriceCurrency: { control: 'text' },
    itemSalePrice: { control: 'text' },
    itemRating: { control: 'number' },
    itemReviewsCount: { control: 'number' },
    addToCartText: { control: 'text' },
    itemTags: { control: 'object' },
    itemSlCampaignId: { control: 'text' },
    itemSlCampaignOwner: { control: 'text' },
    isInWishlist: { control: 'boolean' },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<ProductCardProps>;

// Basic card with minimal props
export const Basic: Story = {
  args: {
    product: {
      itemId: 'norman-chair-basic',
      itemVariationId: 'norman-chair-basic-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
    },
  },
};

// Card with price only
export const WithPrice: Story = {
  args: {
    product: {
      itemId: 'norman-chair-with-price',
      itemVariationId: 'norman-chair-with-price-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '299',
    },
    itemPriceCurrency: '$',
  },
};

// Card with sale price
export const WithSalePrice: Story = {
  args: {
    product: {
      itemId: 'norman-chair-sale',
      itemVariationId: 'norman-chair-sale-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '399',
      itemSalePrice: '299',
    },
    itemPriceCurrency: '$',
  },
};

// Card with description
export const WithDescription: Story = {
  args: {
    product: {
      itemId: 'norman-chair-description',
      itemVariationId: 'norman-chair-description-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '299',
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    },
  },
};

// Card with rating and reviews
export const WithRatingAndReviews: Story = {
  args: {
    product: {
      itemId: 'norman-chair-reviews',
      itemVariationId: 'norman-chair-reviews-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '299',
      itemRating: 4.8,
      itemReviewsCount: 2713,
    },
  },
};

// Card with add to cart functionality
export const WithAddToCart: Story = {
  args: {
    product: {
      itemId: 'norman-chair-cart',
      itemVariationId: 'norman-chair-cart-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '299',
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
      itemId: 'norman-chair-wishlist',
      itemVariationId: 'norman-chair-wishlist-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '299',
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
      itemId: 'norman-chair-tags',
      itemVariationId: 'norman-chair-tags-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '299',
      itemTags: ['Same day delivery', 'Free shipping'],
    },
  },
};

// Card with custom add to cart text
export const CustomAddToCartText: Story = {
  args: {
    product: {
      itemId: 'norman-chair-custom-text',
      itemVariationId: 'norman-chair-custom-text-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '299',
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
      itemId: 'designer-lamp-eu',
      itemVariationId: 'designer-lamp-eu-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '150',
      itemSalePrice: '120',
      itemRating: 4.5,
      itemReviewsCount: 89,
    },
    itemPriceCurrency: '€',
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
    onItemClick: { action: 'item clicked' },
  },
};

// Product with all features enabled
export const FullyFeatured: Story = {
  args: {
    product: {
      itemId: 'designer-office-chair',
      itemVariationId: 'designer-office-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
      itemPrice: '899',
      itemSalePrice: '699',
      itemRating: 4.8,
      itemReviewsCount: 2713,
      itemTags: ['Same day delivery', 'Free assembly', '10-year warranty'],
    },
    itemPriceCurrency: '$',
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
    onItemClick: () => console.log('Product clicked'),
    addToCartText: 'Add to Cart',
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
    onItemClick: { action: 'item clicked' },
  },
};

// Card with item already in wishlist
export const InWishlist: Story = {
  args: {
    product: {
      itemId: 'wishlist-chair',
      itemVariationId: 'wishlist-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
      itemPrice: '399',
      itemRating: 4.5,
      itemReviewsCount: 156,
    },
    itemPriceCurrency: '$',
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
      itemId: 'compound-basic-chair',
      itemVariationId: 'compound-basic-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '299',
    },
    itemPriceCurrency: '$',
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
      itemId: 'compound-full-chair',
      itemVariationId: 'compound-full-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
      itemPrice: '899',
      itemSalePrice: '699',
      itemRating: 4.8,
      itemReviewsCount: 2713,
      itemTags: ['Same day delivery', 'Free assembly', '10-year warranty'],
    },
    itemPriceCurrency: '$',
    onItemClick: () => console.log('Product clicked'),
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
    onItemClick: { action: 'item clicked' },
  },
  // Hide from sidebar but keep available for Canvas
  tags: ['!dev'],
};

// Custom layout with compound components - Price after title and description
export const CompoundCustomLayout: Story = {
  args: {
    product: {
      itemId: 'compound-custom-chair',
      itemVariationId: 'compound-custom-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '599',
      itemSalePrice: '449',
      itemRating: 4.7,
      itemReviewsCount: 156,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
      itemTags: ['Premium', 'Fast Shipping'],
    },
    itemPriceCurrency: '$',
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
      itemId: 'compound-grid-chair',
      itemVariationId: 'compound-grid-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '799',
      itemRating: 4.8,
      itemReviewsCount: 203,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    },
    itemPriceCurrency: '$',
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
      itemId: 'compound-minimal-chair',
      itemVariationId: 'compound-minimal-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '199',
    },
    itemPriceCurrency: '$',
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
      itemId: 'custom-override-chair',
      itemVariationId: 'custom-override-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '599',
      itemSalePrice: '449',
      itemRating: 4.7,
      itemReviewsCount: 892,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
      itemTags: ['Premium', 'Limited Edition'],
    },
    itemPriceCurrency: '$',
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
      itemId: 'compact-list-chair',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '249',
      itemSalePrice: '199',
      itemRating: 4.3,
      itemReviewsCount: 156,
    },
    itemPriceCurrency: '$',
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
    <div
      className='bg-gradient-to-r from-emerald-50 to-teal-5
0 border border-emerald-200 rounded-lg p-4 mt-2'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <span className='text-xs text-emerald-600 font-medium uppercase tracking-wide'>
            Special Offer
          </span>
          <div className='flex items-baseline gap-2 mt-1'>
            <span className='text-2xl font-bold text-emerald-800'>
              {renderProps.itemPriceCurrency}
              {renderProps.product.itemSalePrice || renderProps.product.itemPrice}
            </span>
            {renderProps.product.itemSalePrice && (
              <span className='text-sm text-gray-500 line-through'>
                {renderProps.itemPriceCurrency}
                {renderProps.product.itemPrice}
              </span>
            )}
          </div>
          {renderProps.product.itemSalePrice && (
            <span className='text-xs text-emerald-600 font-medium mt-1'>
              Save {renderProps.itemPriceCurrency}
              {Number(renderProps.product.itemPrice) - Number(renderProps.product.itemSalePrice)}
            </span>
          )}
        </div>
        <div className='bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold'>
          {renderProps.product.itemSalePrice
            ? `${Math.round(
                ((Number(renderProps.product.itemPrice) -
                  Number(renderProps.product.itemSalePrice)) /
                  Number(renderProps.product.itemPrice)) *
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
    <h3 className='text-xl font-bold text-purple-600 underline'>{props.product.itemName}</h3>
  ),
};

const addToCartButtonOverride = {
  reactNode: (props: ProductCardProps) => (
    <button
      className='w-full bg-gradient-to-r from-purple-500
to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all cursor-pointer'
      onClick={(e) => props.onAddToCart && props.onAddToCart(e)}>
      🛒 Add
    </button>
  ),
};

const wishlistButtonOverride = {
  reactNode: (props: ProductCardProps) => (
    <button
      className='absolute top-2 right-2 bg-white
text-white px-1 rounded-md hover:bg-red-200 transition-colors cursor-pointer'
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
bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer'
            onClick={(e) => props.onAddToCart && props.onAddToCart(e)}>
            🛒 Quick Buy
          </button>
          <button
            className='flex-1 bg-white hover:bg-gray-50 text-
blue-600 border border-blue-600 py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer'
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
        {props.product.itemTags && props.product.itemTags.length > 0 && (
          <div className='flex flex-wrap gap-1'>
            {props.product.itemTags.map((tag, index) => (
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
      itemId: 'custom-price-chair',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '599',
      itemRating: 4.8,
      itemReviewsCount: 156,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    },
    itemPriceCurrency: '$',
    onAddToCart: (e) => console.log('Added to cart', e),
    componentOverrides: {
      price: priceOverride,
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
      itemId: 'custom-title-chair',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '449',
      itemRating: 4.5,
      itemReviewsCount: 89,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    },
    itemPriceCurrency: '$',
    onAddToCart: (e) => console.log('Added to cart', e),
    componentOverrides: {
      title: titleOverride,
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
      itemId: 'custom-button-chair',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '399',
      itemRating: 4.3,
      itemReviewsCount: 67,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    },
    itemPriceCurrency: '$',
    onAddToCart: (e) => console.log('Added to cart', e),
    componentOverrides: {
      addToCartButton: addToCartButtonOverride,
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
      itemId: 'custom-wishlist-chair',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '529',
      itemRating: 4.7,
      itemReviewsCount: 123,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    },
    itemPriceCurrency: '$',
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
    componentOverrides: {
      wishlistButton: wishlistButtonOverride,
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
      itemId: 'custom-footer-chair',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '649',
      itemRating: 4.8,
      itemReviewsCount: 198,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
      itemTags: ['Premium Quality', 'Fast Delivery', 'Eco-Friendly'],
    },
    itemPriceCurrency: '$',
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
      itemId: 'multiple-custom-chair',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '699',
      itemRating: 4.9,
      itemReviewsCount: 234,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
      itemTags: ['All Custom', 'Premium', 'Limited Edition'],
    },
    itemPriceCurrency: '$',
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
    componentOverrides: {
      price: priceOverride,
      title: titleOverride,
      addToCartButton: addToCartButtonOverride,
      wishlistButton: wishlistButtonOverride,
      footer: footerOverride,
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
      itemId: 'compound-props-override-chair',
      itemVariationId: 'compound-props-override-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '599',
      itemSalePrice: '449',
      itemRating: 4.5,
      itemReviewsCount: 156,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
      itemTags: ['Standard Shipping'],
    },
    itemPriceCurrency: '$',
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
        <ProductCard.TitleSection itemName="Premium Edition - Norman's Chair" />

        {/* Override price with promotional pricing */}
        <ProductCard.PriceSection itemPrice='799' itemSalePrice='399' itemPriceCurrency='$' />

        {/* Override rating with different values */}
        <ProductCard.RatingSection itemRating='4.9' itemReviewsCount='500' />

        <ProductCard.DescriptionSection />
      </ProductCard.Content>

      <ProductCard.Footer>
        {/* Override tags with promotional tags */}
        <ProductCard.TagsSection
          itemTags={['🎉 50% OFF', '🚚 Express Shipping', '🎁 Gift Wrap Available']}
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
      itemId: 'compound-render-props-chair',
      itemVariationId: 'compound-render-props-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemPrice: '899',
      itemSalePrice: '699',
      itemRating: 4.9,
      itemReviewsCount: 456,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
      itemTags: ['Premium', 'Custom Layout'],
    },
    itemPriceCurrency: '$',
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
                {renderProps.itemPriceCurrency}&nbsp;
                {renderProps.product.itemSalePrice || renderProps.product.itemPrice}
              </span>
              {renderProps.product.itemSalePrice && (
                <span className='text-sm text-gray-400 line-through'>
                  {renderProps.itemPriceCurrency}&nbsp;
                  {renderProps.product.itemPrice}
                </span>
              )}
            </div>

            <p className='text-base font-medium'>{renderProps.product.itemName}</p>

            <div className='bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 my-2'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-blue-600 font-semibold text-sm'>🎯 Smart Recommendation</span>
              </div>
              <p className='text-gray-700 text-sm'>
                Based on your preferences, this {renderProps.product.itemName} is perfect for you!
                {renderProps.product.itemSalePrice && (
                  <span className='text-green-600 font-medium'>
                    {' '}
                    Save $
                    {Number(renderProps.product.itemPrice) -
                      Number(renderProps.product.itemSalePrice)}{' '}
                    today!
                  </span>
                )}
              </p>
              <div className='flex items-center gap-2 mt-2 justify-center'>
                <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full text-center'>
                  ⭐ {renderProps.product.itemRating} rating
                </span>
                <span className='bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full text-center'>
                  💬 {renderProps.product.itemReviewsCount} reviews
                </span>
              </div>
            </div>

            {renderProps.product.itemDescription && (
              <p className='text-sm text-gray-500'>{renderProps.product.itemDescription}</p>
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
                className='w-full bg-black hover:bg-gray-800 text-white text-sm py-2 px-4 rounded-lg font-medium transition-colors'
                onClick={(e) => renderProps.onAddToCart && renderProps.onAddToCart(e)}>
                {renderProps.addToCartText || 'Add to Cart'}
              </button>
            )}

            <button
              className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors'
              onClick={() => console.log(`Quick view for ${renderProps.product.itemName}`)}>
              👁️ Quick View
            </button>

            {renderProps.product.itemTags && renderProps.product.itemTags.length > 0 && (
              <div className='flex flex-col gap-1 items-center'>
                {renderProps.product.itemTags.map((tag) => (
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
      itemId: 'component-override-chair',
      itemVariationId: 'component-override-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
      itemPrice: '899',
      itemSalePrice: '699',
      itemRating: 4.8,
      itemReviewsCount: 2713,
      itemTags: ['Same day delivery', 'Free assembly'],
    },
    itemPriceCurrency: '$',
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
    addToCartText: 'Add to Cart',
    componentOverrides: {
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
      itemId: 'data-attributes-chair',
      itemVariationId: 'data-attributes-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
      itemPrice: '899',
      itemRating: 4.8,
      itemReviewsCount: 2713,
    },
    itemPriceCurrency: '$',
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
            {renderProps.product.itemImageUrl && (
              <img
                src={renderProps.product.itemImageUrl}
                alt={renderProps.product.itemName}
                className='w-16 h-16 object-cover rounded-lg'
              />
            )}
            <div>
              <h3 className='font-bold text-lg text-gray-800'>{renderProps.product.itemName}</h3>
              <p className='text-sm text-gray-600'>{renderProps.product.itemDescription}</p>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='text-xl font-bold text-green-600'>
                {renderProps.itemPriceCurrency}
                {renderProps.product.itemSalePrice || renderProps.product.itemPrice}
              </span>
              {renderProps.product.itemSalePrice && (
                <span className='text-sm text-gray-400 line-through'>
                  {renderProps.itemPriceCurrency}
                  {renderProps.product.itemPrice}
                </span>
              )}
            </div>

            <div className='flex items-center gap-2'>
              <span className='text-yellow-500'>⭐</span>
              <span className='text-sm font-medium'>{renderProps.product.itemRating}</span>
              <span className='text-sm text-gray-500'>
                ({renderProps.product.itemReviewsCount})
              </span>
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
      itemId: 'render-props-chair',
      itemVariationId: 'render-props-chair-variation',
      itemName: "Norman's Chair",
      itemImageUrl: DEMO_IMAGE_URL,
      itemDescription: 'A comfortable and stylish chair perfect for any modern home',
      itemPrice: '899',
      itemSalePrice: '699',
      itemRating: 4.8,
      itemReviewsCount: 2713,
    },
    itemPriceCurrency: '$',
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
