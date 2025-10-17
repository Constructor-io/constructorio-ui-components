import * as React from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { cn } from '@/lib/utils';
import Button from '@/components/ui/button';
import { useCarouselResponsive } from '@/hooks/useCarouselResponsive';
import { useCarouselTweenOpacity } from '@/hooks/useCarouselTweenOpacity';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type ResponsivePoint = {
  slidesToShow: number;
  gap?: number; // px
};

export type ResponsiveConfig = {
  [breakpointPx: number]: ResponsivePoint;
};

export type Orientation = 'horizontal' | 'vertical';

export type CioCarouselOpts = {
  orientation?: Orientation;
  autoPlay?: boolean;
  loop?: boolean;
  slidesToScroll?: 'auto' | number;
  responsive?: ResponsiveConfig;
};

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  setApi?: (api: CarouselApi) => void;
} & CioCarouselOpts;

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

type NavButtonProps = Omit<React.ComponentProps<typeof Button>, 'children'> & {
  children?: React.ReactNode;
};

type CarouselBaseProps = { children?: Readonly<React.ReactNode> } & CioCarouselOpts;

type CarouselSubComponents = {
  Content: React.FC<React.ComponentProps<'div'>>;
  Item: React.FC<React.ComponentProps<'div'>>;
};

type CioCarouselType = React.FC<CarouselBaseProps> & CarouselSubComponents;

export const defaultCarouselConfig: CioCarouselOpts = {
  autoPlay: true,
  loop: true,
  orientation: 'horizontal',
  responsive: {
    0: { gap: 12, slidesToShow: 2 },
    920: { gap: 16, slidesToShow: 4 },
    1200: { gap: 24, slidesToShow: 6 },
  },
  slidesToScroll: 1,
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

function CarouselBase({
  orientation = 'horizontal',
  autoPlay = true,
  loop = true,
  slidesToScroll = 1,
  opts,
  setApi,
  responsive,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const plugins = autoPlay ? [Autoplay({ playOnInit: true, delay: 3000 })] : [];
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
      slidesToScroll: slidesToScroll,
      loop,
    },
    plugins,
  );
  const { rootProps } = useCarouselResponsive(responsive, orientation);
  useCarouselTweenOpacity(api, orientation);

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}>
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role='region'
        aria-roledescription='carousel'
        data-slot='carousel'
        {...rootProps}
        {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function Carousel({ children, ...props }: CarouselBaseProps) {
  const config: CioCarouselOpts = { ...defaultCarouselConfig, ...props };
  const plugins = config.autoPlay ? [Autoplay({ playOnInit: true, delay: 3000 })] : [];
  return (
    <CarouselBase
      className={cn('w-full h-full')}
      opts={{
        slidesToScroll: config.slidesToScroll,
        align: 'start',
      }}
      plugins={plugins}
      {...config}>
      {children}
      <CarouselPrevious />
      <CarouselNext />
    </CarouselBase>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className={cn('overflow-hidden w-full h-full relative', className)}
      data-slot='carousel-content'>
      <div
        data-slot='carousel-track'
        className={cn('flex h-full', orientation === 'horizontal' ? '' : 'flex-col')}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role='group'
      aria-roledescription='slide'
      data-slot='carousel-item'
      className={cn('min-w-0 shrink-0 grow-0 basis-full', className)}
      {...props}
    />
  );
}

function CarouselPrevious({ className, size = 'icon', ...props }: NavButtonProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  if (!canScrollPrev) return null;

  return (
    <button
      data-slot='carousel-previous'
      className={cn(
        'absolute size-8 rounded-md bg-white outline-1 outline-offset-[-1px] outline-slate-200 inline-flex justify-center items-center',
        orientation === 'horizontal'
          ? 'top-1/2 left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}>
      <ArrowLeftIcon />
      <span className='sr-only'>Previous slide</span>
    </button>
  );
}

function CarouselNext({ className, size = 'icon', ...props }: NavButtonProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  if (!canScrollNext) return null;

  return (
    <button
      data-slot='carousel-next'
      className={cn(
        'absolute size-8 rounded-md bg-white outline-1 outline-offset-[-1px] outline-slate-200 inline-flex justify-center items-center',
        orientation === 'horizontal'
          ? 'top-1/2 right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}>
      <ArrowRightIcon />
      <span className='sr-only'>Next slide</span>
    </button>
  );
}

const CioCarousel = Carousel as CioCarouselType;

CioCarousel.Content = CarouselContent;
CioCarousel.Item = CarouselItem;

export default CioCarousel;
