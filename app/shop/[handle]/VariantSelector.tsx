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
  quantityAvailable?: number | null;
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

type VariantSelectorProps = {
  variants: Variant[];
};

export default function VariantSelector({
  variants,
}: VariantSelectorProps) {
  const firstAvailableVariant =
    variants.find((variant) => variant.availableForSale) || variants[0];

  const [selectedVariantId, setSelectedVariantId] = useState(
    firstAvailableVariant?.id || ""
  );

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
        onChange={(event) => setSelectedVariantId(event.target.value)}
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
          ? selectedVariant.quantityAvailable != null
            ? `${selectedVariant.quantityAvailable} In Stock`
            : "In Stock"
          : "Out of Stock"}
      </p>

      <button
        type="button"
        disabled={!selectedVariant.availableForSale}
        data-variant-id={selectedVariant.id}
        className="mt-8 w-full max-w-md rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        {selectedVariant.availableForSale
          ? `Add ${getVariantName(selectedVariant)} to Cart`
          : "Out of Stock"}
      </button>
    </div>
  );
}