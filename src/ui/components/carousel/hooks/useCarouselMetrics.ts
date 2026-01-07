'use client';

import { useCallback, useEffect, useState } from 'react';

export function useCarouselMetrics(
  containerRef: React.RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  const itemSelector = '[data-product-id]'; // Hardcoded default

  const [cardStepPx, setCardStepPx] = useState(0);
  const [capacity, setCapacity] = useState(0);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.getBoundingClientRect().width;

    const first = container.querySelector(itemSelector) as HTMLElement | null;
    if (!first) {
      setCardStepPx(0);
      setCapacity(0);
      return;
    }

    const rect = first.getBoundingClientRect();
    const style = window.getComputedStyle(first);
    const ml = parseFloat(style.marginLeft || '0');
    const mr = parseFloat(style.marginRight || '0');

    const step = rect.width + ml + mr;

    setCardStepPx(step);

    const cap = step > 0 ? Math.max(1, Math.floor(containerWidth / step)) : 0;
    setCapacity(cap);
  }, [containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // initial measure after first paint
    requestAnimationFrame(measure);

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(measure);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef, measure]);

  // re-measure when deps change (e.g. products list changes)
  useEffect(() => {
    requestAnimationFrame(measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { capacity, cardStepPx, measure };
}
