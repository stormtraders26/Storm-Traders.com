"use client";

import { useEffect, useState } from "react";

type Product = {
  name: string;
  category: string;
  price: number;
  image: string;
  handle: string;
  variantId: string;
  availableForSale: boolean;
};

type CartItem = Product & {
  quantity: number;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderNote, setOrderNote] = useState("");
  const [filter, setFilter] = useState<"all" | "instock" | "outofstock">("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [discountCode, setDiscountCode] = useState("");

useEffect(() => {
  async function loadProducts() {
    setProducts([]);
    setFilter("all");
    setSearch("");
    setCategory("all");

    const response = await fetch(`/api/products?time=${Date.now()}`, {
      cache: "no-store",
    });

    const data = await response.json();

    const shopifyProducts = data.map((item: any) => {
      const product = item.node;
      const variant = product.variants.edges[0].node;

      return {
        name: product.title,
        handle: product.handle,
        price: Math.round(Number(variant.price.amount) * 100),
        image: product.featuredImage?.url || "",
        variantId: variant.id,
        availableForSale: variant.availableForSale ?? false,
        category: product.productType || "Accessories",
      };
    });

    setProducts(shopifyProducts);
  }

  loadProducts();

  window.addEventListener("pageshow", loadProducts);
  window.addEventListener("focus", loadProducts);

  return () => {
    window.removeEventListener("pageshow", loadProducts);
    window.removeEventListener("focus", loadProducts);
  };
}, []);

  const categories = [
    "all",
    ...Array.from(
      new Set(products.map((product) => product.category).filter(Boolean))
    ),
  ];

  function addToCart(product: Product) {
    if (!product.availableForSale) return;

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.variantId === product.variantId
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.variantId === product.variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function decreaseQuantity(variantId: string) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.variantId === variantId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(variantId: string) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.variantId !== variantId)
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function checkout() {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  items: cart,
  note: orderNote,
}),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(JSON.stringify(data));
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesStock =
      filter === "instock"
        ? product.availableForSale
        : filter === "outofstock"
        ? !product.availableForSale
        : true;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesStock && matchesSearch && matchesCategory;
  });

  return (
    <main className="relative min-h-screen bg-slate-950 p-10 text-white">
      <div className="relative z-20 mb-6">
        <a
          href="/"
          className="rounded-lg bg-yellow-400 px-4 py-2 font-bold text-slate-950 hover:bg-yellow-300"
        >
          ← Home
        </a>
      </div>

      <img
        src="/images/storm-traders-logo.png"
        alt=""
        className="pointer-events-none absolute left-1/2 top-1/2 w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-5"
      />

      <div className="relative z-10">
        <h1 className="mb-10 text-4xl font-bold">Storm Traders Shop</h1>

        <div className="mb-6 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search accessories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white placeholder:text-slate-400"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setFilter("all")}
            className="rounded-lg bg-slate-700 px-4 py-2"
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setFilter("instock")}
            className="rounded-lg bg-green-600 px-4 py-2"
          >
            In Stock
          </button>

          <button
            type="button"
            onClick={() => setFilter("outofstock")}
            className="rounded-lg bg-red-600 px-4 py-2"
          >
            Out of Stock
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="grid gap-6 md:grid-cols-2 lg:col-span-3">
            {filteredProducts.map((product) => (
              <div
                key={product.variantId}
                className="flex min-h-[520px] flex-col rounded-xl bg-white p-6 text-slate-900 shadow"
              >
                {product.image && (
                 <a href={`/shop/${product.handle}`}>
                    <div className="mb-4 flex h-64 items-center justify-center rounded-lg bg-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </a>
                )}

<a href={`/shop/${product.handle}`} className="block">
                  <h2 className="text-2xl font-bold hover:text-blue-600">
                    {product.name}
                  </h2>
                </a>

                <p className="mt-3 text-xl font-bold">
                  ${(product.price / 100).toFixed(2)}
                </p>

                <p className="mt-2 text-sm font-bold">
                  {product.availableForSale ? "In Stock" : "Out of Stock"}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {product.category}
                </p>

                <button
                  type="button"
                  disabled={!product.availableForSale}
                  onClick={() => addToCart(product)}
                  className="mt-auto rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {product.availableForSale ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            ))}
          </div>

<div className="order-first h-fit rounded-xl bg-white p-6 text-slate-900 shadow lg:order-last lg:sticky lg:top-24">
            <h2 className="mb-4 text-2xl font-bold">Cart</h2>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.variantId} className="mb-4 border-b pb-4">
                    <p className="font-bold">{item.name}</p>

                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.variantId)}
                        className="rounded bg-slate-300 px-3 py-1 font-bold"
                      >
                        -
                      </button>

                      <span className="font-bold">{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="rounded bg-slate-300 px-3 py-1 font-bold"
                      >
                        +
                      </button>

                      <span>${(item.price / 100).toFixed(2)} each</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.variantId)}
                      className="mt-2 rounded bg-red-600 px-3 py-1 text-sm font-bold text-white hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <p className="mt-4 text-xl font-bold">
  Total: ${(total / 100).toFixed(2)}
</p>

<div className="mt-4">
  <label className="mb-2 block text-sm font-bold">
    Order Notes
  </label>

  <textarea
    value={orderNote}
    onChange={(e) => setOrderNote(e.target.value)}
    placeholder="Leave a note for Storm Traders..."
    className="w-full rounded border p-2 text-sm"
    rows={4}
  />
</div>

<div className="mt-4">
  <label className="mb-2 block text-sm font-bold">
    Discount Code
  </label>

  <input
    type="text"
    value={discountCode}
    onChange={(e) => setDiscountCode(e.target.value)}
    placeholder="Enter discount code"
    className="w-full rounded border p-2 text-sm uppercase"
  />
</div>

<button
  type="button"
  onClick={checkout}
  className="mt-4 w-full rounded bg-green-600 px-4 py-3 text-white hover:bg-green-700"
>
  Checkout
</button>
                
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}