"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SkeletonProductCard = () => {
  return (
    <Card className="h-full">
      <CardContent className="p-2 sm:p-3 md:p-4 h-full flex flex-col">
        <div className="aspect-square mb-2 sm:mb-3 overflow-hidden rounded-lg bg-gray-200 animate-pulse" />
        <div className="flex-1 flex flex-col">
          <div className="h-4 sm:h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-1 sm:mb-2" />
          <div className="flex items-center gap-1 mb-1 sm:mb-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
            <div className="h-3 sm:h-4 w-10 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
            <div className="h-4 sm:h-5 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 sm:h-4 w-12 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-auto">
            <div className="flex-1 h-8 sm:h-9 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 sm:flex-none h-8 sm:h-9 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SkeletonCarousel = () => {
  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-200 animate-pulse rounded-lg" />
  );
};

export default function SkeletonHomePage() {
  return (
    <div className="bg-gray-50">
      {/* Skeleton Category Section */}
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 lg:py-8">
        <div className="h-6 sm:h-8 w-48 bg-gray-200 rounded animate-pulse mb-4 sm:mb-6" />
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-none w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Skeleton Hero Carousel */}
      <SkeletonCarousel />

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 lg:py-8">
        {/* Skeleton Today's Best Deals */}
        <section className="mb-8 md:mb-12">
          <div className="h-6 sm:h-8 w-48 bg-gray-200 rounded animate-pulse mb-4 sm:mb-6 px-1" />
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 horizontal-scroll">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-none w-48 sm:w-56 md:w-64">
                <SkeletonProductCard />
              </div>
            ))}
          </div>
        </section>

        {/* Skeleton Top Offers */}
        <section className="mb-8 md:mb-12">
          <div className="h-6 sm:h-8 w-48 bg-gray-200 rounded animate-pulse mb-4 sm:mb-6 px-1" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
            {[...Array(5)].map((_, i) => (
              <SkeletonProductCard key={i} />
            ))}
          </div>
        </section>

        {/* Skeleton Recommended For You */}
        <section className="mb-8 md:mb-12">
          <div className="h-6 sm:h-8 w-48 bg-gray-200 rounded animate-pulse mb-4 sm:mb-6 px-1" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4">
            {[...Array(12)].map((_, i) => (
              <SkeletonProductCard key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}