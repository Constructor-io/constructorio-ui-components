import React, { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import ProductCard from '../../../components/product-card';
import { CIO_EVENTS } from '../../../utils/events';
import { DEMO_IMAGE_URL } from '../../constants';

const meta = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

function ProductCardEventListeningDemo() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const logEvent = (label: string) => (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setEventLog((prev) => [
        `[${new Date().toLocaleTimeString()}] ${label} — product: ${detail?.product?.name ?? 'N/A'}`,
        ...prev.slice(0, 49),
      ]);
    };

    const handlers = [
      [CIO_EVENTS.productCard.click, logEvent('productCard.click')] as const,
      [CIO_EVENTS.productCard.conversion, logEvent('productCard.conversion')] as const,
      [CIO_EVENTS.productCard.imageEnter, logEvent('productCard.imageEnter')] as const,
      [CIO_EVENTS.productCard.imageLeave, logEvent('productCard.imageLeave')] as const,
    ];

    handlers.forEach(([name, fn]) => el.addEventListener(name, fn));
    return () => handlers.forEach(([name, fn]) => el.removeEventListener(name, fn));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <div ref={wrapperRef}>
        <ProductCard
          product={{
            id: 'highland-golf-pants',
            variationId: 'highland-golf-pants--navy',
            name: 'Highland Golf Pants',
            imageUrl: DEMO_IMAGE_URL,
            price: '299',
            rating: 4.8,
            reviewsCount: 2713,
          }}
          priceCurrency='$'
          onAddToCart={() => {}}
        />
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
          <div style={{ color: '#6c7086' }}>Interact with the card above to see events...</div>
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
  render: () => <ProductCardEventListeningDemo />,
  tags: ['!autodocs', '!dev'],
};
