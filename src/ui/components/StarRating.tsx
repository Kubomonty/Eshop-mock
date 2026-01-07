const MAX_RATING = 5;
const DEFAULT_STAR_SIZE_PX = 18;

type StarRatingProps = {
  rating: number;
  ratingCount: number;
  size?: number;
  className?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function toPercent(rating: number, max: number) {
  return (clamp(rating, 0, max) / max) * 100;
}

function StarsRow({ size }: { size: number }) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 100 20" width={size * 5}>
      <defs>
        <path
          d="M10 1.5l2.6 5.6 6.1.5-4.6 3.9 1.4 5.9L10 14.7 4.5 17.4l1.4-5.9L1.3 7.6l6.1-.5L10 1.5z"
          id="star"
        />
      </defs>

      <use href="#star" x="0" />
      <use href="#star" x="20" />
      <use href="#star" x="40" />
      <use href="#star" x="60" />
      <use href="#star" x="80" />
    </svg>
  );
}

export function StarRating({
  className,
  rating,
  ratingCount,
  size = DEFAULT_STAR_SIZE_PX,
}: StarRatingProps) {
  const pct = toPercent(rating, MAX_RATING);

  return (
    <div className={['inline-flex', className].filter(Boolean).join(' ')}>
      <div className="relative inline-block">
        <div className="text-gray-300">
          <StarsRow size={size} />
        </div>
        <div
          className="absolute left-0 top-0 overflow-hidden text-yellow-400"
          style={{ width: `${pct}%` }}
        >
          <StarsRow size={size} />
        </div>
      </div>
      <p className="pl-1 pr-0.5 text-sm text-blue-900 tracking-tight">{rating}</p>
      <p className="text-sm text-gray-400 tracking-tight">({ratingCount}x)</p>
    </div>
  );
}
