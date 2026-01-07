'use client';

import { useEffect, useRef, useState } from 'react';

import { BuyAction } from '../../features/products/domain';
import { BuyButtonMenu } from './BuyButtonMenu';

type BuyButtonProps = {
  onPrimary?: () => void;
  onMenuAction?: (action: BuyAction) => void;
  className?: string;
};

export function BuyButton({ className, onMenuAction, onPrimary }: BuyButtonProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  function handlePrimary() {
    onPrimary?.();
  }

  function handleArrowClick() {
    setOpen((v) => !v);
  }

  function handleMenuAction(action: BuyAction) {
    onMenuAction?.(action);
    setOpen(false);
  }

  return (
    <div
      className={['relative inline-flex ml-2', className].filter(Boolean).join(' ')}
      ref={rootRef}
    >
      {/* left button - primary action */}
      <button
        className="inline-flex items-center rounded-l-md bg-blue-600 text-xs px-2 sm:py-2 md:text-sm md:px-3 md:py-2 font-semibold text-white hover:bg-blue-700"
        onClick={handlePrimary}
        type="button"
      >
        Koupit
      </button>

      {/* right button - menu arrow */}
      <button
        className={[
          'inline-flex items-center justify-center rounded-r-md bg-blue-600 px-1 md:px-2 text-white hover:bg-blue-700 border-l border-white/25',
          open ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700',
        ].join(' ')}
        onClick={handleArrowClick}
        type="button"
      >
        ▾
      </button>

      {open && <BuyButtonMenu onAction={handleMenuAction} />}
    </div>
  );
}
