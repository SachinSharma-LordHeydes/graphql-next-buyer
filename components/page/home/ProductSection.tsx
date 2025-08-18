import ProductCard, { IProduct } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { memo, useMemo } from "react";

interface ProductSectionProps {
  name: string;
  products?: IProduct[];
  loading: boolean;
  count?: number;
  layout?: "grid" | "horizontal";
}

// Move skeleton arrays outside component to prevent recreation
const SKELETON_ARRAYS = {
  6: Array.from({ length: 6 }, (_, i) => i),
  8: Array.from({ length: 8 }, (_, i) => i),
} as const;

const ProductSectionComponent = ({
  name,
  products,
  loading,
  count = 6,
  layout = "grid",
}: ProductSectionProps) => {
  const skeletonArray = useMemo(
    () => SKELETON_ARRAYS[count as keyof typeof SKELETON_ARRAYS] || SKELETON_ARRAYS[6],
    [count]
  );

  const containerClass = useMemo(
    () =>
      layout === "horizontal"
        ? "flex gap-3 sm:gap-4 overflow-x-auto pb-4 horizontal-scroll"
        : "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 md:gap-6",
    [layout]
  );

  const itemClass = useMemo(
    () => (layout === "horizontal" ? "flex-none w-48 sm:w-56 md:w-64" : ""),
    [layout]
  );

  if (loading && !products) {
    return (
      <section className="mb-8 md:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 px-1">
          {name}
        </h2>
        <div className={containerClass}>
          {skeletonArray.map((i) => (
            <div key={i} className={itemClass}>
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 md:mb-12">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 px-1">
        {name}
      </h2>
      <div className={containerClass}>
        {products.map((product) => (
          <div key={product.id} className={itemClass}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

const ProductSection = memo(ProductSectionComponent);
ProductSection.displayName = "ProductSection";

export default ProductSection;
