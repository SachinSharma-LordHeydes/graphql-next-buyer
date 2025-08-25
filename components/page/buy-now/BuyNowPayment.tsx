
// BuyNowPayment.tsx
"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Truck } from "lucide-react";
import { PaymentMethodSelector } from "@/components/page/checkout/PaymentMethodSelector";
import { PaymentForm } from "@/components/page/checkout/PaymentForm";

export function BuyNowPayment({
  shippingAddress,
  selectedPaymentMethod,
  onSelectPayment,
  onSubmit,
  isProcessing,
  total,
  onChangeAddress,
}: any) {
  return (
    <div className="space-y-6">
      {/* Shipping Address Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Truck className="w-5 h-5" /> Delivery Address
            </span>
            <Button variant="outline" size="sm" onClick={onChangeAddress}>
              Change
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {shippingAddress && (
            <div className="text-sm space-y-1">
              <p className="font-medium">{shippingAddress.fullName}</p>
              <p>{shippingAddress.streetAddress}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state}{" "}
                {shippingAddress.zipCode}
              </p>
              <p>{shippingAddress.country}</p>
              <p className="text-gray-600">Phone: {shippingAddress.phone}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" /> Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentMethodSelector
            onSelect={onSelectPayment}
            selected={selectedPaymentMethod}
          />
        </CardContent>
      </Card>

      {selectedPaymentMethod && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentForm
              paymentMethod={selectedPaymentMethod}
              onSubmit={onSubmit}
              isProcessing={isProcessing}
              amount={total}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
