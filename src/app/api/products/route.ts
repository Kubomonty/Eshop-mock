import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

type ProductsPostBody = {
  filterParameters?: {
    page?: number;
    [key: string]: unknown;
  };
};

function readMockProducts(): unknown {
  const filePath = path.join(process.cwd(), 'src', 'app', 'api', 'products', 'products.mock.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);

  return data;
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const categoryId = url.searchParams.get('categoryId');
    const country = url.searchParams.get('country');

    let body: ProductsPostBody = {};
    try {
      body = (await req.json()) as ProductsPostBody;
    } catch {
      body = {};
      return NextResponse.json({ error: `Body must be JSON, received ${body}` }, { status: 500 });
    }

    await new Promise((r) => setTimeout(r, 1000));

    const products = readMockProducts();

    return NextResponse.json({
      meta: {
        categoryId,
        country,
      },
      products,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
