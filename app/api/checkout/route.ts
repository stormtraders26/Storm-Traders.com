import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
   const { items, note } = await request.json();
   console.log("ORDER NOTE:", note);

    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const lines = items.map((item: any) => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
    }));

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
          variables: {
  input: {
    lines,
    note,
  },
},
        }),
      }
    );

    const data = await response.json();

    const errors = data.data?.cartCreate?.userErrors;

    if (errors?.length) {
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    const checkoutUrl = data.data?.cartCreate?.cart?.checkoutUrl;

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "No checkout URL returned", shopifyResponse: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Checkout failed" },
      { status: 500 }
    );
  }
}