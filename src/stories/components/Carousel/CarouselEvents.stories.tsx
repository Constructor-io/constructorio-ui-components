import React, { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import CioCarousel from '../../../components/carousel';
import { Product } from '../../../types/productCardTypes';
import { CIO_EVENTS } from '../../../utils/events';
import { DEMO_IMAGE_URL } from '../../constants';

const meta = {
  title: 'Components/Carousel',
  component: CioCarousel,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CioCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Product ${i + 1}`,
  description: `This is a description for product ${i + 1}`,
  imageUrl: DEMO_IMAGE_URL,
  price: (Math.random() * 100 + 20).toFixed(2),
  salePrice: Math.random() > 0.5 ? (Math.random() * 80 + 10).toFixed(2) : undefined,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviewsCount: Math.floor(Math.random() * 500 + 10),
  tags: ['Tag 1', 'Tag 2'].slice(0, Math.floor(Math.random() * 3)),
}));

function CarouselEventListeningDemo() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const logEvent = (label: string) => (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setEventLog((prev) => [
        `[${new Date().toLocaleTimeString()}] ${label} — direction: ${detail?.direction}, canScrollNext: ${detail?.canScrollNext}, canScrollPrev: ${detail?.canScrollPrev}`,
        ...prev.slice(0, 49),
      ]);
    };

    const handlers = [
      [CIO_EVENTS.carousel.next, logEvent('carousel.next')] as const,
      [CIO_EVENTS.carousel.previous, logEvent('carousel.previous')] as const,
    ];

    handlers.forEach(([name, fn]) => el.addEventListener(name, fn));
    return () => handlers.forEach(([name, fn]) => el.removeEventListener(name, fn));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div ref={wrapperRef}>
        <CioCarousel items={mockProducts} loop={false} />
      </div>
      <div
        style={{
          background: '#1e1e2e',
          color: '#a6e3a1',
          fontFamily: 'monospace',
          fontSize: 12,
          padding: 12,
          borderRadius: 8,
          maxHeight: 200,
          overflowY: 'auto',
        }}>
        <div style={{ marginBottom: 8, color: '#cdd6f4', fontWeight: 600 }}>Event Log</div>
        {eventLog.length === 0 ? (
          <div style={{ color: '#6c7086' }}>Click the carousel arrows to see events...</div>
        ) : (
          eventLog.map((entry, i) => (
            <div key={i} style={{ opacity: 1 - i * 0.015 }}>
              {entry}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export const EventListening: Story = {
  render: () => <CarouselEventListeningDemo />,
  tags: ['!autodocs', '!dev'],
};
