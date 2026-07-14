import BackButton from "./BackButton";
import ImageGallery from "./ImageGallery";
import VariantSelector from "./VariantSelector";

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
          altText
        }

        images(first: 20) {
          edges {
            node {
              url
              altText
            }
          }
        }

        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale

              selectedOptions {
                name
                value
              }

              price {
                amount
                currencyCode
              }

              image {
                url
                altText
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

  if (!response.ok) {
    throw new Error(
      `Shopify request failed with status ${response.status}`
    );
  }

  const result = await response.json();

  if (result.errors) {
    console.error("Shopify GraphQL errors:", result.errors);
    throw new Error(result.errors[0]?.message || "Shopify API error");
  }

  return result.data?.product;
}

export default async function ProductDetailPage({
  params,
}: PageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <BackButton />

        <h1 className="mt-10 text-4xl font-bold">
          Product not found
        </h1>
      </main>
    );
  }

  const variants = product.variants.edges.map(
    (edge: any) => edge.node
  );

  const galleryImages =
    product.images?.edges
      ?.map((edge: any) => edge.node.url)
      .filter(Boolean) || [];

  if (
    galleryImages.length === 0 &&
    product.featuredImage?.url
  ) {
    galleryImages.push(product.featuredImage.url);
  }

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <BackButton />

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <ImageGallery
          title={product.title}
          images={galleryImages}
        />

        <div>
          <h1 className="text-5xl font-bold">
            {product.title}
          </h1>

          <p className="mt-6 text-slate-300">
            Category: {product.productType || "Accessories"}
          </p>

          {product.description && (
            <p className="mt-6 max-w-xl text-slate-300">
              {product.description}
            </p>
          )}

          <VariantSelector variants={variants} />
        </div>
      </div>
    </main>
  );
}