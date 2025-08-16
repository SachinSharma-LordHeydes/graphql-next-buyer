"use client";

import { categories } from "@/data/catagory";
import { useRouter } from "next/navigation";

const ProductCatagoryCardSection = () => {
  const router = useRouter();

  const goToCatagory = (path: string) => {
    const categoryPage:string=path.toLowerCase()
    router.push(`/category/${categoryPage}`);
  };

  return (
    <section className="py-2 md:py-5 bg-gray-50 mt-5">
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Grid layout for tablet and larger */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => goToCatagory(category.name)}
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-center mb-1 group-hover:text-nepal-red transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 text-center">
                    {category.count}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Horizontally scrollable layout for mobile */}
        <div className="flex md:hidden gap-3 overflow-x-auto py-2 px-1 horizontal-scroll">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="min-w-[120px] flex-shrink-0 group cursor-pointer"
                onClick={() => goToCatagory(category.name)}
              >
                <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-2 mx-auto group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xs font-semibold text-center group-hover:text-nepal-red transition-colors">
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
};

export default ProductCatagoryCardSection;
