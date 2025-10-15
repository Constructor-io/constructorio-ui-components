import { ResponsiveConfig } from '@/components/ui/carousel';
import * as React from 'react';

/**
 * Hook to automatically inject responsive padding-left on carousel items
 * scoped to this carousel instance.
 */
export function useCarouselGap(responsive: ResponsiveConfig | undefined) {
  const styleRef = React.useRef<HTMLStyleElement | null>(null);
  const uidRef = React.useRef<string>(`carousel-${Math.random().toString(36).slice(2, 9)}`);
  const rootAttr = `data-carousel="${uidRef.current}"`;

  // Determine default (smallest breakpoint) fallback
  const defaultGap = React.useMemo(() => {
    if (!responsive) return 16;
    const entries = Object.entries(responsive).map(([k, v]) => ({ bp: Number(k), gap: v.gap }));
    const sorted = entries.sort((a, b) => a.bp - b.bp);
    return sorted[0]?.gap ?? 16;
  }, [responsive]);

  React.useEffect(() => {
    if (!responsive) return;

    const selector = `[${rootAttr}] [data-slot="carousel-item"]`;
    let css = '';

    const points = Object.entries(responsive)
      .map(([bp, conf]) => ({ bp: Number(bp), gap: conf.gap }))
      .sort((a, b) => a.bp - b.bp);

    for (const { bp, gap } of points) {
      const rule = `${selector} { padding-left: ${gap}px; }\n`;
      if (bp === 0) {
        css += rule;
      } else {
        css += `@media (min-width: ${bp}px) { ${rule} }\n`;
      }
    }

    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-carousel-gap', uidRef.current);
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    styleRef.current = styleEl;

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
      }
    };
  }, [responsive]);

  // Inline style fallback for SSR / hydration safety
  const rootStyle: React.CSSProperties = {
    paddingLeft: `${defaultGap}px`, // optional, will be overridden by CSS for items
  };

  return {
    rootProps: {
      [rootAttr]: '',
      style: rootStyle,
    },
  };
}
