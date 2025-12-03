import type { Meta, StoryObj } from '@storybook/react-vite';
import CioCarousel from '../../../components/carousel';
import { Product } from '../../../types/product-card-types';
import { CarouselRenderProps } from '../../../types/carousel-types';
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
          <div className='w-[240px] bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-3 self-center'>
            <div className='flex items-center gap-3'>
              <img
                src={item.imageUrl}
                alt={item.name}
                className='w-14 h-14 rounded-full object-cover'
              />
              <div className='flex-1'>
                <p className='text-sm font-semibold'>{item.name}</p>
                <p className='text-xs text-gray-500 line-clamp-2'>{item.description}</p>
              </div>
            </div>
            <div className='flex items-center justify-between text-xs text-gray-600'>
              <span className='font-medium'>${item.price}</span>
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
          <div className='flex flex-col gap-4 w-full overflow-hidden p-4 bg-slate-50 rounded-xl border border-slate-200'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-lg font-semibold'>Curated products</h2>
                <p className='text-xs text-gray-500 mt-1'>
                  Orientation: {props.orientation} · Items: {props.items?.length ?? 0}
                </p>
              </div>
              <span className='text-[11px] uppercase tracking-wide text-slate-500'>
                Custom root layout
              </span>
            </div>

            <div className='flex items-center gap-3'>
              <CioCarousel.Previous />
              <CioCarousel.Content>
                {props.items?.map((product: Product) => (
                  <CioCarousel.Item key={product.id}>
                    <div className='w-[220px] bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center gap-3'>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className='w-24 h-24 rounded-full object-cover'
                      />
                      <div className='text-center space-y-1'>
                        <p className='text-sm font-semibold'>{product.name}</p>
                        <p className='text-xs text-gray-500 line-clamp-2'>{product.description}</p>
                        <p className='text-sm font-medium'>${product.price}</p>
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
        <div className='flex flex-col gap-4 w-full overflow-hidden p-4'>
          {/* Header driven by render props */}
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <h2 className='text-lg font-semibold'>Trending now</h2>
              <p className='text-xs text-gray-500'>
                {props.items?.length ?? 0} items ·{' '}
                {props.orientation === 'vertical' ? 'Vertical' : 'Horizontal'} scroll
              </p>
            </div>
            <div className='flex items-center gap-2 text-xs text-gray-500'>
              <span>Slides to scroll: {props.slidesToScroll}</span>
              <span>Loop: {props.loop ? 'On' : 'Off'}</span>
            </div>
          </div>

          {/* Compound components for navigation + content */}
          <div className='flex gap-4 w-full items-center overflow-hidden'>
            <CioCarousel.Previous />
            <CioCarousel.Content>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='w-[220px] bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center gap-2'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='w-24 h-24 rounded-full object-cover'
                    />
                    <div className='text-center'>
                      <p className='text-sm font-medium'>{product.name}</p>
                      <p className='text-xs text-gray-500'>${product.price}</p>
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
        <div className='flex flex-col gap-4 w-full p-4 bg-white rounded-xl border border-slate-200 overflow-hidden'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-semibold'>Featured articles</h2>
              <p className='text-xs text-gray-500 mt-1'>
                {props.items?.length ?? 0} articles ·
                <span className='ml-1'>
                  {props.orientation === 'vertical' ? 'Vertical scroll' : 'Horizontal scroll'}
                </span>
              </p>
            </div>
            <div className='flex flex-col items-end text-xs text-gray-500'>
              <span>Slides to scroll: {props.slidesToScroll}</span>
              <span>Loop: {props.loop ? 'On' : 'Off'}</span>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <CioCarousel.Previous />
            <CioCarousel.Content>
              {props.items?.map((article: Article) => (
                <CioCarousel.Item key={article.id} item={article}>
                  <article className='w-[260px] bg-slate-50 border rounded-xl p-4 shadow-sm flex flex-col gap-2'>
                    <span className='text-[11px] uppercase tracking-wide text-slate-500'>
                      {article.category}
                    </span>
                    <h3 className='text-sm font-semibold line-clamp-2'>{article.title}</h3>
                    <p className='text-xs text-gray-600 line-clamp-3'>{article.summary}</p>
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
            <div className='flex items-center gap-2'>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='w-[220px] h-full bg-slate-950/90 border border-slate-700 rounded-xl p-4 shadow-lg flex flex-col items-center gap-3 text-white'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='w-24 h-24 rounded-full object-cover border-2 border-slate-500'
                    />
                    <div className='text-center space-y-1'>
                      <p className='text-sm font-semibold'>{product.name}</p>
                      <p className='text-xs text-slate-300 line-clamp-2'>{product.description}</p>
                      <p className='text-sm font-medium text-emerald-300'>${product.price}</p>
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
              className='rounded-full bg-slate-900 text-white px-3 py-2 text-xs flex items-center gap-1 disabled:opacity-40 cursor-pointer'
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
              className='rounded-full bg-slate-900 text-white px-3 py-2 text-xs flex items-center gap-1 disabled:opacity-40 cursor-pointer'
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
        <div className='flex flex-col gap-4 w-full'>
          <div className='flex items-center justify-between px-4'>
            <h2 className='text-lg font-semibold'>Recommended products</h2>
            <span className='text-sm text-gray-500'>
              {props.items?.length ?? 0} items · Orientation: {props.orientation}
            </span>
          </div>

          <div className='flex gap-4 w-full items-center'>
            <CioCarousel.Previous />
            <CioCarousel.Content>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='w-full bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center gap-2'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='w-24 h-24 rounded-full object-cover'
                    />
                    <div className='text-center'>
                      <p className='text-sm font-medium'>{product.name}</p>
                      <p className='text-xs text-gray-500'>${product.price}</p>
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
            <div className='w-[220px] bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center gap-3'>
              <img
                src={product.imageUrl}
                alt={product.name}
                className='w-24 h-24 rounded-full object-cover'
              />
              <div className='text-center space-y-1'>
                <p className='text-sm font-semibold'>{product.name}</p>
                <p className='text-xs text-gray-500 line-clamp-2'>{product.description}</p>
                <p className='text-sm font-medium'>${product.price}</p>
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
              className='rounded-full bg-black text-white px-3 py-2 text-xs flex items-center gap-1 cursor-pointer'
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
              className='rounded-full bg-black text-white px-3 py-2 text-xs flex items-center gap-1 cursor-pointer'
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
            <div className='w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl border p-6 shadow-lg flex flex-col items-center justify-center gap-2'>
              <img
                src={item.imageUrl}
                alt={item.name}
                className='w-24 h-24 rounded-full object-cover border-4 border-white'
              />
              <h3 className='text-xl font-bold'>{item.name}</h3>
              <p className='text-sm opacity-90'>${item.price}</p>
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
        <div className='flex flex-col gap-3 w-full'>
          <div className='flex items-center justify-between px-4 text-xs text-gray-500'>
            <span>
              Items: {props.items?.length ?? 0} · Slides to scroll: {props.slidesToScroll}
            </span>
            <span>Loop: {props.loop ? 'On' : 'Off'}</span>
          </div>
          <div className='flex gap-3 items-center px-4'>
            <CioCarousel.Previous />
            <CioCarousel.Content>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='w-[220px] bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center gap-2'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='w-24 h-24 rounded-full object-cover'
                    />
                    <div className='text-center'>
                      <p className='text-sm font-medium'>{product.name}</p>
                      <p className='text-xs text-gray-500'>${product.price}</p>
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
        <div className='flex flex-col gap-4 w-full p-4 overflow-hidden'>
          <div className='flex items-center justify-between text-xs text-gray-500'>
            <span>
              Breakpoints: 0/640/960/1200 · Orientation:{' '}
              {props.orientation === 'vertical' ? 'Vertical' : 'Horizontal'}
            </span>
            <span>Autoplay: {props.autoPlay ? 'On' : 'Off'}</span>
          </div>
          <div className='flex gap-3 items-center'>
            <CioCarousel.Previous />
            <CioCarousel.Content>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='w-[220px] bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center gap-3'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='w-24 h-24 rounded-full object-cover'
                    />
                    <div className='text-center space-y-1'>
                      <p className='text-sm font-semibold'>{product.name}</p>
                      <p className='text-xs text-gray-500 line-clamp-2'>{product.description}</p>
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
        <div className='flex flex-col gap-4 w-full p-4 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-semibold'>Personalized picks</h2>
              <p className='text-xs text-gray-500 mt-1'>
                {props.items?.length ?? 0} items ·
                <span className='ml-1'>
                  {props.orientation === 'vertical' ? 'Vertical scroll' : 'Horizontal scroll'}
                </span>
              </p>
            </div>
            <div className='flex flex-col items-end text-xs text-gray-500'>
              <span>Slides to scroll: {props.slidesToScroll}</span>
              <span>Loop: {props.loop ? 'On' : 'Off'}</span>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <CioCarousel.Previous />
            <CioCarousel.Content>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='w-[240px] bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className='w-14 h-14 rounded-full object-cover'
                      />
                      <div className='flex-1'>
                        <p className='text-sm font-semibold'>{product.name}</p>
                        <p className='text-xs text-gray-500 line-clamp-2'>{product.description}</p>
                      </div>
                    </div>
                    <div className='flex items-center justify-between text-xs text-gray-600'>
                      <span className='font-medium'>${product.price}</span>
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
      <div className='flex flex-col gap-4 w-full p-4 bg-slate-50 rounded-xl overflow-hidden'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Featured Products</h2>
          <div className='flex gap-2'>
            <CioCarousel.Previous />
            <CioCarousel.Next />
          </div>
        </div>

        <CioCarousel.Content>
          {(args.items as Product[]).map((product: Product) => (
            <CioCarousel.Item key={product.id}>
              <div className='w-[200px] bg-white border rounded-xl p-3 shadow-sm'>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className='w-full h-32 object-cover rounded-lg mb-2'
                />
                <h3 className='text-sm font-semibold'>{product.name}</h3>
                <p className='text-xs text-gray-500'>${product.price}</p>
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
      <div className='flex flex-col gap-3 h-[400px] items-center'>
        <CioCarousel.Previous />
        <CioCarousel.Content>
          {(args.items as Product[]).map((product: Product) => (
            <CioCarousel.Item key={product.id}>
              <div className='w-[240px] bg-white border rounded-xl p-4 shadow-sm flex items-center gap-3'>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className='w-16 h-16 rounded-full object-cover'
                />
                <div className='flex-1'>
                  <p className='text-sm font-semibold'>{product.name}</p>
                  <p className='text-xs text-gray-500'>${product.price}</p>
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
            <div className='flex items-center gap-2 bg-slate-100 p-4 rounded-lg'>
              {props.items?.map((product: Product) => (
                <CioCarousel.Item key={product.id}>
                  <div className='w-[220px] bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center gap-3'>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className='w-24 h-24 rounded-full object-cover'
                    />
                    <div className='text-center space-y-1'>
                      <p className='text-sm font-semibold'>{product.name}</p>
                      <p className='text-xs text-gray-500 line-clamp-2'>{product.description}</p>
                      <p className='text-sm font-medium'>${product.price}</p>
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
