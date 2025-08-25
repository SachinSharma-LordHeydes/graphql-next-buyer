// BuyNowPage.tsx
"use client";
import { GET_PRODUCT_BY_SLUG } from "@/client/product/product.queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { BuyNowPayment } from "@/components/page/buy-now/BuyNowPayment";
import { BuyNowShipping } from "@/components/page/buy-now/BuyNowShipping";
import { BuyNowSteps } from "@/components/page/buy-now/BuyNowSteps";
import { BuyNowSuccess } from "@/components/page/buy-now/BuyNowSuccess";
import { OrderSummary } from "@/components/page/checkout/OrderSummary";
import { BuyNowSkeleton } from "@/components/page/buy-now/BuyNowSkeleton";

export default function BuyNowPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");
  const quantity = parseInt(searchParams.get("quantity") || "1");

  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch product
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: { slug: productSlug },
    skip: !productSlug,
  });

  const product = productData?.getProductBySlug;
  const defaultVariant =
    product?.variants?.find((v: any) => v.isDefault) || product?.variants?.[0];

  // Totals
  const itemPrice = defaultVariant ? defaultVariant.price * quantity : 0;
  const subtotal = itemPrice;
  const shipping = 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const formatPrice = (priceInCents: number) =>
    `₹${(priceInCents / 100).toLocaleString("en-IN")}`;

  // Redirect if no product
  useEffect(() => {
    if (!productSlug && !productLoading) router.push("/");
  }, [productSlug, productLoading, router]);

  if (productLoading) return <BuyNowSkeleton/>;
  if (productError || !product)
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">
          The product you're trying to purchase was not found.
        </p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );

  return (
    <div className="max-w-[1800px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Product
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold">Buy Now Checkout</h1>
        <Badge variant="outline" className="ml-auto">
          Express Checkout
        </Badge>
      </div>

      {/* Steps */}
      <BuyNowSteps currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <BuyNowShipping
              onSubmit={(address) => {
                setShippingAddress(address);
                setCurrentStep(2);
              }}
            />
          )}

          {currentStep === 2 && (
            <BuyNowPayment
              shippingAddress={shippingAddress}
              selectedPaymentMethod={selectedPaymentMethod}
              onSelectPayment={setSelectedPaymentMethod}
              onSubmit={async (paymentData) => {
                setIsProcessing(true);
                await new Promise((r) => setTimeout(r, 2000));
                console.log("Payment processed", {
                  paymentData,
                  shippingAddress,
                  product,
                  quantity,
                  total,
                });
                setIsProcessing(false);
                setCurrentStep(3);
              }}
              isProcessing={isProcessing}
              total={total}
              onChangeAddress={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && <BuyNowSuccess />}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <OrderSummary
            items={[{
              id: "1",
              quantity: quantity,
              price: defaultVariant?.price || 0,
              variant: {
                id: defaultVariant?.id || "1",
                price: defaultVariant?.price || 0,
                attributes: defaultVariant?.attributes,
                product: {
                  name: product.name,
                  images: product.images || []
                }
              }
            }]}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            formatPrice={formatPrice}
          />
        </div>
      </div>
    </div>
  );
}
