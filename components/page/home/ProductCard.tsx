"use client";

import { useCart } from "@/app/(main)/page";
import { ADD_TO_CART, REMOVE_FROM_CART } from "@/client/cart/cart.mutations";
import { GET_CART_PRODUCT_IDS } from "@/client/cart/cart.queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@apollo/client";
import { Check, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";

// Types remain the same
type ProductImage = { url: string; altText?: string | null };
type ProductVariant = { id: string; price: string };
type ProductReview = { rating?: number | null };

export interface IProduct {
  id: string;
  name: string;
  slug?: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  reviews?: ProductReview[];
}

type CartStatus =
  | "idle"
  | "adding"
  | "removing"
  | "added"
  | "removed"
  | "error";

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const cartCtx = useCart?.() as
    | { cartItems?: Set<string>; loading?: boolean }
    | undefined;
  const cartItems = cartCtx?.cartItems ?? new Set<string>();
  const cartLoading = !!cartCtx?.loading;

  const [status, setStatus] = useState<CartStatus>("idle");
  const [isHovered, setIsHovered] = useState(false);

  // Optimistic updates - immediately update UI before server responds
  const [optimisticCartItems, setOptimisticCartItems] = useState<Set<string>>(
    new Set()
  );

  // Update optimistic state when real cart data changes
  useEffect(() => {
    setOptimisticCartItems(cartItems);
  }, [cartItems]);

  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART_PRODUCT_IDS }],
    onCompleted: () => {
      setStatus("added");
      setTimeout(() => setStatus("idle"), 2000);
    },
    onError: (error) => {
      console.error("Add to cart error:", error);
      setStatus("error");
      // Revert optimistic update
      setOptimisticCartItems(cartItems);
      setTimeout(() => setStatus("idle"), 2000);
    },
  });

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [{ query: GET_CART_PRODUCT_IDS }],
    onCompleted: () => {
      setStatus("removed");
      setTimeout(() => setStatus("idle"), 2000);
    },
    onError: (error) => {
      console.error("Remove from cart error:", error);
      setStatus("error");
      // Revert optimistic update
      setOptimisticCartItems(cartItems);
      setTimeout(() => setStatus("idle"), 2000);
    },
  });

  // Memoize computed values
  const productData = useMemo(() => {
    const imageUrl = product.images?.[0]?.url ?? "/placeholder.svg";
    const imageAlt =
      product.images?.[0]?.altText ?? product.name ?? "Product image";
    const variantId = product.variants?.[0]?.id;
    const price = parseFloat(product.variants?.[0]?.price ?? "0");

    const avgRating =
      product.reviews && product.reviews.length
        ? product.reviews.reduce((s, r) => s + (r.rating ?? 0), 0) /
          product.reviews.length
        : 0;

    return { imageUrl, imageAlt, variantId, price, avgRating };
  }, [product]);

  // console.log("product data-->", productData);

  const isInCart = optimisticCartItems.has(product.id);
  const isLoading = status === "adding" || status === "removing" || cartLoading;
  const isDisabled = !productData.variantId || isLoading;

  const handleAdd = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isDisabled) return;

      // Optimistic update - immediately show as added
      setOptimisticCartItems((prev) => new Set([...prev, product.id]));
      setStatus("adding");

      try {
        await addToCart({
          variables: {
            variantId: productData.variantId,
            quantity: 1,
          },
        });
      } catch (err) {
        // Error handling is done in onError callback
      }
    },
    [isDisabled, addToCart, productData.variantId, product.id]
  );

  const handleRemove = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isDisabled) return;

      // Optimistic update - immediately show as removed
      const newSet = new Set(optimisticCartItems);
      newSet.delete(product.id);
      setOptimisticCartItems(newSet);
      setStatus("removing");

      try {
        await removeFromCart({
          variables: { variantId: productData.variantId },
        });
      } catch (err) {
        // Error handling is done in onError callback
      }
    },
    [
      isDisabled,
      removeFromCart,
      productData.variantId,
      product.id,
      optimisticCartItems,
    ]
  );

  // Button content based on status
  const getButtonContent = () => {
    switch (status) {
      case "adding":
        return {
          text: "Adding...",
          icon: <ShoppingCart className="w-4 h-4 animate-spin" />,
        };
      case "removing":
        return {
          text: "Removing...",
          icon: <X className="w-4 h-4 animate-spin" />,
        };
      case "added":
        return { text: "Added!", icon: <Check className="w-4 h-4" /> };
      case "removed":
        return { text: "Removed!", icon: <Check className="w-4 h-4" /> };
      case "error":
        return { text: "Try again", icon: <X className="w-4 h-4" /> };
      default:
        if (isInCart) {
          return {
            text: isHovered ? "Remove" : "In Cart",
            icon: <Check className="w-4 h-4" />,
          };
        }
        return {
          text: "Add to Cart",
          icon: <ShoppingCart className="w-4 h-4" />,
        };
    }
  };

  const buttonContent = getButtonContent();

  return (
    <Link href={`/product/${product.slug}`} className="block h-full group">
      <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-sm">
        <CardContent className="p-3 flex flex-col h-full">
          {/* Image container with overlay effects */}
          <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gray-50 relative group">
            <Image
              src={productData.imageUrl}
              alt={productData.imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={false}
            />

            {/* Quick action overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            {/* Status indicator */}
            {(status === "added" || status === "removed") && (
              <div className="absolute top-2 right-2 bg-gray-500 text-white rounded-full p-1 animate-pulse">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text--600 text-black transition-colors">
                {product.name}
              </h3>

              {productData.avgRating > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.round(productData.avgRating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span>({productData.avgRating.toFixed(1)})</span>
                </div>
              )}

              <div className="font-bold text-lg text-gray-600">
                ${productData.price.toFixed(2)}
              </div>
            </div>

            {/* Enhanced cart button */}
            <div className="mt-3">
              <Button
                size="sm"
                variant={isInCart ? "outline" : "default"}
                onClick={isInCart ? handleRemove : handleAdd}
                disabled={isDisabled}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`w-full transition-all duration-200 transform active:scale-95 ${
                  isInCart
                    ? "border-gray-500 text-gray-600 hover:bg-red-50 hover:border-red-500 hover:text-red-600"
                    : "bg-white hover:bg-gray-200 text-black "
                } ${status === "added" ? "bg-gray-500 hover:bg-gray-600" : ""}
                ${status === "removed" ? "bg-gray-500 hover:bg-gray-600" : ""}
                ${status === "error" ? "bg-red-500 hover:bg-red-600" : ""}`}
              >
                <span className="flex items-center justify-center gap-2 min-w-[100px]">
                  {buttonContent.icon}
                  <span className="transition-all duration-200">
                    {buttonContent.text}
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
