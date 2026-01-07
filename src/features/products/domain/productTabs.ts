/**
 * Defines the available product tabs and their labels
 */
export const PRODUCT_TABS = ['top', 'bestsellers', 'price_asc', 'price_desc'] as const;

/**
 * Type representing a product tab
 */
export type ProductTab = (typeof PRODUCT_TABS)[number];

/**
 * Labels for each product tab.
 */
export const PRODUCT_TAB_LABELS: Record<ProductTab, string> = {
  bestsellers: 'Nejprodávanější',
  price_asc: 'Od nejlevnějšího',
  price_desc: 'Od nejdražšího',
  top: 'TOP',
};
