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

import { cn, RenderPropsWrapper, dispatchCioEvent, CIO_EVENTS } from '@/utils';
import Button from '@/components/button';
import { useCarouselResponsive } from '@/hooks/useCarouselResponsive';
import { useCarouselTweenOpacity } from '@/hooks/useCarouselTweenOpacity';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ProductCard from '@/components/product-card';
import { Product } from '@/types/productCardTypes';
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
} from '@/types/carouselTypes';

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
  plugins,
  ...props
}: ComponentProps<'div'> & CarouselProps<T>) {
  const {
    orientation = 'horizontal',
    autoPlay,
    loop = true,
    slidesToScroll = 1,
    opts,
    setApi,
    responsive,
    items,
  } = props;

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
      api?.off('reInit', onSelect);
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  const contextValue = React.useMemo<CarouselContextValue<T>>(() => {
    return {
      renderProps: {
        orientation,
        autoPlay,
        loop,
        slidesToScroll,
        responsive,
        items,
        canScrollNext,
        canScrollPrev,
        scrollNext,
        scrollPrev,
      },
      componentOverrides: componentOverrides as CarouselOverrides<T> | undefined,
      carouselRef,
    };
  }, [
    orientation,
    autoPlay,
    loop,
    slidesToScroll,
    responsive,
    items,
    componentOverrides,
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
        className={cn('cio:relative', className)}
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
        'cio-components cio:w-full cio:h-full cio:flex cio:items-center cio:gap-2',
        orientation === 'vertical' ? 'cio:flex-col' : 'cio:flex-row',
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
            {items.map((item, index) => {
              const product = item as Product;

              return (
                <CarouselItem key={index} item={product} index={index}>
                  <ProductCard
                    product={product}
                    className='cio:w-full cio:h-full'
                    componentOverrides={componentOverrides?.item?.productCard}
                  />
                </CarouselItem>
              );
            })}
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
      className={cn('cio:overflow-hidden cio:w-full cio:relative cio:p-3', className)}
      data-slot='carousel-content'>
      <RenderPropsWrapper
        props={renderProps}
        override={renderPropFn || componentOverrides?.content?.reactNode}>
        <div
          data-slot='carousel-track'
          className={cn(
            'cio:flex cio:items-stretch',
            orientation === 'vertical' ? 'cio:flex-col cio:h-[400px]' : 'cio:flex-row',
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
          'cio:shrink-0 cio:grow-0 cio:basis-full cio:flex cio:items-stretch cio:justify-center cio:items-center',
          className,
        )}
        {...props}>
        {children}
      </div>
    </RenderPropsWrapper>
  );
}

type CarouselDirection = 'previous' | 'next';

function CarouselNavButton({
  direction,
  className,
  ...props
}: NavButtonProps & { direction: CarouselDirection }) {
  const { renderProps, componentOverrides } = useCarousel();
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext, orientation } = renderProps;

  const isPrevious = direction === 'previous';
  const canScroll = isPrevious ? canScrollPrev : canScrollNext;
  const scrollFn = isPrevious ? scrollPrev : scrollNext;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const eventName = isPrevious ? CIO_EVENTS.carousel.previous : CIO_EVENTS.carousel.next;

      dispatchCioEvent(
        eventName,
        {
          direction,
        },
        e.currentTarget,
      );

      scrollFn?.();
    },
    [isPrevious, direction, scrollFn],
  );

  const override = isPrevious
    ? componentOverrides?.previous?.reactNode
    : componentOverrides?.next?.reactNode;

  return (
    <RenderPropsWrapper props={renderProps} override={override}>
      <Button
        data-slot={isPrevious ? 'carousel-previous' : 'carousel-next'}
        className={cn(
          'cio:rounded-md cio:bg-white cio:border-1 cio:border-gray-200 cio:flex cio:justify-center cio:items-center cio:shadow-none',
          canScroll ? '' : 'cio:invisible',
          className,
        )}
        size='icon'
        variant='secondary'
        onClick={handleClick}
        {...props}>
        {isPrevious ? (
          <ArrowLeftIcon className={orientation === 'vertical' ? 'cio:rotate-90' : ''} />
        ) : (
          <ArrowRightIcon className={orientation === 'vertical' ? 'cio:rotate-90' : ''} />
        )}
        <span className='cio:sr-only'>{isPrevious ? 'Previous slide' : 'Next slide'}</span>
      </Button>
    </RenderPropsWrapper>
  );
}

function CarouselPrevious(props: NavButtonProps) {
  return <CarouselNavButton direction='previous' {...props} />;
}

function CarouselNext(props: NavButtonProps) {
  return <CarouselNavButton direction='next' {...props} />;
}

// Attach compound components to Carousel
Carousel.Content = CarouselContent;
Carousel.Item = CarouselItem;
Carousel.Previous = CarouselPrevious;
Carousel.Next = CarouselNext;

export default Carousel;
