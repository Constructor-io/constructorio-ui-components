import type { Meta, StoryObj } from '@storybook/react-vite';
import CioCarousel from '../../../components/carousel';
import { Product } from '../../../types/productCardTypes';
import { CarouselRenderProps } from '../../../types/carouselTypes';
import { DEMO_IMAGE_URL } from '../../constants';

const meta = {
  title: 'Components/Carousel',
  component: CioCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof CioCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock product data for ProductCard rendering
const mockProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Product ${i + 1}`,
  description: `This is a description for product ${i + 1}`,
  imageUrl: DEMO_IMAGE_URL,
  price: (Math.random() * 100 + 20).toFixed(2),
  salePrice: Math.random() > 0.5 ? (Math.random() * 80 + 10).toFixed(2) : undefined,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviewsCount: Math.floor(Math.random() * 500 + 10),
  tags: ['Tag 1', 'Tag 2'].slice(0, Math.floor(Math.random() * 3)),
}));

export const Default: Story = {
  args: {
    items: mockProducts,
  },
};

export const Autoplay: Story = {
  args: { items: mockProducts, autoPlay: true },
};

export const NonLooping: Story = {
  args: { items: mockProducts, loop: false },
};

export const Vertical: Story = {
  args: {
    items: mockProducts,
    orientation: 'vertical',
    componentOverrides: {
      item: {
        reactNode: ({ item }: { item: Product }) => (
          <div className='cio:w-[240px] cio:bg-white cio:border cio:rounded-xl cio:p-4 cio:shadow-sm cio:flex cio:flex-col cio:gap-3 cio:self-center'>
            <div className='cio:flex cio:items-center cio:gap-3'>
              <img
                src={item.imageUrl}
                alt={item.name}
                className='cio:w-14 cio:h-14 cio:rounded-full cio:object-cover'
              />
              <div className='cio:flex-1'>
                <p className='cio:text-sm cio:font-semibold'>{item.name}</p>
                <p className='cio:text-xs cio:text-gray-500 cio:line-clamp-2'>{item.description}</p>
              </div>
            </div>
            <div className='cio:flex cio:items-center cio:justify-between cio:text-xs cio:text-gray-600'>
              <span className='cio:font-medium'>${item.price}</span>
              <span>Rating: {item.rating}★</span>
            </div>
          </div>
        ),
      },
    },
  },
};

// Complete custom layout using root-level render props override
export const CompleteCustomOverride: Story = {
  args: {
    items: mockProducts,
    autoPlay: false,
  },
  render: (args: Story['args']) => (
    <CioCarousel
      {...args}
      items={args.items as Product[]}
      componentOverrides={{
        reactNode: (props: CarouselRenderProps<Product>) => (
          <div className='cio:flex cio:flex-col cio:gap-4 cio:w-full cio:overflow-hidden cio:p-4 cio:bg-slate-50 cio:rounded-xl cio:border cio:border-slate-200'>
            <div className='cio:flex cio:items-center cio:justify-between'>
              <div>
                <h2 className='cio:text-lg cio:font-semibold'>Curated products</h2>
                <p className='cio:text-xs cio:text-gray-500 cio:mt-1'>
                  Orientation: {props.orientation} · Items: {props.items?.length ?? 0}
                </p>
              </div>
              <span className='cio:text-[11px] cio:uppercase cio:tracking-wide cio:text-slate-500'>
                Custom root layout
              </span>
            </div>

            <div className='cio:flex cio:items-center cio:gap-3'>
              <CioCarousel.Previous />
              <CioCarousel.Content>
                {props.items?.map((product: Product) => (
                  <CioCarousel.Item key={product.id}>
                    <div className='cio:w-[220px] cio:bg-white cio:border cio:rounded-xl cio:p-4 cio:shadow-sm cio:flex cio:flex-col cio:items-center cio:gap-3'>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className='cio:w-24 cio:h-24 cio:rounded-full cio:object-cover'
                      />
                      <div className='cio:text-center cio:space-y-1'>
                        <p className='cio:text-sm cio:font-semibold'>{product.name}</p>
                        <p className='cio:text-xs cio:text-gray-500 cio:line-clamp-2'>
                          {product.description}
                        </p>
                        <p className='cio:text-sm cio:font-medium'>${product.price}</p>
                      </div>
                    </div>
                  </CioCarousel.Item>
                ))}
              </CioCarousel.Content>
              <CioCarousel.Next />
            </div>
          </div>
        ),
      }}
    />
  ),
};

// Mixed pattern: compound components with render props-based header
export const CompoundWithRenderProps: Story = {
  args: {
    items: mockProducts,
  },
  render: (args: Story['args']) => (
    <CioCarousel items={args.items as Product[]}>
      {(props: CarouselRenderProps<Product>) => (
        <div className='cio:flex cio:flex-col cio:gap-4 cio:w-full cio:overflow-hidden cio:p-4'>
          {/* Header driven by render props */}
          <div className='cio:flex cio:items-center cio:justify-between'>
            <div className='cio:space-y-1'>
              <h2 className='cio:text-lg cio:font-semibold'>Trending now</h2>
              <p className='cio:text-xs cio:text-gray-500'>
                {props.items?.length ?? 0} items ·{' '}
                {props.orientation === 'vertical' ? 'Vertical' : 'Horizontal'} scroll
              </p>
            </div>
            <div className='cio:flex cio:items-center cio:gap-2 cio:text-xs cio:text-gray-500'>
              <span>Slides to scroll: {props.slidesToScroll}</span>
              <span>Loop: {props.loop ? 'On' : 'Off'}</span>
            </div>
          </div>

          {/* Compound components for navigation + content */}
          <div className='cio:flex cio:gap-4 cio:w-full cio:items-center cio:overflow-hidden'>
            <CioCarousel.Previous />
            <CioCarousel.Content>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='cio:w-[220px] cio:bg-white cio:border cio:rounded-xl cio:p-4 cio:shadow-sm cio:flex cio:flex-col cio:items-center cio:gap-2'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='cio:w-24 cio:h-24 cio:rounded-full cio:object-cover'
                    />
                    <div className='cio:text-center'>
                      <p className='cio:text-sm cio:font-medium'>{product.name}</p>
                      <p className='cio:text-xs cio:text-gray-500'>${product.price}</p>
                    </div>
                  </div>
                </CioCarousel.Item>
              ))}
            </CioCarousel.Content>
            <CioCarousel.Next />
          </div>
        </div>
      )}
    </CioCarousel>
  ),
};

export const WithDataAttributes: Story = {
  args: {
    items: mockProducts,
  },
  render: (args: Story['args']) => (
    <CioCarousel
      items={args.items as Product[]}
      data-cnstrc-recommendations
      data-cnstrc-recommendations-pod-id='pod-id'
      data-cnstrc-result-id='result-id'
      data-cnstrc-num-results='10'
    />
  ),
};

type Article = {
  id: string;
  title: string;
  category: string;
  summary: string;
};

const mockArticles: Article[] = [
  {
    id: 'article-1',
    title: 'How to optimize your search experience',
    category: 'Guides',
    summary: 'Best practices for building delightful search and discovery experiences.',
  },
  {
    id: 'article-2',
    title: 'Personalization strategies that actually work',
    category: 'Personalization',
    summary: 'Tactics for tailoring recommendations without overwhelming users.',
  },
  {
    id: 'article-3',
    title: 'Designing carousels that convert',
    category: 'UX',
    summary: 'Patterns for high-performing, accessible product and content carousels.',
  },
  {
    id: 'article-4',
    title: 'The power of search',
    category: 'Search',
    summary: 'How to build a search experience that converts.',
  },
];

export const WithNonProductItems: Story = {
  args: {
    items: mockArticles,
    autoPlay: false,
  },
  render: (args: Story['args']) => (
    <CioCarousel<Article> items={args.items as Article[]}>
      {(props: CarouselRenderProps<Article>) => (
        <div className='cio:flex cio:flex-col cio:gap-4 cio:w-full cio:p-4 cio:bg-white cio:rounded-xl cio:border cio:border-slate-200 cio:overflow-hidden'>
          <div className='cio:flex cio:items-center cio:justify-between'>
            <div>
              <h2 className='cio:text-lg cio:font-semibold'>Featured articles</h2>
              <p className='cio:text-xs cio:text-gray-500 cio:mt-1'>
                {props.items?.length ?? 0} articles ·
                <span className='cio:ml-1'>
                  {props.orientation === 'vertical' ? 'Vertical scroll' : 'Horizontal scroll'}
                </span>
              </p>
            </div>
            <div className='cio:flex cio:flex-col cio:items-end cio:text-xs cio:text-gray-500'>
              <span>Slides to scroll: {props.slidesToScroll}</span>
              <span>Loop: {props.loop ? 'On' : 'Off'}</span>
            </div>
          </div>

          <div className='cio:flex cio:items-center cio:gap-3'>
            <CioCarousel.Previous />
            <CioCarousel.Content>
              {props.items?.map((article: Article) => (
                <CioCarousel.Item key={article.id} item={article}>
                  <article className='cio:w-[260px] cio:bg-slate-50 cio:border cio:rounded-xl cio:p-4 cio:shadow-sm cio:flex cio:flex-col cio:gap-2'>
                    <span className='cio:text-[11px] cio:uppercase cio:tracking-wide cio:text-slate-500'>
                      {article.category}
                    </span>
                    <h3 className='cio:text-sm cio:font-semibold cio:line-clamp-2'>
                      {article.title}
                    </h3>
                    <p className='cio:text-xs cio:text-gray-600 cio:line-clamp-3'>
                      {article.summary}
                    </p>
                  </article>
                </CioCarousel.Item>
              ))}
            </CioCarousel.Content>
            <CioCarousel.Next />
          </div>
        </div>
      )}
    </CioCarousel>
  ),
};

// Multiple customizations using componentOverrides for content, items and navigation
export const MultipleCustomizations: Story = {
  args: {
    items: mockProducts,
  },
  render: (args: Story['args']) => (
    <CioCarousel
      items={args.items as Product[]}
      componentOverrides={{
        content: {
          reactNode: (props: CarouselRenderProps<Product>) => (
            <div className='cio:flex cio:items-center cio:gap-2'>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='cio:w-[220px] cio:h-full cio:bg-slate-950/90 cio:border cio:border-slate-700 cio:rounded-xl cio:p-4 cio:shadow-lg cio:flex cio:flex-col cio:items-center cio:gap-3 cio:text-white'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='cio:w-24 cio:h-24 cio:rounded-full cio:object-cover cio:border-2 cio:border-slate-500'
                    />
                    <div className='cio:text-center cio:space-y-1'>
                      <p className='cio:text-sm cio:font-semibold'>{product.name}</p>
                      <p className='cio:text-xs cio:text-slate-300 cio:line-clamp-2'>
                        {product.description}
                      </p>
                      <p className='cio:text-sm cio:font-medium cio:text-emerald-300'>
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </CioCarousel.Item>
              ))}
            </div>
          ),
        },
        previous: {
          reactNode: ({ scrollPrev, canScrollPrev }: CarouselRenderProps<Product>) => (
            <button
              type='button'
              className='cio:rounded-full cio:bg-slate-900 cio:text-white cio:px-3 cio:py-2 cio:text-xs cio:flex cio:items-center cio:gap-1 cio:disabled:opacity-40 cio:cursor-pointer'
              aria-label='Previous slide'
              onClick={scrollPrev}
              disabled={!canScrollPrev}>
              <span>◀ Prev</span>
            </button>
          ),
        },
        next: {
          reactNode: ({ scrollNext, canScrollNext }: CarouselRenderProps<Product>) => (
            <button
              type='button'
              className='cio:rounded-full cio:bg-slate-900 cio:text-white cio:px-3 cio:py-2 cio:text-xs cio:flex cio:items-center cio:gap-1 cio:disabled:opacity-40 cio:cursor-pointer'
              aria-label='Next slide'
              onClick={scrollNext}
              disabled={!canScrollNext}>
              <span>Next ▶</span>
            </button>
          ),
        },
      }}
    />
  ),
};

export const WithRenderProps: Story = {
  args: {
    items: mockProducts,
  },
  render: (args: Story['args']) => (
    <CioCarousel items={args.items as Product[]}>
      {(props: CarouselRenderProps<Product>) => (
        <div className='cio:flex cio:flex-col cio:gap-4 cio:w-full'>
          <div className='cio:flex cio:items-center cio:justify-between cio:px-4'>
            <h2 className='cio:text-lg cio:font-semibold'>Recommended products</h2>
            <span className='cio:text-sm cio:text-gray-500'>
              {props.items?.length ?? 0} items · Orientation: {props.orientation}
            </span>
          </div>

          <div className='cio:flex cio:gap-4 cio:w-full cio:items-center'>
            <CioCarousel.Previous />
            <CioCarousel.Content>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='cio:w-full cio:bg-white cio:border cio:rounded-xl cio:p-4 cio:shadow-sm cio:flex cio:flex-col cio:items-center cio:gap-2'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='cio:w-24 cio:h-24 cio:rounded-full cio:object-cover'
                    />
                    <div className='cio:text-center'>
                      <p className='cio:text-sm cio:font-medium'>{product.name}</p>
                      <p className='cio:text-xs cio:text-gray-500'>${product.price}</p>
                    </div>
                  </div>
                </CioCarousel.Item>
              ))}
            </CioCarousel.Content>
            <CioCarousel.Next />
          </div>
        </div>
      )}
    </CioCarousel>
  ),
};

export const WithCompoundComponents: Story = {
  render: () => (
    <CioCarousel autoPlay={false} loop>
      <CioCarousel.Previous />
      <CioCarousel.Content>
        {mockProducts.map((product: Product) => (
          <CioCarousel.Item key={product.id}>
            <div className='cio:w-[220px] cio:bg-white cio:border cio:rounded-xl cio:p-4 cio:shadow-sm cio:flex cio:flex-col cio:items-center cio:gap-3'>
              <img
                src={product.imageUrl}
                alt={product.name}
                className='cio:w-24 cio:h-24 cio:rounded-full cio:object-cover'
              />
              <div className='cio:text-center cio:space-y-1'>
                <p className='cio:text-sm cio:font-semibold'>{product.name}</p>
                <p className='cio:text-xs cio:text-gray-500 cio:line-clamp-2'>
                  {product.description}
                </p>
                <p className='cio:text-sm cio:font-medium'>${product.price}</p>
              </div>
            </div>
          </CioCarousel.Item>
        ))}
      </CioCarousel.Content>
      <CioCarousel.Next />
    </CioCarousel>
  ),
};

export const WithCustomScrollButtons: Story = {
  args: {
    items: mockProducts,
  },
  render: (args: Story['args']) => (
    <CioCarousel
      items={args.items as Product[]}
      componentOverrides={{
        previous: {
          reactNode: ({ orientation, scrollPrev, canScrollPrev }: CarouselRenderProps<Product>) => (
            <button
              type='button'
              className='cio:rounded-full cio:bg-black cio:text-white cio:px-3 cio:py-2 cio:text-xs cio:flex cio:items-center cio:gap-1 cio:cursor-pointer'
              aria-label='Previous slide'
              disabled={!canScrollPrev}
              onClick={scrollPrev}>
              <span>{orientation === 'vertical' ? 'Up' : 'Prev'}</span>
            </button>
          ),
        },
        next: {
          reactNode: ({ orientation, scrollNext, canScrollNext }: CarouselRenderProps<Product>) => (
            <button
              type='button'
              className='cio:rounded-full cio:bg-black cio:text-white cio:px-3 cio:py-2 cio:text-xs cio:flex cio:items-center cio:gap-1 cio:cursor-pointer'
              aria-label='Next slide'
              data-slot='carousel-next'
              disabled={!canScrollNext}
              onClick={scrollNext}>
              <span>{orientation === 'vertical' ? 'Down' : 'Next'}</span>
            </button>
          ),
        },
      }}
    />
  ),
};

export const WithCustomItem: Story = {
  args: {
    items: mockProducts,
  },
  render: (args: Story['args']) => (
    <CioCarousel
      items={args.items as Product[]}
      componentOverrides={{
        item: {
          reactNode: ({ item }: { item: Product }) => (
            <div className='cio:w-full cio:bg-gradient-to-br cio:from-blue-500 cio:to-purple-600 cio:text-white cio:rounded-xl cio:border cio:p-6 cio:shadow-lg cio:flex cio:flex-col cio:items-center cio:justify-center cio:gap-2'>
              <img
                src={item.imageUrl}
                alt={item.name}
                className='cio:w-24 cio:h-24 cio:rounded-full cio:object-cover cio:border-4 cio:border-white'
              />
              <h3 className='cio:text-xl cio:font-bold'>{item.name}</h3>
              <p className='cio:text-sm cio:opacity-90'>${item.price}</p>
            </div>
          ),
        },
      }}
    />
  ),
};

export const WithCustomSlidesToScroll: Story = {
  args: {
    items: mockProducts,
    slidesToScroll: 2,
  },
  render: (args: Story['args']) => (
    <CioCarousel items={args.items as Product[]} slidesToScroll={2}>
      {(props: CarouselRenderProps<Product>) => (
        <div className='cio:flex cio:flex-col cio:gap-3 cio:w-full'>
          <div className='cio:flex cio:items-center cio:justify-between cio:px-4 cio:text-xs cio:text-gray-500'>
            <span>
              Items: {props.items?.length ?? 0} · Slides to scroll: {props.slidesToScroll}
            </span>
            <span>Loop: {props.loop ? 'On' : 'Off'}</span>
          </div>
          <div className='cio:flex cio:gap-3 cio:items-center cio:px-4'>
            <CioCarousel.Previous />
            <CioCarousel.Content>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='cio:w-[220px] cio:bg-white cio:border cio:rounded-xl cio:p-4 cio:shadow-sm cio:flex cio:flex-col cio:items-center cio:gap-2'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='cio:w-24 cio:h-24 cio:rounded-full cio:object-cover'
                    />
                    <div className='cio:text-center'>
                      <p className='cio:text-sm cio:font-medium'>{product.name}</p>
                      <p className='cio:text-xs cio:text-gray-500'>${product.price}</p>
                    </div>
                  </div>
                </CioCarousel.Item>
              ))}
            </CioCarousel.Content>
            <CioCarousel.Next />
          </div>
        </div>
      )}
    </CioCarousel>
  ),
};

export const WithCustomResponsiveConfig: Story = {
  args: {
    items: mockProducts,
    autoPlay: false,
  },
  render: (args: Story['args']) => (
    <CioCarousel
      items={args.items as Product[]}
      responsive={{
        0: { gap: 8, slidesToShow: 1 },
        640: { gap: 12, slidesToShow: 2 },
        960: { gap: 16, slidesToShow: 3 },
        1200: { gap: 20, slidesToShow: 4 },
      }}>
      {(props: CarouselRenderProps<Product>) => (
        <div className='cio:flex cio:flex-col cio:gap-4 cio:w-full cio:p-4 cio:overflow-hidden'>
          <div className='cio:flex cio:items-center cio:justify-between cio:text-xs cio:text-gray-500'>
            <span>
              Breakpoints: 0/640/960/1200 · Orientation:{' '}
              {props.orientation === 'vertical' ? 'Vertical' : 'Horizontal'}
            </span>
            <span>Autoplay: {props.autoPlay ? 'On' : 'Off'}</span>
          </div>
          <div className='cio:flex cio:gap-3 cio:items-center'>
            <CioCarousel.Previous />
            <CioCarousel.Content>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='cio:w-[220px] cio:bg-white cio:border cio:rounded-xl cio:p-4 cio:shadow-sm cio:flex cio:flex-col cio:items-center cio:gap-3'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='cio:w-24 cio:h-24 cio:rounded-full cio:object-cover'
                    />
                    <div className='cio:text-center cio:space-y-1'>
                      <p className='cio:text-sm cio:font-semibold'>{product.name}</p>
                      <p className='cio:text-xs cio:text-gray-500 cio:line-clamp-2'>
                        {product.description}
                      </p>
                    </div>
                  </div>
                </CioCarousel.Item>
              ))}
            </CioCarousel.Content>
            <CioCarousel.Next />
          </div>
        </div>
      )}
    </CioCarousel>
  ),
};

export const RenderPropsShowcase: Story = {
  args: {
    items: mockProducts,
  },
  render: (args: Story['args']) => (
    <CioCarousel items={args.items as Product[]}>
      {(props: CarouselRenderProps<Product>) => (
        <div className='cio:flex cio:flex-col cio:gap-4 cio:w-full cio:p-4 cio:bg-slate-50 cio:rounded-xl cio:border cio:border-slate-200 cio:overflow-hidden'>
          <div className='cio:flex cio:items-center cio:justify-between'>
            <div>
              <h2 className='cio:text-lg cio:font-semibold'>Personalized picks</h2>
              <p className='cio:text-xs cio:text-gray-500 cio:mt-1'>
                {props.items?.length ?? 0} items ·
                <span className='cio:ml-1'>
                  {props.orientation === 'vertical' ? 'Vertical scroll' : 'Horizontal scroll'}
                </span>
              </p>
            </div>
            <div className='cio:flex cio:flex-col cio:items-end cio:text-xs cio:text-gray-500'>
              <span>Slides to scroll: {props.slidesToScroll}</span>
              <span>Loop: {props.loop ? 'On' : 'Off'}</span>
            </div>
          </div>

          <div className='cio:flex cio:items-center cio:gap-3'>
            <CioCarousel.Previous />
            <CioCarousel.Content>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='cio:w-[240px] cio:bg-white cio:border cio:rounded-xl cio:p-4 cio:shadow-sm cio:flex cio:flex-col cio:gap-3'>
                    <div className='cio:flex cio:items-center cio:gap-3'>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className='cio:w-14 cio:h-14 cio:rounded-full cio:object-cover'
                      />
                      <div className='cio:flex-1'>
                        <p className='cio:text-sm cio:font-semibold'>{product.name}</p>
                        <p className='cio:text-xs cio:text-gray-500 cio:line-clamp-2'>
                          {product.description}
                        </p>
                      </div>
                    </div>
                    <div className='cio:flex cio:items-center cio:justify-between cio:text-xs cio:text-gray-600'>
                      <span className='cio:font-medium'>${product.price}</span>
                      <span>Rating: {product.rating}★</span>
                    </div>
                  </div>
                </CioCarousel.Item>
              ))}
            </CioCarousel.Content>
            <CioCarousel.Next />
          </div>
        </div>
      )}
    </CioCarousel>
  ),
};

export const CompoundCustomLayout: Story = {
  args: {
    items: mockProducts,
  },
  render: (args: Story['args']) => (
    <CioCarousel autoPlay={false} loop>
      <div className='cio:flex cio:flex-col cio:gap-4 cio:w-full cio:p-4 cio:bg-slate-50 cio:rounded-xl cio:overflow-hidden'>
        <div className='cio:flex cio:items-center cio:justify-between'>
          <h2 className='cio:text-lg cio:font-semibold'>Featured Products</h2>
          <div className='cio:flex cio:gap-2'>
            <CioCarousel.Previous />
            <CioCarousel.Next />
          </div>
        </div>

        <CioCarousel.Content>
          {(args.items as Product[]).map((product: Product) => (
            <CioCarousel.Item key={product.id}>
              <div className='cio:w-[200px] cio:bg-white cio:border cio:rounded-xl cio:p-3 cio:shadow-sm'>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className='cio:w-full cio:h-32 cio:object-cover cio:rounded-lg cio:mb-2'
                />
                <h3 className='cio:text-sm cio:font-semibold'>{product.name}</h3>
                <p className='cio:text-xs cio:text-gray-500'>${product.price}</p>
              </div>
            </CioCarousel.Item>
          ))}
        </CioCarousel.Content>
      </div>
    </CioCarousel>
  ),
};

export const CompoundVerticalLayout: Story = {
  args: {
    items: mockProducts,
  },
  render: (args: Story['args']) => (
    <CioCarousel orientation='vertical' autoPlay={false} loop>
      <div className='cio:flex cio:flex-col cio:gap-3 cio:h-[400px] cio:items-center'>
        <CioCarousel.Previous />
        <CioCarousel.Content>
          {(args.items as Product[]).map((product: Product) => (
            <CioCarousel.Item key={product.id}>
              <div className='cio:w-[240px] cio:bg-white cio:border cio:rounded-xl cio:p-4 cio:shadow-sm cio:flex cio:items-center cio:gap-3'>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className='cio:w-16 cio:h-16 cio:rounded-full cio:object-cover'
                />
                <div className='cio:flex-1'>
                  <p className='cio:text-sm cio:font-semibold'>{product.name}</p>
                  <p className='cio:text-xs cio:text-gray-500'>${product.price}</p>
                </div>
              </div>
            </CioCarousel.Item>
          ))}
        </CioCarousel.Content>
        <CioCarousel.Next />
      </div>
    </CioCarousel>
  ),
};

export const CustomContentSection: Story = {
  args: {
    items: mockProducts,
  },
  render: (args: Story['args']) => (
    <CioCarousel
      items={args.items as Product[]}
      componentOverrides={{
        content: {
          reactNode: (props: CarouselRenderProps<Product>) => (
            <div className='cio:flex cio:items-center cio:gap-2 cio:bg-slate-100 cio:p-4 cio:rounded-lg'>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='cio:w-[220px] cio:bg-white cio:border cio:rounded-xl cio:p-4 cio:shadow-sm cio:flex cio:flex-col cio:items-center cio:gap-3'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='cio:w-24 cio:h-24 cio:rounded-full cio:object-cover'
                    />
                    <div className='cio:text-center cio:space-y-1'>
                      <p className='cio:text-sm cio:font-semibold'>{product.name}</p>
                      <p className='cio:text-xs cio:text-gray-500 cio:line-clamp-2'>
                        {product.description}
                      </p>
                      <p className='cio:text-sm cio:font-medium'>${product.price}</p>
                    </div>
                  </div>
                </CioCarousel.Item>
              ))}
            </div>
          ),
        },
      }}
    />
  ),
};
