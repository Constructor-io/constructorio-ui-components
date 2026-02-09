import { describe, test, expect, vi, afterEach } from 'vitest';
import { CIO_EVENTS, dispatchCioEvent } from '@/utils/events';

describe('Event utility', () => {
  describe('CIO_EVENTS constants', () => {
    test('productCard event names are correct string literals', () => {
      expect(CIO_EVENTS.productCard.click).toBe('cio.components.productCard.click');
      expect(CIO_EVENTS.productCard.conversion).toBe('cio.components.productCard.conversion');
      expect(CIO_EVENTS.productCard.imageEnter).toBe('cio.components.productCard.imageEnter');
      expect(CIO_EVENTS.productCard.imageLeave).toBe('cio.components.productCard.imageLeave');
    });

    test('carousel event names are correct string literals', () => {
      expect(CIO_EVENTS.carousel.next).toBe('cio.components.carousel.next');
      expect(CIO_EVENTS.carousel.previous).toBe('cio.components.carousel.previous');
    });

    test('CIO_EVENTS object is frozen (immutable)', () => {
      expect(Object.isFrozen(CIO_EVENTS)).toBe(true);
      expect(Object.isFrozen(CIO_EVENTS.productCard)).toBe(true);
      expect(Object.isFrozen(CIO_EVENTS.carousel)).toBe(true);
    });
  });

  describe('dispatchCioEvent', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    test('dispatches CustomEvent on window with correct event name', () => {
      const listener = vi.fn();
      window.addEventListener(CIO_EVENTS.productCard.click, listener);

      const detail = { product: { id: '1', name: 'Test' } };
      dispatchCioEvent(CIO_EVENTS.productCard.click, detail);

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.type).toBe('cio.components.productCard.click');

      window.removeEventListener(CIO_EVENTS.productCard.click, listener);
    });

    test('dispatches with correct detail payload', () => {
      const listener = vi.fn();
      window.addEventListener(CIO_EVENTS.productCard.click, listener);

      const detail = { product: { id: '42', name: 'Widget' } };
      dispatchCioEvent(CIO_EVENTS.productCard.click, detail);

      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail).toEqual(detail);

      window.removeEventListener(CIO_EVENTS.productCard.click, listener);
    });

    test('dispatches with bubbles and cancelable set to true', () => {
      const listener = vi.fn();
      window.addEventListener(CIO_EVENTS.carousel.next, listener);

      dispatchCioEvent(CIO_EVENTS.carousel.next, {
        direction: 'next',
        canScrollNext: true,
        canScrollPrev: false,
      });

      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.bubbles).toBe(true);
      expect(event.cancelable).toBe(true);

      window.removeEventListener(CIO_EVENTS.carousel.next, listener);
    });
  });
});
