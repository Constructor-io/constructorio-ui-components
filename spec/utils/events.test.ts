import { describe, test, expect, vi, afterEach } from 'vitest';
import { CIO_EVENTS, dispatchCioEvent } from '@/utils/events';
import type { Product } from '@/types/productCardTypes';

const mockProduct: Product = { id: '1', name: 'Test Product' };

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

      const detail = { product: mockProduct };
      dispatchCioEvent(CIO_EVENTS.productCard.click, detail);

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.type).toBe('cio.components.productCard.click');

      window.removeEventListener(CIO_EVENTS.productCard.click, listener);
    });

    test('dispatches with correct detail payload', () => {
      const listener = vi.fn();
      window.addEventListener(CIO_EVENTS.productCard.click, listener);

      const detail = { product: mockProduct };
      dispatchCioEvent(CIO_EVENTS.productCard.click, detail);

      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail).toEqual(detail);

      window.removeEventListener(CIO_EVENTS.productCard.click, listener);
    });

    test('no-ops without throwing when window is undefined (SSR)', () => {
      const originalWindow = globalThis.window;
      delete (globalThis as Record<string, unknown>).window;
      try {
        expect(() => {
          dispatchCioEvent(CIO_EVENTS.productCard.click, { product: mockProduct });
        }).not.toThrow();
      } finally {
        globalThis.window = originalWindow;
      }
    });

    test('dispatches with bubbles true and cancelable true', () => {
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

    test('dispatches on a specific DOM element when target is provided', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);
      const listener = vi.fn();
      element.addEventListener(CIO_EVENTS.productCard.click, listener);

      dispatchCioEvent(CIO_EVENTS.productCard.click, { product: mockProduct }, element);

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail.product).toEqual(mockProduct);

      element.removeEventListener(CIO_EVENTS.productCard.click, listener);
      document.body.removeChild(element);
    });

    test('event bubbles from child element to parent listener', () => {
      const parent = document.createElement('div');
      const child = document.createElement('span');
      parent.appendChild(child);
      document.body.appendChild(parent);

      const parentListener = vi.fn();
      parent.addEventListener(CIO_EVENTS.productCard.click, parentListener);

      dispatchCioEvent(CIO_EVENTS.productCard.click, { product: mockProduct }, child);

      expect(parentListener).toHaveBeenCalledTimes(1);

      parent.removeEventListener(CIO_EVENTS.productCard.click, parentListener);
      document.body.removeChild(parent);
    });

    test('falls back to window when target is null', () => {
      const listener = vi.fn();
      window.addEventListener(CIO_EVENTS.productCard.click, listener);

      dispatchCioEvent(CIO_EVENTS.productCard.click, { product: mockProduct }, null);

      expect(listener).toHaveBeenCalledTimes(1);

      window.removeEventListener(CIO_EVENTS.productCard.click, listener);
    });

    test('falls back to window when target is undefined', () => {
      const listener = vi.fn();
      window.addEventListener(CIO_EVENTS.productCard.click, listener);

      dispatchCioEvent(CIO_EVENTS.productCard.click, { product: mockProduct }, undefined);

      expect(listener).toHaveBeenCalledTimes(1);

      window.removeEventListener(CIO_EVENTS.productCard.click, listener);
    });
  });
});
