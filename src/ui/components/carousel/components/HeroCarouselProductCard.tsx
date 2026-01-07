import Image from 'next/image';

import type { Product } from '../../../../features/products/domain/types';

import { StarRating } from '../../StarRating';

type Props = {
  product: Product;
  widthPx?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function HeroCarouselProductCard({ onClick, product, widthPx = 220 }: Props) {
  return (
    <a
      className="flex-shrink-0 rounded-xl border border-gray-200 bg-white p-3 hover:shadow-md hover:border-gray-300 transition"
      draggable={false}
      href={product.url}
      onClick={onClick}
      onDragStart={(e) => e.preventDefault()}
      rel="noopener noreferrer"
      style={{ maxWidth: widthPx, minWidth: widthPx, width: widthPx }}
      target="_blank"
    >
      <div
        className="w-full rounded-lg overflow-hidden h-32 sm:h-36 md:h-40 flex items-center justify-center"
        style={{ position: 'relative' }}
      >
        <Image alt={product.name} className="object-contain" fill src={product.img} />
      </div>

      <div className="mt-3 space-y-1">
        <div className="line-clamp-2 text-sm font-semibold">{product.name}</div>
        <StarRating rating={product.rating} ratingCount={product.ratingCount} />
        <div className="pt-1 text-green-700 font-bold">{product.priceText} Kč</div>
      </div>
    </a>
  );
}
