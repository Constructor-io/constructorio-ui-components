import type { Meta, StoryObj } from '@storybook/react-vite';
import CioCarousel, {
  CioCarouselOpts,
  defaultCarouselConfig,
} from '../../../components/ui/carousel';
import { cn } from '../../../lib/utils';

import { Card, CardContent } from '../../../components/ui/card';

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

const renderCarousel = (args: any, count = 10) => (
  <main className='min-h-100svh'>
    <div className='grid grid-cols-4 md:grid-cols-12 mx-4 md:mx-12 lg:mx-24'>
      <div
        className={cn(
          'col-span-4 md:col-span-12',
          args.orientation === 'vertical' ? 'h-[600px]' : '',
        )}>
        <CioCarousel {...args}>
          <CioCarousel.Content>
            {Array.from({ length: count }).map((_, index) => (
              <CioCarousel.Item key={index} className='basis-[45%]'>
                <Card>
                  <CardContent className='flex aspect-square items-center justify-center p-6 h-full'>
                    <span className='text-4xl font-semibold'>{index + 1}</span>
                  </CardContent>
                </Card>
              </CioCarousel.Item>
            ))}
          </CioCarousel.Content>
        </CioCarousel>
      </div>
    </div>
  </main>
);

export const Default: Story = {
  args: {},
  render: () => renderCarousel({}),
};

export const Autoplay: Story = {
  args: { autoPlay: true },
  render: (args) => renderCarousel(args),
};

export const Looping: Story = {
  args: { loop: true },
  render: (args) => renderCarousel(args),
};

export const Vertical: Story = {
  args: { loop: true, orientation: 'vertical' },
  render: (args) => renderCarousel(args),
};

export const ManySlides: Story = {
  args: {},
  render: (args) => renderCarousel(args, 20),
};
