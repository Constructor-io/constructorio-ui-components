import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../components/ui/carousel';

import { CarouselBase as CioCarousel } from '../../../components/Carousel/CarouselContainer';

import { Card, CardContent } from '../../../components/ui/card';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: { onSubmit: fn() },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <main className='min-h-100svh'>
      <div className='grid grid-cols-4 md:grid-cols-12 mx-4 md:mx-12 lg:mx-24'>
        <CioCarousel
          className='col-span-4 md:col-span-12'
          title='Primary Title'
          subtitle='Secondary Title'>
          <CioCarousel.Title />
          <CioCarousel.Subtitle />
          <CioCarousel.CarouselItems />
        </CioCarousel>
      </div>
    </main>

    // <Carousel className='w-full max-w-xs'>
    //   <CarouselContent>
    //     {Array.from({ length: 5 }).map((_, index) => (
    //       <CarouselItem key={index}>
    //         <div className='p-1'>
    //           <Card>
    //             <CardContent className='flex aspect-square items-center justify-center p-6'>
    //               <span className='text-4xl font-semibold'>{index + 1}</span>
    //             </CardContent>
    //           </Card>
    //         </div>
    //       </CarouselItem>
    //     ))}
    //   </CarouselContent>
    //   <CarouselPrevious />
    //   <CarouselNext />
    // </Carousel>
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
