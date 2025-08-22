"use client";

import { REMOVE_FROM_CART } from "@/client/cart/cart.mutations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@apollo/client";
import { ArrowLeft, Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Mock cart data based on Prisma schema
const mockCartItems = [
  {
    id: "cart1",
    userId: "user1",
    quantity: 2,
    createdAt: new Date(),
    variant: {
      id: "variant1",
      sku: "IPH15PM-256-BLUE",
      price: 119900, // in cents
      stock: 15,
      attributes: {
        color: "Deep Purple",
        storage: "256GB",
        comparePrice: 129900,
        weight: "221g",
      },
      product: {
        id: "prod1",
        name: "iPhone 15 Pro Max",
        slug: "iphone-15-pro-max",
        description:
          "The ultimate iPhone with titanium design and Action Button.",
        status: "ACTIVE",
        salePrice: 119900,
        saleStart: new Date("2024-01-01"),
        saleEnd: new Date("2024-12-31"),
        returnPolicy: "30-day return policy",
        warranty: "1 Year Apple Warranty",
        images: [
          {
            id: "img1",
            url: "/api/placeholder/300/300",
            altText: "iPhone 15 Pro Max Deep Purple",
            sortOrder: 0,
            type: "PRIMARY",
          },
        ],
        category: {
          id: "cat1",
          name: "Smartphones",
          slug: "smartphones",
        },
        brand: {
          id: "brand1",
          name: "Apple",
          slug: "apple",
        },
      },
    },
  },
  {
    id: "cart2",
    userId: "user1",
    quantity: 1,
    createdAt: new Date(),
    variant: {
      id: "variant2",
      sku: "NIKE-AM270-10-WHITE",
      price: 15000,
      stock: 8,
      attributes: {
        color: "White/Black",
        size: "10",
        comparePrice: 18000,
        material: "Synthetic Leather",
      },
      product: {
        id: "prod2",
        name: "Nike Air Max 270",
        slug: "nike-air-max-270",
        description:
          "Nike's biggest heel Air Max unit yet delivers unparalleled comfort.",
        status: "ACTIVE",
        salePrice: 15000,
        returnPolicy: "45-day return policy",
        warranty: "6 Months Warranty",
        images: [
          {
            id: "img2",
            url: "/api/placeholder/300/300",
            altText: "Nike Air Max 270 White",
            sortOrder: 0,
            type: "PRIMARY",
          },
        ],
        category: {
          id: "cat2",
          name: "Footwear",
          slug: "footwear",
        },
        brand: {
          id: "brand2",
          name: "Nike",
          slug: "nike",
        },
      },
    },
  },
  {
    id: "cart3",
    userId: "user1",
    quantity: 1,
    createdAt: new Date(),
    variant: {
      id: "variant3",
      sku: "SONY-WH1000XM5-BLACK",
      price: 39900,
      stock: 12,
      attributes: {
        color: "Midnight Black",
        connectivity: "Wireless + Wired",
        comparePrice: 44900,
        batteryLife: "30 hours",
      },
      product: {
        id: "prod3",
        name: "Sony WH-1000XM5 Wireless Headphones",
        slug: "sony-wh-1000xm5",
        description:
          "Industry-leading noise canceling headphones with exceptional sound quality.",
        status: "ACTIVE",
        salePrice: 39900,
        returnPolicy: "30-day return policy",
        warranty: "1 Year International Warranty",
        images: [
          {
            id: "img3",
            url: "/api/placeholder/300/300",
            altText: "Sony WH-1000XM5 Black",
            sortOrder: 0,
            type: "PRIMARY",
          },
        ],
        category: {
          id: "cat3",
          name: "Audio",
          slug: "audio",
        },
        brand: {
          id: "brand3",
          name: "Sony",
          slug: "sony",
        },
      },
    },
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [isLoading, setIsLoading] = useState(false);

  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`;
  };

  const calculateDiscount = (salePrice: number, comparePrice?: number) => {
    if (!comparePrice) return 0;
    return Math.round(((comparePrice - salePrice) / comparePrice) * 100);
  };

  const updateQuantity = (cartId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.id === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = async (cartId: string) => {
    try {
      await removeFromCartMutation({
        variables: { cartId },
      });

      setCartItems((items) => items.filter((item) => item.id !== cartId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const originalTotal = cartItems.reduce((sum, item) => {
    const comparePrice =
      item.variant.attributes?.comparePrice || item.variant.price;
    return sum + comparePrice * item.quantity;
  }, 0);

  const totalSavings = originalTotal - subtotal;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 lg:py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">Shopping Cart</h1>
        <Badge variant="secondary" className="ml-auto">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const { variant } = item;
            const { product } = variant;
            const discount = calculateDiscount(
              variant.price,
              variant.attributes?.comparePrice
            );

            return (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-full sm:w-32 lg:w-40">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.images[0]?.url || "/placeholder.svg"}
                          alt={product.images[0]?.altText || product.name}
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div className="flex-1">
                          <Link href={`/product/${product.slug}`}>
                            <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>

                          <div className="space-y-2 text-sm text-gray-600">
                            {product.brand && (
                              <p>
                                <span className="font-medium">Brand:</span>{" "}
                                {product.brand.name}
                              </p>
                            )}
                            {variant.sku && (
                              <p>
                                <span className="font-medium">SKU:</span>{" "}
                                {variant.sku}
                              </p>
                            )}
                            {variant.attributes &&
                              Object.entries(variant.attributes).map(
                                ([key, value]) =>
                                  key !== "comparePrice" && (
                                    <p key={key}>
                                      <span className="font-medium capitalize">
                                        {key}:
                                      </span>{" "}
                                      {value}
                                    </p>
                                  )
                              )}
                            <p
                              className={`font-medium ${
                                variant.stock > 10
                                  ? "text-green-600"
                                  : variant.stock > 0
                                  ? "text-orange-600"
                                  : "text-red-600"
                              }`}
                            >
                              {variant.stock > 0
                                ? variant.stock > 10
                                  ? "In Stock"
                                  : `Only ${variant.stock} left`
                                : "Out of Stock"}
                            </p>
                          </div>

                          {/* Mobile Price & Actions */}
                          <div className="sm:hidden mt-4 space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold">
                                {formatPrice(variant.price)}
                              </span>
                              {variant.attributes?.comparePrice && (
                                <>
                                  <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(
                                      variant.attributes.comparePrice
                                    )}
                                  </span>
                                  {discount > 0 && (
                                    <Badge
                                      variant="destructive"
                                      className="text-xs"
                                    >
                                      {discount}% OFF
                                    </Badge>
                                  )}
                                </>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="px-3 py-1 text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  disabled={item.quantity >= variant.stock}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Desktop Price & Actions */}
                        <div className="hidden sm:flex flex-col items-end gap-4">
                          <div className="text-right">
                            <div className="text-xl font-bold">
                              {formatPrice(variant.price)}
                            </div>
                            {variant.attributes?.comparePrice && (
                              <div className="flex items-center gap-2 justify-end">
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(variant.attributes.comparePrice)}
                                </span>
                                {discount > 0 && (
                                  <Badge
                                    variant="destructive"
                                    className="text-xs"
                                  >
                                    {discount}% OFF
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="px-3 py-1 text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                disabled={item.quantity >= variant.stock}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      Total Savings
                    </span>
                    <span>-{formatPrice(totalSavings)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>

                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full mt-6" size="lg" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </Link>

              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Free shipping on all orders</p>
                <p>30-day return policy</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
