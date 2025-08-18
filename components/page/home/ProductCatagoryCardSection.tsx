"use client";

import { categories } from "@/data/catagory";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

const ProductCatagoryCardSection = memo(() => {
  const router = useRouter();

  const goToCatagory = useCallback(
    (path: string) => {
      const categoryPage: string = path.toLowerCase();
      router.push(`/category/${categoryPage}`);
    },
    [router]
  );

  return (
    <section className="py-2 md:py-5 bg-gray-50 mt-5">
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex gap-3 overflow-x-auto py-2 px-1 horizontal-scroll">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="min-w-[150px] flex-shrink-0 group cursor-pointer"
                onClick={() => goToCatagory(category.name)}
              >
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-2 mx-auto group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-center group-hover:text-nepal-red transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 text-center">
                    {category.count}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

ProductCatagoryCardSection.displayName = "ProductCatagoryCardSection";

export default ProductCatagoryCardSection;
