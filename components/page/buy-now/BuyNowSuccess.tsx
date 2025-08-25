// BuyNowSuccess.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export function BuyNowSuccess() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. You will receive a confirmation email
          shortly.
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>Order ID: #ORD-{Date.now()}</p>
          <p>Estimated delivery: 3-5 business days</p>
        </div>
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Button>Track Order</Button>
        </div>
      </CardContent>
    </Card>
  );
}
