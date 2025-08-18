import { Star } from "lucide-react";

interface ProductInfoProps {
  product: any;
  averageRating: number;
  inStock: boolean;
  defaultVariant: any;
}

export default function ProductInfo({
  product,
  averageRating,
  inStock,
  defaultVariant,
}: ProductInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 fill-current ${
                    i < Math.floor(averageRating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">({averageRating.toFixed(1)})</span>
          </div>
          <span className="text-gray-600">|</span>
          <span className="text-green-600 font-medium">{inStock ? "In Stock" : "Out of Stock"}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-gray-900">${defaultVariant?.price || "N/A"}</span>
      </div>

      <p className="text-gray-700 text-lg leading-relaxed">{product?.description}</p>

      <div>
        <h3 className="font-semibold text-lg mb-3">Key Features</h3>
        <ul className="space-y-2">
          <li className="text-gray-700">Product features will be displayed here</li>
        </ul>
      </div>
    </div>
  );
}
