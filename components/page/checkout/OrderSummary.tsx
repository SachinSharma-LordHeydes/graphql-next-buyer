"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Tag, Truck, Receipt } from "lucide-react";
import Image from "next/image";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  variant: {
    id: string;
    price: number;
    attributes?: Record<string, any>;
    product: {
      name: string;
      images: { url: string; altText: string }[];
    };
  };
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  formatPrice: (priceInCents: number) => string;
}

export function OrderSummary({ 
  items, 
  subtotal, 
  shipping, 
  tax, 
  total, 
  formatPrice 
}: OrderSummaryProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Items List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Items ({totalItems})</span>
            <Badge variant="secondary" className="text-xs">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </Badge>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 py-2">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={item.variant.product.images[0]?.url || "/placeholder.svg"}
                    alt={item.variant.product.images[0]?.altText || item.variant.product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                  >
                    {item.quantity}
                  </Badge>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {item.variant.product.name}
                  </h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.variant.attributes && Object.entries(item.variant.attributes).map(([key, value]) => {
                      if (key === 'comparePrice') return null;
                      return (
                        <span key={key} className="text-xs text-gray-500">
                          {value}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                <div className="text-sm font-medium text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-gray-600">
              <Truck className="w-4 h-4" />
              Shipping
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
          {items.some(item => item.variant.attributes?.comparePrice) && (
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-green-600">
                <Tag className="w-4 h-4" />
                You Save
              </span>
              <span className="font-medium text-green-600">
                -{formatPrice(
                  items.reduce((savings, item) => {
                    const comparePrice = item.variant.attributes?.comparePrice || item.price;
                    return savings + ((comparePrice - item.price) * item.quantity);
                  }, 0)
                )}
              </span>
            </div>
          )}

          <Separator />
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-blue-900 font-medium">Free shipping on all orders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-blue-900 font-medium">30-day return policy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-blue-900 font-medium">Secure checkout</span>
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-green-600" />
            <div>
              <h4 className="text-sm font-medium text-green-900">
                Estimated Delivery
              </h4>
              <p className="text-sm text-green-700">
                3-5 business days
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
