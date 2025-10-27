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
    itemId: 'norman-chair-basic',
    itemVariationId: 'norman-chair-basic-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
  },
};

// Card with price only
export const WithPrice: Story = {
  args: {
    itemId: 'norman-chair-with-price',
    itemVariationId: 'norman-chair-with-price-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '299',
    itemPriceCurrency: '$',
  },
};

// Card with sale price
export const WithSalePrice: Story = {
  args: {
    itemId: 'norman-chair-sale',
    itemVariationId: 'norman-chair-sale-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '399',
    itemSalePrice: '299',
    itemPriceCurrency: '$',
  },
};

// Card with description
export const WithDescription: Story = {
  args: {
    itemId: 'norman-chair-description',
    itemVariationId: 'norman-chair-description-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '299',
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
  },
};

// Card with rating and reviews
export const WithRatingAndReviews: Story = {
  args: {
    itemId: 'norman-chair-reviews',
    itemVariationId: 'norman-chair-reviews-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '299',
    itemRating: 4.8,
    itemReviewsCount: 2713,
  },
};

// Card with add to cart functionality
export const WithAddToCart: Story = {
  args: {
    itemId: 'norman-chair-cart',
    itemVariationId: 'norman-chair-cart-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '299',
    onAddToCart: (e) => console.log('Added to cart', e),
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
  },
};

// Card with wishlist functionality
export const WithWishlist: Story = {
  args: {
    itemId: 'norman-chair-wishlist',
    itemVariationId: 'norman-chair-wishlist-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '299',
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
  },
  argTypes: {
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
};

// Card with tags
export const WithTags: Story = {
  args: {
    itemId: 'norman-chair-tags',
    itemVariationId: 'norman-chair-tags-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '299',
    itemTags: ['Same day delivery', 'Free shipping'],
  },
};

// Card with custom add to cart text
export const CustomAddToCartText: Story = {
  args: {
    itemId: 'norman-chair-custom-text',
    itemVariationId: 'norman-chair-custom-text-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '299',
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
    itemId: 'designer-lamp-eu',
    itemVariationId: 'designer-lamp-eu-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '150',
    itemSalePrice: '120',
    itemPriceCurrency: '€',
    itemRating: 4.5,
    itemReviewsCount: 89,
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
    itemId: 'designer-office-chair',
    itemVariationId: 'designer-office-chair-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    itemPrice: '899',
    itemSalePrice: '699',
    itemPriceCurrency: '$',
    itemRating: 4.8,
    itemReviewsCount: 2713,
    itemTags: ['Same day delivery', 'Free assembly', '10-year warranty'],
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
    itemId: 'wishlist-chair',
    itemVariationId: 'wishlist-chair-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    itemPrice: '399',
    itemPriceCurrency: '$',
    itemRating: 4.5,
    itemReviewsCount: 156,
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
    itemId: 'compound-basic-chair',
    itemVariationId: 'compound-basic-chair-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '299',
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
    itemId: 'compound-full-chair',
    itemVariationId: 'compound-full-chair-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    itemPrice: '899',
    itemSalePrice: '699',
    itemPriceCurrency: '$',
    itemRating: 4.8,
    itemReviewsCount: 2713,
    itemTags: ['Same day delivery', 'Free assembly', '10-year warranty'],
    onItemClick: () => console.log('Product clicked'),
    addToCartText: 'Add to Cart',
  },
  render: (args) => (
    <ProductCard {...args}>
      <ProductCard.ImageSection>
        <ProductCard.WishlistButton onAddToWishlist={(e) => console.log('Added to wishlist', e)} />
      </ProductCard.ImageSection>
      <ProductCard.Content>
        <ProductCard.PriceSection />
        <ProductCard.TitleSection />
        <ProductCard.DescriptionSection />
        <ProductCard.RatingSection />
      </ProductCard.Content>
      <ProductCard.Footer>
        <ProductCard.AddToCartButton onAddToCart={(e) => console.log('Added to cart', e)} />
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
    itemId: 'compound-custom-chair',
    itemVariationId: 'compound-custom-chair-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '599',
    itemSalePrice: '449',
    itemPriceCurrency: '$',
    itemRating: 4.7,
    itemReviewsCount: 156,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    itemTags: ['Premium', 'Fast Shipping'],
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
    itemId: 'compound-grid-chair',
    itemVariationId: 'compound-grid-chair-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '799',
    itemPriceCurrency: '$',
    itemRating: 4.8,
    itemReviewsCount: 203,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
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
    itemId: 'compound-minimal-chair',
    itemVariationId: 'compound-minimal-chair-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '199',
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
    itemId: 'custom-override-chair',
    itemVariationId: 'custom-override-chair-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '599',
    itemSalePrice: '449',
    itemPriceCurrency: '$',
    itemRating: 4.7,
    itemReviewsCount: 892,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    itemTags: ['Premium', 'Limited Edition'],
    onAddToCart: (e) => console.log('Added to cart', e),
    onAddToWishlist: (e) => console.log('Added to wishlist', e),
    children: (props) => <CompleteCustomOverrideCard {...props} />,
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
    onAddToWishlist: { action: 'add to wishlist clicked' },
  },
};

// Compact list-style override
export const CompactListStyle: Story = {
  args: {
    itemId: 'compact-list-chair',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '249',
    itemSalePrice: '199',
    itemPriceCurrency: '$',
    itemRating: 4.3,
    itemReviewsCount: 156,
    onAddToCart: (e) => console.log('Added to cart', e),
    children: (props) => <CompactListStyleCard {...props} />,
  },
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
  },
};

