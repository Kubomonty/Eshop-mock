'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Options = {
  enabled: boolean;
  cardStepPx: number;
  itemCount: number;

  minTriggerFraction?: number; // default 0.35
  maxShiftPerRelease?: number; // default 8

  /** Called on release if a shift should occur, positive = move left, negative = move right */
  onShift: (shift: number) => void;

  /** Used to suppress click if user dragged */
  clickSuppressPx?: number; // default 8
};

export function usePointerDragCarousel({
  cardStepPx,
  clickSuppressPx = 8,
  enabled,
  itemCount,
  maxShiftPerRelease = 8,
  minTriggerFraction = 0.35,
  onShift,
}: Options) {
  const draggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const didDragRef = useRef(false);

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSettling, setIsSettling] = useState(false);

  const scheduleDragUpdate = useCallback(
    (clientX: number) => {
      lastXRef.current = clientX;
      if (rafRef.current != null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const dx = lastXRef.current - startXRef.current;
        setDragX(dx);
        if (Math.abs(dx) >= clickSuppressPx) didDragRef.current = true;
      });
    },
    [clickSuppressPx],
  );

  const endDrag = useCallback(
    (clientX: number) => {
      if (!enabled) return;
      if (!draggingRef.current) return;

      draggingRef.current = false;
      pointerIdRef.current = null;

      const dx = clientX - startXRef.current;

      if (itemCount > 0 && cardStepPx > 0) {
        const raw = dx / cardStepPx;

        if (Math.abs(raw) >= minTriggerFraction) {
          let shift = Math.round(raw);

          // avoid 0 if user crosses threshold but rounding returns 0
          if (shift === 0) shift = raw > 0 ? 1 : -1;

          if (shift > maxShiftPerRelease) shift = maxShiftPerRelease;
          if (shift < -maxShiftPerRelease) shift = -maxShiftPerRelease;

          onShift(shift);
        }
      }

      // prevent "animate back" flash
      setIsSettling(true);
      setIsDragging(false);
      setDragX(0);
      requestAnimationFrame(() => setIsSettling(false));

      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    },
    [enabled, itemCount, cardStepPx, minTriggerFraction, maxShiftPerRelease, onShift],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      draggingRef.current = true;
      pointerIdRef.current = e.pointerId;
      startXRef.current = e.clientX;
      lastXRef.current = e.clientX;
      didDragRef.current = false;

      setIsDragging(true);
      setDragX(0);

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [enabled],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled) return;
      if (!draggingRef.current) return;
      if (pointerIdRef.current !== e.pointerId) return;
      scheduleDragUpdate(e.clientX);
    },
    [enabled, scheduleDragUpdate],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (pointerIdRef.current !== e.pointerId) return;
      endDrag(e.clientX);
    },
    [endDrag],
  );

  const onPointerCancel = useCallback(
    (e: React.PointerEvent) => {
      if (pointerIdRef.current !== e.pointerId) return;
      endDrag(e.clientX);
    },
    [endDrag],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /** helper to suppress clicks when user dragged */
  const shouldSuppressClick = useCallback(() => didDragRef.current, []);

  const bind = {
    onPointerCancel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };

  return { bind, dragX, isDragging, isSettling, shouldSuppressClick };
}
