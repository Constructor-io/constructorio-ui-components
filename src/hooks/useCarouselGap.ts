import { Orientation, ResponsiveConfig } from '@/components/ui/carousel';
import * as React from 'react';

/**
 * Hook to automatically inject responsive padding (left/top) on carousel items
 * AND matching negative margin on carousel-content, scoped to this carousel instance.
 *
 * Usage: const { rootProps } = useCarouselGap(responsive, orientation)
 */
export function useCarouselGap(responsive: ResponsiveConfig | undefined, orientation: Orientation) {
  const styleRef = React.useRef<HTMLStyleElement | null>(null);
  const uidRef = React.useRef<string>(`carousel-${Math.random().toString(36).slice(2, 9)}`);
  const rootAttrName = 'data-carousel';
  const rootAttrValue = uidRef.current;

  React.useEffect(() => {
    if (!responsive) return;

    // choose properties/selectors based on orientation
    const isHorizontal = orientation === 'horizontal';
    const itemProp = isHorizontal ? 'padding-left' : 'padding-top';
    const containerProp = isHorizontal ? 'margin-left' : 'margin-top';

    const itemSelector = `[${rootAttrName}="${rootAttrValue}"] [data-slot="carousel-item"]`;
    const contentSelector = `[${rootAttrName}="${rootAttrValue}"] [data-slot="carousel-content"]`;
    let css = '';

    const points = Object.entries(responsive)
      .map(([bp, conf]) => ({ bp: Number(bp), gap: conf.gap }))
      .sort((a, b) => a.bp - b.bp);

    for (const { bp, gap } of points) {
      const itemRule = `${itemSelector} { ${itemProp}: ${gap}px; }\n`;
      const contentRule = `${contentSelector} { ${containerProp}: -${gap}px; }\n`;

      if (bp === 0) {
        css += itemRule + contentRule;
      } else {
        css += `@media (min-width: ${bp}px) { ${itemRule}${contentRule} }\n`;
      }
    }

    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-carousel-gap', rootAttrValue);
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    styleRef.current = styleEl;

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
      }
    };
  }, [responsive, orientation]);

  return {
    rootProps: {
      [rootAttrName]: rootAttrValue,
    },
  };
}
