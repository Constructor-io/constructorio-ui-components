import type { Product, ProductCardOverrides } from '@/types/productCardTypes';
import type {
  ComponentOverrideProps,
  IncludeComponentOverrides,
  RenderPropsChildren,
} from '@/types';
import type { ComponentProps, ReactNode, RefObject } from 'react';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import type useEmblaCarousel from 'embla-carousel-react';
import type Button from '@/components/button';

export type Orientation = 'horizontal' | 'vertical';

export type ResponsivePoint = {
  slidesToShow: number;
  gap?: number; // px
};

export type ResponsiveConfig = {
  [breakpointPx: number]: ResponsivePoint;
};

export type CarouselApi = UseEmblaCarouselType[1];
export type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
export type CarouselOptions = UseCarouselParameters[0];
export type CarouselPlugin = UseCarouselParameters[1];

export type CarouselProps<T = Product> = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  setApi?: (api: CarouselApi) => void;
} & CarouselOpts<T>;

export type CarouselContextValue<T = Product> = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  rootRef: RefObject<HTMLDivElement | null>;
  renderProps: CarouselRenderProps<T>;
  componentOverrides?: CarouselOverrides<T>;
} & CarouselProps<T>;

export type NavButtonProps = Omit<ComponentProps<typeof Button>, 'children'> & {
  children?: ReactNode;
};

export type CarouselItemProps<T = Product> = ComponentProps<'div'> & {
  item?: T;
  index?: number;
};

export type CarouselRenderProps<T = Product> = {
  orientation?: Orientation;
  autoPlay?: boolean;
  loop?: boolean;
  slidesToScroll?: 'auto' | number;
  responsive?: ResponsiveConfig;
  items?: T[];
  scrollPrev?: () => void;
  scrollNext?: () => void;
  canScrollPrev?: boolean;
  canScrollNext?: boolean;
};

export type CarouselItemRenderProps<T = Product> = CarouselRenderProps<T> & {
  item?: T;
  index?: number;
};

export type CarouselOverrides<T = Product> = ComponentOverrideProps<CarouselRenderProps<T>> & {
  content?: ComponentOverrideProps<CarouselRenderProps<T>>;
  item?: ComponentOverrideProps<CarouselItemRenderProps<T>> & {
    productCard?: ProductCardOverrides;
  };
  previous?: ComponentOverrideProps<CarouselRenderProps<T>>;
  next?: ComponentOverrideProps<CarouselRenderProps<T>>;
};

export type CarouselOpts<T = Product> = CarouselRenderProps<T> &
  IncludeComponentOverrides<CarouselOverrides<T>> &
  Omit<ComponentProps<'div'>, 'children'> & {
    children?: RenderPropsChildren<CarouselRenderProps<T>>;
  };
