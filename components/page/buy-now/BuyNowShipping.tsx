// BuyNowShipping.tsx
"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Truck } from "lucide-react";
import { AddAddressForm } from "@/components/address";

export function BuyNowShipping({ onSubmit }: { onSubmit: (addr: any) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-5 h-5" /> Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AddAddressForm onSave={onSubmit} context="buy-now" />
      </CardContent>
    </Card>
  );
}
