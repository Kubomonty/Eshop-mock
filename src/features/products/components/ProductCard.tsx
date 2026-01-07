import Image from 'next/image';

import { StarRating } from '../../../ui/components/StarRating';
import { Product } from '../domain/types';
import { BuyButtonClient } from './BuyButtonClient';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex bg-white border-t border-white rounded-xl hover:border-gray-100 hover:shadow-lg/20 p-4">
      <div className="flex flex-1 flex-col content-between">
        <a
          className="flex flex-1 flex-col"
          href={product.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="flex-1 pb-3">
            <h3 className="font-semibold text-sm pb-2">{product.name}</h3>
            <p className="font-light text-xs">{product.spec}</p>
          </div>
          <Image
            alt={product.name}
            className="rounded-md my-3"
            height="160"
            src={product.img}
            width="160"
          />
          <StarRating rating={product.rating} ratingCount={product.ratingCount} />
        </a>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold">{product.priceText}</span>
          <BuyButtonClient productName={product.name} />
        </div>
        <div className="mt-3 text-xs text-gray-400 text-center">{product.avail}</div>
      </div>
    </div>
  );
}
