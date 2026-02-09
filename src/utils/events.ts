import type { Product } from '@/types/productCardTypes';

/**
 * Canonical event name constants for Constructor.io UI component events.
 */
export const CIO_EVENTS = Object.freeze({
  productCard: Object.freeze({
    click: 'cio.components.productCard.click' as const,
    conversion: 'cio.components.productCard.conversion' as const,
    imageEnter: 'cio.components.productCard.imageEnter' as const,
    imageLeave: 'cio.components.productCard.imageLeave' as const,
  }),
  carousel: Object.freeze({
    next: 'cio.components.carousel.next' as const,
    previous: 'cio.components.carousel.previous' as const,
  }),
});

export interface ProductCardEventDetail {
  product: Product;
}

export interface CarouselNavEventDetail {
  direction: 'next' | 'previous';
  canScrollNext: boolean;
  canScrollPrev: boolean;
}

export interface CioEventDetailMap {
  [CIO_EVENTS.productCard.click]: ProductCardEventDetail;
  [CIO_EVENTS.productCard.conversion]: ProductCardEventDetail;
  [CIO_EVENTS.productCard.imageEnter]: ProductCardEventDetail;
  [CIO_EVENTS.productCard.imageLeave]: ProductCardEventDetail;
  [CIO_EVENTS.carousel.next]: CarouselNavEventDetail;
  [CIO_EVENTS.carousel.previous]: CarouselNavEventDetail;
}

/**
 * Dispatches a typed CustomEvent on `window` for the given CIO event name.
 *
 * This is the primary pub-sub mechanism for Constructor.io UI component events.
 * Consumers subscribe via `window.addEventListener(CIO_EVENTS.*.*, handler)`.
 * No-ops in SSR environments where `window` is undefined.
 *
 * @param eventName - A key from {@link CioEventDetailMap} (use `CIO_EVENTS` constants).
 * @param detail - The strongly-typed payload for the event.
 */
export function dispatchCioEvent<K extends keyof CioEventDetailMap>(
  eventName: K,
  detail: CioEventDetailMap[K],
): void {
  if (typeof window === 'undefined') return;

  const event = new CustomEvent(eventName, {
    bubbles: false,
    cancelable: true,
    detail,
  });
  window.dispatchEvent(event);
}
