import { cn } from '@/lib/utils';
import React, { createContext, useContext } from 'react';

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

const Title = (className: string = '') => {
  const { title } = useCarouselContext();
  return <div className={cn('', className)}>{title}</div>;
};

const Subtitle = (text: string, className: string = '') => {
  return <div className={cn('', className)}>{text}</div>;
};

// Attach subcomponents to root
export const Carousel = Object.assign(CarouselRoot, {
  Title,
  Subtitle,
});
