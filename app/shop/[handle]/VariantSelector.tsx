"use client";

import { useMemo, useState } from "react";

type SelectedOption = {
  name: string;
  value: string;
};

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: {
    amount: string;
    currencyCode: string;
  };
  image?: {
    url: string;
    altText?: string | null;
  } | null;
};

type CartItem = {
  name: string;
  category: string;
  price: number;
  image: string;
  handle: string;
  variantId: string;
  availableForSale: boolean;
  quantity: number;
};

type VariantSelectorProps = {
  variants: Variant[];
  productName: string;
  productHandle: string;
  productCategory: string;
  fallbackImage?: string;
};

export default function VariantSelector({
  variants,
  productName,
  productHandle,
  productCategory,
  fallbackImage = "",
}: VariantSelectorProps) {
  const firstAvailableVariant =
    variants.find((variant) => variant.availableForSale) || variants[0];

  const [selectedVariantId, setSelectedVariantId] = useState(
    firstAvailableVariant?.id || ""
  );

  const [message, setMessage] = useState("");

  const selectedVariant = useMemo(
    () =>
      variants.find((variant) => variant.id === selectedVariantId) ||
      firstAvailableVariant,
    [variants, selectedVariantId, firstAvailableVariant]
  );

  if (!selectedVariant) {
    return (
      <p className="mt-4 font-bold text-red-400">
        No variants are available.
      </p>
    );
  }

  const optionLabel =
    selectedVariant.selectedOptions?.[0]?.name || "Style";

  const price = Number(selectedVariant.price.amount);

  function getVariantName(variant: Variant) {
    if (variant.selectedOptions?.length) {
      return variant.selectedOptions
        .map((option) => option.value)
        .join(" / ");
    }

    return variant.title;
  }

  function addSelectedVariantToCart() {
    if (!selectedVariant.availableForSale) return;

    try {
      const variantName = getVariantName(selectedVariant);

      const newItem: CartItem = {
        name: `${productName} - ${variantName}`,
        category: productCategory,
        price: Math.round(Number(selectedVariant.price.amount) * 100),
        image: selectedVariant.image?.url || fallbackImage,
        handle: productHandle,
        variantId: selectedVariant.id,
        availableForSale: selectedVariant.availableForSale,
        quantity: 1,
      };

      const savedCart = localStorage.getItem("storm-traders-cart");

      const currentCart: CartItem[] = savedCart
        ? JSON.parse(savedCart)
        : [];

      const existingItem = currentCart.find(
        (item) => item.variantId === selectedVariant.id
      );

      const updatedCart = existingItem
        ? currentCart.map((item) =>
            item.variantId === selectedVariant.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...currentCart, newItem];

      localStorage.setItem(
        "storm-traders-cart",
        JSON.stringify(updatedCart)
      );

   window.location.href = "/shop";
    } catch (error) {
      console.error("Unable to add item to cart:", error);
      setMessage("Unable to add item. Please try again.");
    }
  }

  return (
    <div className="mt-6">
      <label
        htmlFor="variant"
        className="mb-2 block text-lg font-bold text-white"
      >
        Choose {optionLabel}
      </label>

      <select
        id="variant"
        value={selectedVariant.id}
        onChange={(event) => {
          setSelectedVariantId(event.target.value);
          setMessage("");
        }}
        className="w-full max-w-md rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
      >
        {variants.map((variant) => (
          <option
            key={variant.id}
            value={variant.id}
            disabled={!variant.availableForSale}
          >
            {getVariantName(variant)}
            {!variant.availableForSale ? " — Out of Stock" : ""}
          </option>
        ))}
      </select>

      {selectedVariant.image?.url && (
        <img
          src={selectedVariant.image.url}
          alt={
            selectedVariant.image.altText ||
            getVariantName(selectedVariant)
          }
          className="mt-6 h-52 w-52 rounded-lg object-contain"
        />
      )}

      <p className="mt-5 text-2xl font-bold text-yellow-300">
        ${price.toFixed(2)}
      </p>

      <p
        className={`mt-3 font-bold ${
          selectedVariant.availableForSale
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {selectedVariant.availableForSale
          ? "In Stock"
          : "Out of Stock"}
      </p>

      <button
        type="button"
        disabled={!selectedVariant.availableForSale}
        onClick={addSelectedVariantToCart}
        className="mt-8 w-full max-w-md rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        {selectedVariant.availableForSale
          ? `Add ${getVariantName(selectedVariant)} to Cart`
          : "Out of Stock"}
      </button>

      {message && (
        <div className="mt-4 max-w-md rounded-lg bg-green-600 px-4 py-3 font-bold text-white">
          {message}

          <a
            href="/shop"
            className="ml-2 underline hover:text-yellow-200"
          >
            View Cart
          </a>
        </div>
      )}
    </div>
  );
}