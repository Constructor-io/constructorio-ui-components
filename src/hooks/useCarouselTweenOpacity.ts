import { useEffect } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

// Visibility ratio at which a slide becomes fully visible
const FULL_OPACITY_VISIBILITY_THRESHOLD = 0.94;
// Minimum opacity applied to barely visible slides (to keep them noticeable)
const MIN_SLIDE_OPACITY = 0.1;

export function useCarouselTweenOpacity(
  api: EmblaCarouselType | undefined,
  orientation: 'horizontal' | 'vertical' = 'horizontal',
) {
  useEffect(() => {
    if (!api) return;

    const tweenOpacity = () => {
      const viewport = api.rootNode();
      if (!viewport) return;

      const viewportRect = viewport.getBoundingClientRect();

      api.slideNodes().forEach((slideNode) => {
        const rect = slideNode.getBoundingClientRect();

        let visibleLength: number;
        let slideLength: number;

        if (orientation === 'horizontal') {
          slideLength = rect.width;
          visibleLength =
            Math.min(rect.right, viewportRect.right) - Math.max(rect.left, viewportRect.left);
        } else {
          slideLength = rect.height;
          visibleLength =
            Math.min(rect.bottom, viewportRect.bottom) - Math.max(rect.top, viewportRect.top);
        }

        const visibilityRatio = Math.min(Math.max(visibleLength / slideLength, 0), 1);

        // Minimum opacity for barely visible slides
        const opacity =
          visibilityRatio >= FULL_OPACITY_VISIBILITY_THRESHOLD
            ? 1
            : Math.max(visibilityRatio, MIN_SLIDE_OPACITY);

        slideNode.style.opacity = opacity.toString();
      });
    };

    // Run once on mount
    tweenOpacity();

    // Subscribe to scroll and reInit events
    api.on('scroll', tweenOpacity);
    api.on('reInit', tweenOpacity);

    return () => {
      api.off('scroll', tweenOpacity);
      api.off('reInit', tweenOpacity);
    };
  }, [api, orientation]);
}
