import { Orientation, ResponsiveConfig } from '@/components/carousel';
import * as React from 'react';
/**
 * Responsive carousel styling hook using flex + gap (no negative margins).
 * Adds track padding to avoid first/last slide touching when loop is enabled.
 */
export function useCarouselResponsive(
  responsive: ResponsiveConfig | undefined,
  orientation: Orientation = 'horizontal',
) {
  const styleRef = React.useRef<HTMLStyleElement | null>(null);
  const uidRef = React.useRef<string>(`carousel-${Math.random().toString(36).slice(2, 9)}`);
  const rootAttrName = 'data-carousel';
  const rootAttrValue = uidRef.current;

  React.useEffect(() => {
    if (!responsive) return;

    const isHorizontal = orientation === 'horizontal';
    const trackSelector = `[${rootAttrName}="${rootAttrValue}"] [data-slot="carousel-track"]`;
    const itemSelector = `[${rootAttrName}="${rootAttrValue}"] [data-slot="carousel-item"]`;

    let css = '';
    const peekPercentage = 4; // Standard peek window percentage

    const points = Object.entries(responsive)
      .map(([bp, conf]) => ({
        bp: Number(bp),
        gap: conf.gap,
        slidesToShow: conf.slidesToShow,
      }))
      .sort((a, b) => a.bp - b.bp);

    for (const { bp, gap, slidesToShow } of points) {
      const basis = `calc(${100 / slidesToShow}% - ${(peekPercentage / slidesToShow).toFixed(2)}%)`;

      const trackPad = isHorizontal ? `padding-left: ${gap}px;` : `padding-top: ${gap}px;`;

      const rule = `
        ${trackSelector} {
          display: flex;
          flex-direction: ${isHorizontal ? 'row' : 'column'};
          gap: ${gap}px;
          ${trackPad}
        }
        ${itemSelector} {
          flex: 0 0 ${basis};
        }
      `;

      if (bp === 0) css += rule;
      else css += `@media (min-width: ${bp}px) { ${rule} }\n`;
    }

    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-carousel-style', rootAttrValue);
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    styleRef.current = styleEl;

    return () => {
      if (styleRef.current?.parentNode) {
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
