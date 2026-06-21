"use client";

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.assign(`/shop?reload=${Date.now()}`);
      }}
      className="inline-block text-yellow-300 hover:text-yellow-200"
    >
      ← Back to Shop
    </button>
  );
}