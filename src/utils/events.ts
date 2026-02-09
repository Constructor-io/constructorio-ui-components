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
 * Dispatches a typed CustomEvent for the given CIO event name.
 *
 * This is the primary pub-sub mechanism for Constructor.io UI component events.
 * When a `target` element is provided, the event is dispatched on that element
 * and bubbles up the DOM tree. Consumers can listen on the component element or
 * any ancestor. When no target is provided (or during SSR), falls back to
 * dispatching on `window` for backwards compatibility.
 *
 * @param eventName - A key from {@link CioEventDetailMap} (use `CIO_EVENTS` constants).
 * @param detail - The strongly-typed payload for the event.
 * @param target - Optional DOM element to dispatch the event on. Falls back to `window`.
 */
export function dispatchCioEvent<K extends keyof CioEventDetailMap>(
  eventName: K,
  detail: CioEventDetailMap[K],
  target?: EventTarget | null,
): void {
  if (typeof window === 'undefined') return;

  const event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    detail,
  });
  (target || window).dispatchEvent(event);
}
