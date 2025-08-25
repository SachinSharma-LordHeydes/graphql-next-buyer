"use client";

import { GET_ADDRESS_OF_USER } from "@/client/address/address.queries";
import { GET_PRODUCT_BY_SLUG } from "@/client/product/product.queries";
import { AddressStep } from "@/components/page/buy-now/AddressStep";
import { BuyNowHeader } from "@/components/page/buy-now/BuyNowHeader";
import { PaymentStep } from "@/components/page/buy-now/PaymentStep";

import { BuyNowSkeleton } from "@/components/page/buy-now/BuyNowSkeleton";
import { BuyNowSteps } from "@/components/page/buy-now/BuyNowSteps";
import { OrderSummary } from "@/components/page/checkout/OrderSummary";
import { Button } from "@/components/ui/button";
import { useBuyNow } from "@/hooks/buy-now/useBuyNow";
import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BuyNowPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");
  const quantity = parseInt(searchParams.get("quantity") || "1");

  const {
    step,
    selectedAddress,
    setSelectedAddress,

    showAddressForm,
    selectedPaymentMethod,
    isProcessingPayment,
    handleAddressSaved,
    handleAddressCancel,
    handleUseDefaultAddress,
    handleSelectAddress,
    handlePaymentMethodSelect,
    handlePaymentSubmit,
    handleBackToAddress,
    handleBackToPayment,
  } = useBuyNow();

  // Query product
  const { data: productData, loading: productLoading } = useQuery(
    GET_PRODUCT_BY_SLUG,
    {
      variables: { slug: productSlug },
      skip: !productSlug,
    }
  );

  // Query user addresses
  const { data: addressData, loading: addressLoading } = useQuery(
    GET_ADDRESS_OF_USER,
    {
      skip: false,
    }
  );

  const product = productData?.getProductBySlug;
  const addresses = addressData?.getAddressOfUser || [];

  // Calculate order amount
  const calculateOrderAmount = () => {
    if (!product || !product.variants) return 0;

    const defaultVariant =
      product.variants.find((v: any) => v.isDefault) || product.variants[0];
    if (!defaultVariant) return 0;

    const subtotal = defaultVariant.price * quantity;
    const shipping = 0;
    const tax = Math.round(subtotal * 0.18);
    return subtotal + shipping + tax;
  };

  const orderAmount = calculateOrderAmount();

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find((addr: any) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    }
  }, [addresses]);

  if (productLoading) {
    return <BuyNowSkeleton />;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BuyNowHeader
        productSlug={productSlug || ""}
        productName={product.name}
      />

      <BuyNowSteps currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {step === "address" && (
            <AddressStep
              selectedAddress={selectedAddress}
              showAddressForm={showAddressForm}
              addresses={addresses}
              onAddressSaved={handleAddressSaved}
              onCancelAddressForm={handleAddressCancel}
              onUseDefaultAddress={handleUseDefaultAddress}
              onSelectAddress={handleSelectAddress}
            />
          )}

          {step === "payment" && (
            <PaymentStep
              selectedAddress={selectedAddress}
              selectedPaymentMethod={selectedPaymentMethod}
              orderAmount={orderAmount}
              isProcessingPayment={isProcessingPayment}
              onPaymentMethodSelect={handlePaymentMethodSelect}
              onPaymentSubmit={handlePaymentSubmit}
              onBackToAddress={handleBackToAddress}
            />
          )}

          {step === "summary" && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-4">
                  Order Confirmation
                </h2>
                <p className="text-green-700 mb-4">
                  Review your order details and confirm your purchase.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleBackToPayment}>
                    Back to Payment
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary
            items={[
              {
                id: "1",
                quantity: quantity,
                price:
                  product.variants?.find((v: any) => v.isDefault)?.price ||
                  product.variants?.[0]?.price ||
                  0,
                variant: {
                  id:
                    product.variants?.find((v: any) => v.isDefault)?.id ||
                    product.variants?.[0]?.id ||
                    "1",
                  price:
                    product.variants?.find((v: any) => v.isDefault)?.price ||
                    product.variants?.[0]?.price ||
                    0,
                  attributes:
                    product.variants?.find((v: any) => v.isDefault)
                      ?.attributes || product.variants?.[0]?.attributes,
                  product: {
                    name: product.name,
                    images: product.images || [],
                  },
                },
              },
            ]}
            subtotal={orderAmount - Math.round((orderAmount / 1.18) * 0.18)}
            shipping={0}
            tax={Math.round((orderAmount / 1.18) * 0.18)}
            total={orderAmount}
            formatPrice={(priceInCents: number) =>
              `₹${(priceInCents / 100).toLocaleString("en-IN")}`
            }
          />
        </div>
      </div>
    </div>
  );
}
