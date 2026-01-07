import { PRODUCT_TABS, type ProductTab } from './productTabs';

/**
 * Parses a given tab value and returns a valid ProductTab
 * If the input is not a valid ProductTab, returns the default tab
 *
 * @param {unknown} tab Tab value to parse
 * @returns {ProductTab} Parsed product tab
 */
export function parseProductTab(tab: unknown): ProductTab {
  if (typeof tab === 'string' && PRODUCT_TABS.includes(tab as ProductTab)) {
    return tab as ProductTab;
  }
  return PRODUCT_TABS[0]; // 'top'
}
