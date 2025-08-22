"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Tag, Truck, Receipt, Package } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  images?: { url: string; altText: string }[];
  brand?: { name: string };
}

interface Variant {
  id: string;
  price: number;
  attributes?: Record<string, any>;
}

interface BuyNowOrderSummaryProps {
  product: Product;
  variant: Variant;
  quantity: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  formatPrice: (priceInCents: number) => string;
}

export function BuyNowOrderSummary({ 
  product,
  variant,
  quantity,
  subtotal,
  shipping,
  tax,
  total,
  formatPrice 
}: BuyNowOrderSummaryProps) {
  
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Product Item */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Item</span>
            <Badge variant="secondary" className="text-xs">
              Buy Now
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3 py-2 border rounded-lg p-3 bg-gray-50">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={product.images?.[0]?.url || "/placeholder.svg"}
                alt={product.images?.[0]?.altText || product.name}
                fill
                className="object-cover rounded-md"
              />
              <Badge 
                variant="secondary" 
                className="absolute -top-2 -right-2 w-6 h-6 p-0 flex items-center justify-center text-xs bg-blue-500 text-white"
              >
                {quantity}
              </Badge>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                {product.name}
              </h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {product.brand && (
                  <span className="text-xs text-gray-500">
                    {product.brand.name}
                  </span>
                )}
                {variant.attributes && Object.entries(variant.attributes).map(([key, value]) => {
                  if (key === 'comparePrice') return null;
                  return (
                    <span key={key} className="text-xs text-gray-500">
                      {value}
                    </span>
                  );
                })}
              </div>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-900">
                  {formatPrice(variant.price)} × {quantity}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Item Total</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-gray-600">
              <Truck className="w-4 h-4" />
              Delivery
            </span>
            <span className="font-medium text-green-600">
              {shipping === 0 ? "FREE" : formatPrice(shipping)}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-gray-600">
              <Receipt className="w-4 h-4" />
              Tax (GST)
            </span>
            <span className="font-medium">{formatPrice(tax)}</span>
          </div>

          {/* Savings if any */}
          {variant.attributes?.comparePrice && variant.attributes.comparePrice > variant.price && (
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-green-600">
                <Tag className="w-4 h-4" />
                You Save
              </span>
              <span className="font-medium text-green-600">
                -{formatPrice((variant.attributes.comparePrice - variant.price) * quantity)}
              </span>
            </div>
          )}

          <Separator />
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        {/* Express Checkout Benefits */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-900 font-medium">Express checkout - Skip the cart</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-900 font-medium">Faster processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-900 font-medium">Secure payment</span>
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-green-600" />
            <div>
              <h4 className="text-sm font-medium text-green-900">
                Express Delivery
              </h4>
              <p className="text-sm text-green-700">
                2-3 business days for Buy Now orders
              </p>
            </div>
          </div>
        </div>

        {/* Product Guarantee */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-sm space-y-2">
            <h4 className="font-medium text-gray-900">Purchase Protection</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-700">30-day return policy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-700">Genuine product guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-700">24/7 customer support</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
