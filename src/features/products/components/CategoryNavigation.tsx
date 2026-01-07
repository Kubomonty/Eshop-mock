// disabling no-img-element for this file, since we are loading only the "icons" for the categories and they are lazy loaded
/* eslint-disable @next/next/no-img-element */
import { NOTEBOOK_CATEGORIES } from '../data/categories';

export function CategoryNavigation() {
  return (
    <section className="mb-6">
      <h1 className="font-bold text-3xl  mb-4">Notebooky</h1>

      <nav aria-label="Kategórie notebookov">
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {NOTEBOOK_CATEGORIES.map((category) => (
            <li key={category.id}>
              <a
                className="flex w-full h-full items-center gap-3 rounded-xs bg-sky-100 px-3 py-2 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                href={category.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt=""
                  className="shrink-0"
                  height={32}
                  loading="lazy"
                  src={category.imageUrl}
                  width={32}
                />
                <span className="font-semibold text-sm">{category.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