// Example customization overrides for different sections
const priceOverride = {
  reactNode: (props) => (
    <div className='bg-green-100 p-2 rounded border-l-4 border-green-500'>
      <span className='text-green-800 font-bold text-lg'>Special: ${props.itemPrice}</span>
    </div>
  ),
};

const titleOverride = {
  reactNode: (props) => (
    <h3 className='text-xl font-bold text-purple-600 underline'>{props.itemName}</h3>
  ),
};

const addToCartButtonOverride = {
  reactNode: (props) => (
    <button
      className='w-full bg-gradient-to-r from-purple-500
to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all cursor-pointer'
      onClick={(e) => props.onAddToCart && props.onAddToCart(e)}>
      🛒 Add
    </button>
  ),
};

const wishlistButtonOverride = {
  reactNode: (props) => (
    <button
      className='absolute top-2 right-2 bg-white
text-white px-1 rounded-md hover:bg-red-200 transition-colors cursor-pointer'
      onClick={(e) => props.onAddToWishlist && props.onAddToWishlist(e)}>
      ❤️
    </button>
  ),
};

const footerOverride = {
  reactNode: (props) => (
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
        {props.itemTags && props.itemTags.length > 0 && (
          <div className='flex flex-wrap gap-1'>
            {props.itemTags.map((tag, index) => (
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
    itemId: 'custom-price-chair',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '599',
    itemPriceCurrency: '$',
    itemRating: 4.8,
    itemReviewsCount: 156,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
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
    itemId: 'custom-title-chair',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '449',
    itemPriceCurrency: '$',
    itemRating: 4.5,
    itemReviewsCount: 89,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
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
    itemId: 'custom-button-chair',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '399',
    itemPriceCurrency: '$',
    itemRating: 4.3,
    itemReviewsCount: 67,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
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
    itemId: 'custom-wishlist-chair',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '529',
    itemPriceCurrency: '$',
    itemRating: 4.7,
    itemReviewsCount: 123,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
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
    itemId: 'custom-footer-chair',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '649',
    itemPriceCurrency: '$',
    itemRating: 4.8,
    itemReviewsCount: 198,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    itemTags: ['Premium Quality', 'Fast Delivery', 'Eco-Friendly'],
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
    itemId: 'multiple-custom-chair',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '699',
    itemPriceCurrency: '$',
    itemRating: 4.9,
    itemReviewsCount: 234,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    itemTags: ['All Custom', 'Premium', 'Limited Edition'],
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
// Compound Components with Component Overrides
// ==========================================

// Custom price rendering using compound components with component overrides
export const CompoundComponentsWithComponentOverrides: Story = {
  args: {
    itemId: 'component-overrides-compound-chair',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '899',
    itemSalePrice: '699',
    itemPriceCurrency: '$',
    itemRating: 4.9,
    itemReviewsCount: 342,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    onAddToCart: (e) => console.log('Added to cart', e),
  },
  render: (args) => (
    <ProductCard {...args}>
      <ProductCard.ImageSection />
      <ProductCard.Content>
        <ProductCard.TitleSection />
        <ProductCard.DescriptionSection />

        {/* Using compound component with custom component overrides */}
        <ProductCard.PriceSection
          componentOverrides={{
            reactNode: (renderProps) => (
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
                        {renderProps.itemSalePrice || renderProps.itemPrice}
                      </span>
                      {renderProps.itemSalePrice && (
                        <span className='text-sm text-gray-500 line-through'>
                          {renderProps.itemPriceCurrency}
                          {renderProps.itemPrice}
                        </span>
                      )}
                    </div>
                    {renderProps.itemSalePrice && (
                      <span className='text-xs text-emerald-600 font-medium mt-1'>
                        Save {renderProps.itemPriceCurrency}
                        {Number(renderProps.itemPrice) - Number(renderProps.itemSalePrice)}
                      </span>
                    )}
                  </div>
                  <div className='bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold'>
                    {renderProps.itemSalePrice
                      ? `${Math.round(
                          ((Number(renderProps.itemPrice) - Number(renderProps.itemSalePrice)) /
                            Number(renderProps.itemPrice)) *
                            100,
                        )}% OFF`
                      : 'Best Price'}
                  </div>
                </div>
              </div>
            ),
          }}
        />

        <ProductCard.RatingSection />
        <ProductCard.AddToCartButton />
      </ProductCard.Content>
    </ProductCard>
  ),
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' },
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
    itemId: 'compound-render-props-chair',
    itemVariationId: 'compound-render-props-chair-variation',
    itemName: "Norman's Chair",
    itemImageUrl: DEMO_IMAGE_URL,
    itemPrice: '899',
    itemSalePrice: '699',
    itemPriceCurrency: '$',
    itemRating: 4.9,
    itemReviewsCount: 456,
    itemDescription: 'A comfortable and stylish chair perfect for any modern home',
    itemTags: ['Premium', 'Custom Layout'],
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
        {(renderProps) => (
          <>
            <div className='flex items-baseline gap-2'>
              <span className='text-lg font-bold'>
                {renderProps.itemPriceCurrency}&nbsp;
                {renderProps.itemSalePrice || renderProps.itemPrice}
              </span>
              {renderProps.itemSalePrice && (
                <span className='text-sm text-gray-400 line-through'>
                  {renderProps.itemPriceCurrency}&nbsp;
                  {renderProps.itemPrice}
                </span>
              )}
            </div>

            <p className='text-base font-medium'>{renderProps.itemName}</p>

            <div className='bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 my-2'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-blue-600 font-semibold text-sm'>🎯 Smart Recommendation</span>
              </div>
              <p className='text-gray-700 text-sm'>
                Based on your preferences, this {renderProps.itemName} is perfect for you!
                {renderProps.itemSalePrice && (
                  <span className='text-green-600 font-medium'>
                    {' '}
                    Save ${Number(renderProps.itemPrice) - Number(renderProps.itemSalePrice)} today!
                  </span>
                )}
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'>
                  ⭐ {renderProps.itemRating} rating
                </span>
                <span className='bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full'>
                  💬 {renderProps.itemReviewsCount} reviews
                </span>
              </div>
            </div>

            {renderProps.itemDescription && (
              <p className='text-sm text-gray-500'>{renderProps.itemDescription}</p>
            )}
          </>
        )}
      </ProductCard.Content>

      {/* Footer section with pure render props - all children are inside a render prop function */}
      <ProductCard.Footer>
        {(renderProps) => (
          <div className='space-y-2'>
            <div className='flex gap-2 text-xs text-gray-600'>
              <span className='flex items-center gap-1'>🚚 Free shipping on orders over $500</span>
            </div>

            {renderProps.onAddToCart && (
              <button
                className='w-full bg-black hover:bg-gray-800 text-white text-sm py-2 px-4 rounded-lg font-medium transition-colors'
                onClick={(e) => renderProps.onAddToCart(e)}>
                {renderProps.addToCartText || 'Add to Cart'}
              </button>
            )}

            <button
              className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors'
              onClick={() => console.log(`Quick view for ${renderProps.itemName}`)}>
              👁️ Quick View
            </button>

            {renderProps.itemTags && renderProps.itemTags.length > 0 && (
              <div className='flex flex-col gap-1 items-center'>
                {renderProps.itemTags.map((tag) => (
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
