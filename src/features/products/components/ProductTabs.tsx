import Link from 'next/link';

import { PRODUCT_TABS, PRODUCT_TAB_LABELS, type ProductTab } from '../domain';

function tabClass(isActive: boolean) {
  return [
    'px-4 py-2 text-sm',
    'border-t-3 border-x border-gray-200',
    'transition-colors duration-150',

    isActive
      ? 'border-t-sky-400 bg-white font-semibold -mb-px'
      : 'border-t-transparent bg-gray-100 hover:border-t-gray-400 hover:bg-gray-200',
  ].join(' ');
}

export function ProductTabs({ active }: { active: ProductTab }) {
  return (
    <div className="flex gap-1">
      {PRODUCT_TABS.map((tab) => (
        <Link className={tabClass(tab === active)} href={`/?tab=${tab}`} key={tab}>
          {PRODUCT_TAB_LABELS[tab]}
        </Link>
      ))}
    </div>
  );
}
