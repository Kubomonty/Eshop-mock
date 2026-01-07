'use client';

import type { BuyAction } from '../domain';

import { BuyButton } from '../../../ui/components/BuyButton';

/**
 * Wrapper around BuyButton to provide product-specific actions.
 */
export function BuyButtonClient({ productName }: { productName: string }) {
  return (
    <BuyButton
      onMenuAction={(action: BuyAction) => alert(`Akce "${action}" na produktu ${productName}`)}
      onPrimary={() => alert(`Koupit: ${productName}`)}
    />
  );
}
