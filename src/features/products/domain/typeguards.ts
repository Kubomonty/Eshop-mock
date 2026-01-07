import type { ProductDTO } from './types';

/**
 * Typeguard for the full API response structure
 *
 * @param {unknown} obj Object to check
 * @returns {obj is {meta: {categoryId: string; country: string}; products: {data: ProductDTO[]; data_cnt: number; [key: string]: unknown}}}
 */
export function isProductsApiResponse(obj: unknown): obj is {
  meta: { categoryId: string; country: string };
  products: { data: ProductDTO[]; data_cnt: number; [key: string]: unknown };
} {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'meta' in obj &&
    typeof obj.meta === 'object' &&
    obj.meta !== null &&
    'categoryId' in obj.meta &&
    typeof obj.meta.categoryId === 'string' &&
    'country' in obj.meta &&
    typeof obj.meta.country === 'string' &&
    'products' in obj &&
    typeof obj.products === 'object' &&
    obj.products !== null &&
    'data' in obj.products &&
    Array.isArray(obj.products.data) &&
    obj.products.data.every(isProductDTO) &&
    'data_cnt' in obj.products &&
    typeof obj.products.data_cnt === 'number'
  );
}

/**
 * Typeguard for a single ProductDTO (basic checks)
 *
 * @param {unknown} obj Object to check
 * @returns {obj is ProductDTO}
 */
export function isProductDTO(obj: unknown): obj is ProductDTO {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    typeof obj.id === 'number' &&
    'name' in obj &&
    typeof obj.name === 'string' &&
    'price' in obj &&
    typeof obj.price === 'string' &&
    'img' in obj &&
    typeof obj.img === 'string' &&
    'url' in obj &&
    typeof obj.url === 'string' &&
    'rating' in obj &&
    typeof obj.rating === 'number' &&
    'spec' in obj &&
    typeof obj.spec === 'string' &&
    'avail' in obj &&
    typeof obj.avail === 'string'
  );
}
