import type { Product, ProductDTO, ProductsRequest } from '@/features/products/domain/types';

import { isProductsApiResponse } from '@/features/products/domain/typeguards';

/**
 * Parses a price string into a number
 *
 * @param {string} price Price string to parse
 * @returns {number} Parsed price as a number
 */
const parsePrice = (price: string): number => {
  // Remove &nbsp;, spaces, and currency, then parse as float
  return parseFloat(price.replace(/&nbsp;|\u00A0|\s|Kč/g, '')) || 0;
};

// const baseUrl = process.env.API_BASE_URL; - for real API, now we are using local mock since CloudFlare blocks requests from localhost
const baseUrl = 'http://localhost:3000/api';
if (!baseUrl) {
  throw new Error('Missing API_BASE_URL in .env.local');
}

/**
 * Fetches products from the API based on the provided request parameters
 *
 * @param {ProductsRequest} req Products request parameters
 * @returns {Promise<Product[]>} A promise that resolves to an array of products
 */
export async function fetchProducts(req: ProductsRequest): Promise<Product[]> {
  const url = new URL(`${baseUrl}/products`);
  url.searchParams.set('categoryId', req.categoryId);
  url.searchParams.set('country', req.country);
  const body = JSON.stringify({ filterParameters: req.filterParameters });

  const res = await fetch(url.toString(), {
    body: body,
    cache: 'no-store', // POST is not cached by default, we are handling caching separately
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  const responseData = await res.json();

  if (!isProductsApiResponse(responseData)) {
    throw new Error('Invalid API response structure');
  }

  const responseProducts = responseData.products.data.map(
    (product: ProductDTO): Product => ({
      avail: product.avail,
      id: product.id,
      img: product.img,
      name: product.name,
      price: parsePrice(product.price),
      priceText: product.price,
      rating: product.rating,
      ratingCount: product.ratingCount,
      spec: product.spec,
      url: product.url,
    }),
  );

  return responseProducts;
}
