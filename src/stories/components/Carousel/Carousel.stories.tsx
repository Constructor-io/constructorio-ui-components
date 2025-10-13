import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../components/ui/carousel';

// import { Carousel as CioCarousel } from '../../../components/Carousel/CarouselContainer';

import { Card, CardContent } from '../../../components/ui/card';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onSubmit: fn() },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Carousel className='w-full max-w-xs'>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <span className='text-4xl font-semibold'>{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
      

// export const CustomPlaceholder: Story = {
//   args: {
//     placeholder: 'Type your question...',
//   },
// };

// export const NoPlaceholder: Story = {
//   args: {
//     placeholder: '',
//   },
// };

// export const Disabled: Story = {
//   args: {
//     disabled: true,
//   },
// };
