"use client";

import { useState } from "react";

type ImageGalleryProps = {
  title: string;
  images: string[];
};

export default function ImageGallery({ title, images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="relative z-20 rounded-xl bg-white p-6">
<img
  src={selectedImage}
  alt={title}
  className="mb-6 h-[520px] w-full rounded-lg object-contain"
/>

      <div className="flex gap-3">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`rounded-lg border p-2 ${
              selectedImage === image ? "border-blue-600" : "border-slate-300"
            }`}
          >
            <img
              src={image}
              alt={title}
              className="h-20 w-20 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}