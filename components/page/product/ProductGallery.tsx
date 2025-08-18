"use client";

import { useMemo, useState } from "react";

interface ProductGalleryProps {
  images: any[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const sortedImages = useMemo(() => 
    images.sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)), 
    [images]
  );

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-white rounded-lg overflow-hidden border">
        <img
          src={sortedImages[selectedImage]?.url || "/placeholder.svg"}
          alt={sortedImages[selectedImage]?.altText || productName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {sortedImages.map((image: any, index: number) => (
          <button
            key={image.id || index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
              selectedImage === index ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <img
              src={image.url || "/placeholder.svg"}
              alt={image.altText || `${productName} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
