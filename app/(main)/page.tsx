"use client";

import { GET_PRODUCTS } from "@/client/product/product.queries";
import HeroCarousel from "@/components/page/home/HeroCarousel";
import ProductCard from "@/components/page/home/ProductCard";
import ProductCatagoryCardSection from "@/components/page/home/ProductCatagoryCardSection";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

// Mock product data
const mockProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    image: "/iphone-15-pro-max.png",
    rating: 4.5,
    price: 1199,
    originalPrice: 1299,
    category: "electronics",
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    image: "/samsung-galaxy-s24-ultra.png",
    rating: 4.4,
    price: 1099,
    originalPrice: 1199,
    category: "electronics",
  },
  {
    id: 3,
    title: "MacBook Pro M3",
    image: "/macbook-pro-m3.png",
    rating: 4.8,
    price: 1999,
    originalPrice: 2199,
    category: "electronics",
  },
  {
    id: 4,
    title: "Nike Air Max 270",
    image: "/nike-air-max-270.png",
    rating: 4.3,
    price: 150,
    originalPrice: 180,
    category: "fashion",
  },
  {
    id: 5,
    title: "Sony WH-1000XM5",
    image: "/sony-wh-1000xm5.png",
    rating: 4.6,
    price: 399,
    originalPrice: 449,
    category: "electronics",
  },
  {
    id: 6,
    title: "Adidas Ultraboost 22",
    image: "/adidas-ultraboost-22.png",
    rating: 4.4,
    price: 180,
    originalPrice: 220,
    category: "fashion",
  },
];

const carouselSlides = [
  {
    id: 1,
    title: "Festival Sale",
    subtitle: "Up to 70% Off",
    image: "/colorful-festival-sale-banner.png",
    color: "bg-gradient-to-r from-purple-600 to-pink-600",
  },
  {
    id: 2,
    title: "Electronics Deal",
    subtitle: "Latest Gadgets",
    image: "/placeholder-oclzi.png",
    color: "bg-gradient-to-r from-blue-600 to-cyan-600",
  },
  {
    id: 3,
    title: "Fashion Discount",
    subtitle: "Trendy Styles",
    image: "/stylish-fashion-sale-banner.png",
    color: "bg-gradient-to-r from-orange-600 to-red-600",
  },
];

export default function homePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // const {
  //   data: productsData,
  //   loading: productsLoading,
  //   error: productsError,
  // } = useQuery(GET_PRODUCTS);

  // console.log("productsdata-->",productsData)

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-50">
      <ProductCatagoryCardSection />
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 lg:py-8">
        {/* Today's Best Deals */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 px-1">
            Today's Best Deals
          </h2>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 horizontal-scroll">
            {mockProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="flex-none w-48 sm:w-56 md:w-64">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Top Offers */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 px-1">
            Top Offers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
            {mockProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Recommended For You */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 px-1">
            Recommended For You
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4">
            {[...mockProducts, ...mockProducts]
              .slice(0, 12)
              .map((product, index) => (
                <ProductCard
                  key={`${product.id}-${index}`}
                  product={{ ...product, id: product.id + index * 10 }}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
