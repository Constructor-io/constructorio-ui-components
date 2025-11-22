import React, {
  ComponentProps,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import RenderPropsWrapper from './RenderPropsWrapper';
import { cn } from '@/lib/utils';
import Button from '@/components/button';
import { useCarouselResponsive } from '@/hooks/useCarouselResponsive';
import { useCarouselTweenOpacity } from '@/hooks/useCarouselTweenOpacity';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ProductCard from '@/components/product-card';
import { Product } from '@/types/product-card-types';
import type {
  CarouselRenderProps,
  CarouselItemRenderProps,
  CarouselOverrides,
  CarouselOpts,
  CarouselContextValue,
  CarouselProps,
  CarouselApi,
  CarouselItemProps,
  NavButtonProps,
} from '@/types/carousel-types';

// eslint-disable-next-line react-refresh/only-export-components
export const defaultCarouselConfig: CarouselOpts = {
  autoPlay: false,
  loop: true,
  orientation: 'horizontal',
  responsive: {
    0: { gap: 12, slidesToShow: 2 },
    640: { gap: 14, slidesToShow: 3 },
    920: { gap: 16, slidesToShow: 4 },
    1200: { gap: 24, slidesToShow: 6 },
  },
  slidesToScroll: 1,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CarouselContext = createContext<CarouselContextValue<any> | null>(null);

function useCarousel<T = Product>() {
  const context = useContext(CarouselContext) as CarouselContextValue<T> | null;

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

function CarouselBase<T = Product>({
  className,
  children,
  componentOverrides,
  ...props
}: ComponentProps<'div'> & CarouselProps<T>) {
  const {
    orientation = 'horizontal',
    autoPlay = true,
    loop = true,
    slidesToScroll = 1,
    opts,
    setApi,
    responsive,
  } = props;
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

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
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

  useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  const contextValue = React.useMemo<CarouselContextValue<T>>(() => {
    // const effectiveOrientation = orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal');

    return {
      renderProps: { ...props, canScrollNext, canScrollPrev, scrollNext, scrollPrev },
      componentOverrides: componentOverrides as CarouselOverrides<T> | undefined,
      carouselRef,
    };
  }, [
    componentOverrides,
    props,
    canScrollNext,
    canScrollPrev,
    scrollNext,
    scrollPrev,
    carouselRef,
  ]);

  return (
    <CarouselContext.Provider value={contextValue}>
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

function Carousel<T = Product>(props: CarouselOpts<T>) {
  const { children, items, componentOverrides, ...rest } = props;
  const { autoPlay, slidesToScroll, orientation, loop, responsive } = rest;

  const renderProps: CarouselRenderProps<T> = {
    orientation: orientation || defaultCarouselConfig.orientation,
    autoPlay: autoPlay ?? defaultCarouselConfig.autoPlay,
    loop: loop ?? defaultCarouselConfig.loop,
    slidesToScroll: slidesToScroll ?? defaultCarouselConfig.slidesToScroll,
    responsive: responsive || defaultCarouselConfig.responsive,
    items,
  };

  const plugins = autoPlay ? [Autoplay({ playOnInit: true, delay: 3000 })] : [];

  return (
    <CarouselBase
      className={cn(
        'cio-components w-full h-full flex items-center gap-2',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
      )}
      opts={{
        slidesToScroll: slidesToScroll || defaultCarouselConfig.slidesToScroll,
        align: 'start',
      }}
      plugins={plugins}
      autoPlay={autoPlay ?? defaultCarouselConfig.autoPlay}
      loop={loop ?? defaultCarouselConfig.loop}
      orientation={orientation || defaultCarouselConfig.orientation}
      responsive={responsive || defaultCarouselConfig.responsive}
      componentOverrides={componentOverrides as CarouselOverrides<T>}
      items={items}
      {...rest}>
      <RenderPropsWrapper props={renderProps} override={children || componentOverrides?.reactNode}>
        <CarouselPrevious />
        {items ? (
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index} item={item as Product} index={index}>
                <ProductCard product={item as Product} className='w-full h-full' />
              </CarouselItem>
            ))}
          </CarouselContent>
        ) : null}
        <CarouselNext />
      </RenderPropsWrapper>
    </CarouselBase>
  );
}

function CarouselContent({ className, children, ...props }: ComponentProps<'div'>) {
  const { carouselRef, renderProps, componentOverrides } = useCarousel();
  const { orientation } = renderProps;

  const renderPropFn = typeof children === 'function' && children;

  return (
    <div
      ref={carouselRef}
      className={cn('overflow-hidden w-full relative p-3', className)}
      data-slot='carousel-content'>
      <RenderPropsWrapper
        props={renderProps}
        override={renderPropFn || componentOverrides?.content?.reactNode}>
        <div
          data-slot='carousel-track'
          className={cn(
            'flex items-stretch',
            orientation === 'vertical' ? 'flex-col h-[400px]' : 'flex-row',
          )}
          {...props}>
          {children}
        </div>
      </RenderPropsWrapper>
    </div>
  );
}

function CarouselItem<T = Product>({
  className,
  children,
  item,
  index,
  ...props
}: CarouselItemProps<T>) {
  const { renderProps, componentOverrides } = useCarousel<T>();

  const itemRenderProps: CarouselItemRenderProps<T> = {
    ...(renderProps as CarouselRenderProps<T>),
    item,
    index,
  };

  return (
    <RenderPropsWrapper props={itemRenderProps} override={componentOverrides?.item?.reactNode}>
      <div
        role='group'
        aria-roledescription='slide'
        data-slot='carousel-item'
        className={cn(
          'shrink-0 grow-0 basis-full flex items-stretch justify-center items-center',
          className,
        )}
        {...props}>
        {children}
      </div>
    </RenderPropsWrapper>
  );
}

function CarouselPrevious({ className, ...props }: NavButtonProps) {
  const { renderProps, componentOverrides } = useCarousel();
  const { canScrollPrev, scrollPrev, orientation } = renderProps;

  if (!canScrollPrev) return null;

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.previous?.reactNode}>
      <Button
        data-slot='carousel-previous'
        className={cn(
          'rounded-md bg-white border-1 border-gray-200 flex justify-center items-center shadow-none',
          className,
        )}
        size='icon'
        variant='secondary'
        onClick={scrollPrev}
        {...props}>
        <ArrowLeftIcon className={orientation === 'vertical' ? '-rotate-90' : ''} />
        <span className='sr-only'>Previous slide</span>
      </Button>
    </RenderPropsWrapper>
  );
}

function CarouselNext({ className, ...props }: NavButtonProps) {
  const { renderProps, componentOverrides } = useCarousel();
  const { canScrollNext, scrollNext, orientation } = renderProps;

  if (!canScrollNext) return null;

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.next?.reactNode}>
      <Button
        data-slot='carousel-next'
        className={cn(
          'rounded-md bg-white border-1 border-gray-200 flex justify-center items-center shadow-none',
          className,
        )}
        size='icon'
        variant='secondary'
        onClick={scrollNext}
        {...props}>
        <ArrowRightIcon className={orientation === 'vertical' ? 'rotate-90' : ''} />
        <span className='sr-only'>Next slide</span>
      </Button>
    </RenderPropsWrapper>
  );
}

// Create compound component with all sub-components attached
Carousel.Content = CarouselContent;
Carousel.Item = CarouselItem;
Carousel.Previous = CarouselPrevious;
Carousel.Next = CarouselNext;

export default Carousel;
