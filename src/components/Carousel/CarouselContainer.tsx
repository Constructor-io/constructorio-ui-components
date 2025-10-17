import { cn } from '@/lib/utils';
import React, { createContext, useContext } from 'react';
import { CioCarouselOpts } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

type CarouselContextType = {
  title?: string;
  subtitle?: string;
  className?: string;
} & CioCarouselOpts;

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

const CarouselRoot = ({ children, className, ...rest }: RootProps) => {
  // TODO: Resolve against a default config.
  return (
    <CarouselContext.Provider value={rest}>
      <div className={className}>{children}</div>
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

const CarouselItems: React.FC = () => {
  const { autoPlay, orientation, slidesToScroll } = useCarouselContext();
  const plugins = autoPlay ? [Autoplay({ playOnInit: true, delay: 3000 })] : [];
  return (
    <Carousel
      className={cn('w-full')}
      opts={{
        slidesToScroll: slidesToScroll,
        align: 'start',
      }}
      responsive={{
        0: { gap: 12, slidesToShow: 2 }, // mobile
        920: { gap: 16, slidesToShow: 4 }, // tablet
        1200: { gap: 24, slidesToShow: 6 }, // desktop
      }}
      orientation={orientation}
      plugins={plugins}>
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
