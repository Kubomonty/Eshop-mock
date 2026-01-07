import { CategoryNavigation } from '@/features/products/components/CategoryNavigation';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { ProductTabs } from '@/features/products/components/ProductTabs';
import { parseProductTab, type ProductTab, sortProducts } from '@/features/products/domain';
import { getProducts } from '@/services/productsApi.cached';
import { HeroCarousel } from '@/ui/components/carousel/components/HeroCarousel';

export default async function Home({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const sp = await searchParams;
  const products = await getProducts({
    categoryId: '18842920',
    country: 'CZ',
    filterParameters: {
      branchId: '',
      id: 18842920,
      isInStockOnly: false,
      newsOnly: false,
      orderBy: 0,
      page: 1,
      params: [],
      producers: [],
      sendPrices: true,
      type: 'category',
      typeId: '',
      wearType: 0,
    },
  });

  const activeTab: ProductTab = parseProductTab(sp.tab);
  const sortedProducts = sortProducts(products, activeTab);

  return (
    <div className="space-y-10">
      <CategoryNavigation />
      <HeroCarousel products={products.slice(0, 10)} />
      <section>
        <ProductTabs active={activeTab} />
        <ProductGrid products={sortedProducts} />
      </section>
    </div>
  );
}
