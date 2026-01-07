/**
 * Defines the available buy actions for products
 */
export const BUY_ACTIONS = ['buy_fast', 'compare', 'watch', 'add_to_list'] as const;

/**
 * Type representing a buy action
 */
export type BuyAction = (typeof BUY_ACTIONS)[number];

/**
 * Labels for each buy action
 */
export const BUY_ACTION_LABELS: Record<BuyAction, string> = {
  add_to_list: 'Přidat do seznamu',
  buy_fast: 'Koupit zrychleně',
  compare: 'Porovnat',
  watch: 'Hlídat',
};
