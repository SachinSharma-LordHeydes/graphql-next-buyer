"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
const ProductCard = ({ product }: { product: (typeof mockProducts)[0] }) => {
  const [cartCount, setCartCount] = useState(0);
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof mockProducts)[0] | null
  >(null);

  const addToCart = (productId: number) => {
    if (!addedToCart.includes(productId)) {
      setCartCount((prev) => prev + 1);
      setAddedToCart((prev) => [...prev, productId]);
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
        <CardContent className="p-2 sm:p-3 md:p-4 h-full flex flex-col">
          <div className="aspect-square mb-2 sm:mb-3 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <h3 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 leading-tight">
              {product.title}
            </h3>
            <div className="flex items-center gap-1 mb-1 sm:mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 sm:w-4 sm:h-4 fill-current ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-600">
                ({product.rating})
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
              <span className="font-bold text-sm sm:text-base md:text-lg">
                ${product.price}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-auto">
              <Button
                size="sm"
                className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product.id);
                }}
                disabled={addedToCart.includes(product.id)}
              >
                {addedToCart.includes(product.id) ? (
                  <>
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden xs:inline">Added</span>
                    <span className="xs:hidden">✓</span>
                  </>
                ) : (
                  <>
                    <span className="hidden xs:inline">Add to Cart</span>
                    <span className="xs:hidden">Add</span>
                  </>
                )}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none text-xs sm:text-sm h-8 sm:h-9"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedProduct(product);
                    }}
                  >
                    <span className="hidden sm:inline">Quick View</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="mx-3 sm:mx-4 max-w-xs sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-sm sm:text-lg">
                      {selectedProduct?.title}
                    </DialogTitle>
                  </DialogHeader>
                  {selectedProduct && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={selectedProduct.image || "/placeholder.svg"}
                          alt={selectedProduct.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 sm:w-5 sm:h-5 fill-current ${
                                  i < Math.floor(selectedProduct.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm sm:text-lg">
                            ({selectedProduct.rating})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="font-bold text-lg sm:text-2xl">
                            ${selectedProduct.price}
                          </span>
                          <span className="text-sm sm:text-lg text-gray-500 line-through">
                            ${selectedProduct.originalPrice}
                          </span>
                        </div>
                        <Button
                          className="w-full h-10 sm:h-12"
                          onClick={() => addToCart(selectedProduct.id)}
                          disabled={addedToCart.includes(selectedProduct.id)}
                        >
                          {addedToCart.includes(selectedProduct.id) ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Added to Cart
                            </>
                          ) : (
                            "Add to Cart"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
