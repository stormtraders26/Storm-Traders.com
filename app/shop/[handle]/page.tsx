import BackButton from "./BackButton";
import ImageGallery from "./ImageGallery";

type PageProps = {
  params: Promise<{
    handle: string;
  }>;
};

async function getProduct(handle: string) {
  const query = `
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        productType
        featuredImage {
          url
        }
          images(first: 10) {
  edges {
    node {
      url
    }
  }
}
        variants(first: 1) {
          edges {
            node {
              id
              availableForSale
              price {
                amount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_TOKEN || "",
      },
      body: JSON.stringify({
        query,
        variables: { handle },
      }),
      cache: "no-store",
    }
  );

  const data = await response.json();
  return data.data?.product;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

 if (!product) {
  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <BackButton />
      <h1 className="mt-10 text-4xl font-bold">Product not found</h1>
    </main>
  );
}

  const variant = product.variants.edges[0].node;
  const price = Number(variant.price.amount);

  return (
<main className="min-h-screen bg-slate-950 p-10 text-white">
  <BackButton />

<div className="mt-10 grid gap-10 md:grid-cols-2">
  <ImageGallery
    title={product.title}
    images={
      product.images?.edges?.map((image: any) => image.node.url) ||
      [product.featuredImage?.url]
    }
  />

  <div>
    <h1 className="text-5xl font-bold">{product.title}</h1>

    <p className="mt-4 text-2xl font-bold text-yellow-300">
      ${price.toFixed(2)}
    </p>

    <p className="mt-4 font-bold">
      {variant.availableForSale ? "In Stock" : "Out of Stock"}
    </p>

    <p className="mt-6 text-slate-300">
      Category: {product.productType || "Accessories"}
    </p>

    {product.description && (
      <p className="mt-6 max-w-xl text-slate-300">
        {product.description}
      </p>
    )}

   <a
  href="/shop"
  className="mt-8 inline-block rounded bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
>
  Add from Shop Page
</a>
  </div>
</div>
    </main>
  );
}