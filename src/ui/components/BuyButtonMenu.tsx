'use client';

import { BUY_ACTIONS, BUY_ACTION_LABELS, type BuyAction } from '../../features/products/domain';

type BuyMenuProps = {
  onAction: (action: BuyAction) => void;
};

export function BuyButtonMenu({ onAction }: BuyMenuProps) {
  return (
    <div className="absolute right-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
      {BUY_ACTIONS.map((id) => (
        <button
          className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
          key={id}
          onClick={() => onAction(id)}
          type="button"
        >
          {BUY_ACTION_LABELS[id]}
        </button>
      ))}
    </div>
  );
}
