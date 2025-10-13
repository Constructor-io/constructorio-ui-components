import { cn } from '@/lib/utils';
import React, { createContext, useContext } from 'react';
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';

type CarouselContextType = {
  title?: string;
  subtitle?: string;
};

interface RootProps extends CarouselContextType {
  children: Readonly<React.ReactNode>;
}

const CarouselContext = createContext<CarouselContextType | null>(null);

const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel subcomponents must be used within <Carousel>');
  }
  return context;
};

const CarouselRoot = ({ children, title, subtitle }: RootProps) => {
  return (
    <CarouselContext.Provider value={{ title, subtitle }}>
      <div>{children}</div>
    </CarouselContext.Provider>
  );
};

const Title: React.FC<{ className?: string }> = ({ className }) => {
  const { title } = useCarouselContext();
  if (!title) return null;
  return <div className={cn('', className)}>{title}</div>;
};

const Subtitle: React.FC<{ className?: string }> = ({ className }) => {
  const { subtitle } = useCarouselContext();
  if (!subtitle) return null;
  return <div className={cn('', className)}>{subtitle}</div>;
};

const CarouselItems: React.FC<any> = () => {
  return (
    <Carousel
      className='w-full max-w-xs'
      opts={{
        slidesToScroll: 'auto',
      }}>
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className='basis-1/3 p-0'>
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
  );
};

export const CarouselBase = Object.assign(CarouselRoot, {
  Title,
  Subtitle,
  CarouselItems,
});
