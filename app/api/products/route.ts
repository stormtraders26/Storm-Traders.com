import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = `
      {
        products(first: 20) {
          edges {
            node {
              id
              title
              productType
              handle
              featuredImage {
                url
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
       body: JSON.stringify({ query }),
cache: "no-store",
      }
    );

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json(
        { error: data.errors },
        { status: 500 }
      );
    }

    if (!data.data?.products?.edges) {
      return NextResponse.json(
        { error: "No Shopify products found", shopifyResponse: data },
        { status: 500 }
      );
    }

    return NextResponse.json(data.data.products.edges);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to load Shopify products" },
      { status: 500 }
    );
  }
}