import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ProductPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Skeleton */}
        <div className="bg-white border-b">
          <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Product Data Skeleton */}
            <div className="space-y-6">
              {/* Product Title */}
              <Skeleton className="h-9 w-3/4 mb-2" />
              
              {/* Rating and Stock */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="w-5 h-5 rounded-full" />
                  ))}
                </div>
                <span className="text-gray-600"></span>
                <Skeleton className="h-5 w-24" />
              </div>

              {/* Price */}
              <Skeleton className="h-8 w-32" />

              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Key Features */}
              <div>
                <Skeleton className="h-6 w-32 mb-3" />
                <ul className="space-y-2">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Skeleton className="w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                      <Skeleton className="h-4 w-64" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-24" />
                <div className="flex items-center border rounded-lg">
                  <Skeleton className="w-10 h-10" />
                  <Skeleton className="w-14 h-10 border-x" />
                  <Skeleton className="w-10 h-10" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Skeleton className="flex-1 h-12 rounded-lg" />
                <Skeleton className="w-12 h-12 rounded-lg" />
                <Skeleton className="w-12 h-12 rounded-lg" />
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="h-4 w-56" />
                  </div>
                ))}
              </div>

              {/* Seller Info */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs Skeleton */}
          <div className="mb-12">
            <div className="grid grid-cols-3 gap-2 mb-6">
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
            </div>
            
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>

          {/* Related Products Skeleton */}
          <div>
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="aspect-square mb-3 rounded-lg" />
                  <Skeleton className="h-5 w-4/5 mb-2" />
                  <div className="flex mb-2">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Skeleton key={star} className="w-4 h-4 mr-1 rounded-full" />
                    ))}
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProductPageSkeleton
