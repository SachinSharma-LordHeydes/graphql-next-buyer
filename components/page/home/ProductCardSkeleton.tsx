import { Card, CardContent } from "@/components/ui/card";

// Add this in your ProductCard file
export const ProductCardSkeleton = () => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
      <CardContent className="p-2 sm:p-3 md:p-4 h-full flex flex-col">
        {/* Image skeleton */}
        <div className="aspect-square mb-2 sm:mb-3 overflow-hidden rounded-lg bg-gray-200 animate-pulse" />
        
        <div className="flex-1 flex flex-col">
          {/* Title skeleton */}
          <div className="h-4 bg-gray-200 rounded mb-2 sm:mb-3 animate-pulse" />
          
          {/* Rating skeleton */}
          <div className="flex items-center gap-1 mb-1 sm:mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded-full mr-1" />
              ))}
            </div>
            <div className="h-3 w-8 bg-gray-200 rounded animate-pulse" />
          </div>
          
          {/* Price skeleton */}
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
            <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
          </div>
          
          {/* Button skeletons */}
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-auto">
            <div className="h-8 bg-gray-200 rounded animate-pulse flex-1" />
            <div className="h-8 bg-gray-200 rounded animate-pulse flex-1 sm:flex-none" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};