"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";
import Link from "next/link";
import { AddressForm } from "@/components/page/checkout/AddressForm";
import { PaymentMethodSelector } from "@/components/page/checkout/PaymentMethodSelector";
import { PaymentForm } from "@/components/page/checkout/PaymentForm";
import { BuyNowOrderSummary } from "@/components/page/checkout/BuyNowOrderSummary";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_SLUG } from "@/client/product/product.queries";

export default function BuyNowPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productSlug = searchParams.get('product');
  const quantity = parseInt(searchParams.get('quantity') || '1');

  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get product data
  const { data: productData, loading: productLoading, error: productError } = useQuery(
    GET_PRODUCT_BY_SLUG, 
    {
      variables: { slug: productSlug },
      skip: !productSlug
    }
  );

  const product = productData?.getProductBySlug;
  const defaultVariant = product?.variants?.find((v: any) => v.isDefault) || product?.variants?.[0];

  // Calculate totals
  const itemPrice = defaultVariant ? defaultVariant.price * quantity : 0;
  const subtotal = itemPrice;
  const shipping = 0; // Free shipping
  const tax = Math.round(subtotal * 0.18); // 18% tax
  const total = subtotal + shipping + tax;

  const steps = [
    { id: 1, name: "Shipping", icon: Truck },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Review", icon: ShieldCheck },
  ];

  // Redirect if no product specified
  useEffect(() => {
    if (!productSlug && !productLoading) {
      router.push('/');
    }
  }, [productSlug, productLoading, router]);

  const handleAddressSubmit = (address: any) => {
    setShippingAddress(address);
    setCurrentStep(2);
  };

  const handlePaymentMethodSelect = (method: any) => {
    setSelectedPaymentMethod(method);
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would normally process the payment with your payment provider
    console.log("Processing Buy Now payment:", { 
      paymentData, 
      selectedPaymentMethod,
      product,
      quantity,
      shippingAddress,
      total
    });
    
    setCurrentStep(3);
    setIsProcessing(false);
  };

  const formatPrice = (priceInCents: number) => {
    return `₹${(priceInCents / 100).toLocaleString('en-IN')}`;
  };

  // Handle loading and error states
  if (productLoading) {
    return (
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're trying to purchase was not found.</p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 lg:py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Product
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold">Buy Now Checkout</h1>
        <Badge variant="outline" className="ml-auto">
          Express Checkout
        </Badge>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted 
                    ? "bg-green-500 border-green-500 text-white" 
                    : isActive 
                    ? "border-blue-500 text-blue-500" 
                    : "border-gray-300 text-gray-400"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  isActive ? "text-blue-500" : isCompleted ? "text-green-500" : "text-gray-400"
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AddressForm onSubmit={handleAddressSubmit} />
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Shipping Address Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Delivery Address
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentStep(1)}
                    >
                      Change
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {shippingAddress && (
                    <div className="text-sm space-y-1">
                      <p className="font-medium">{shippingAddress.fullName}</p>
                      <p>{shippingAddress.streetAddress}</p>
                      <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                      <p>{shippingAddress.country}</p>
                      <p className="text-gray-600">Phone: {shippingAddress.phone}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentMethodSelector 
                    onSelect={handlePaymentMethodSelect}
                    selected={selectedPaymentMethod}
                  />
                </CardContent>
              </Card>

              {/* Payment Form */}
              {selectedPaymentMethod && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PaymentForm
                      paymentMethod={selectedPaymentMethod}
                      onSubmit={handlePaymentSubmit}
                      isProcessing={isProcessing}
                      amount={total}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <Card>
              <CardContent className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-green-600">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase. You will receive a confirmation email shortly.
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
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <BuyNowOrderSummary 
            product={product}
            variant={defaultVariant}
            quantity={quantity}
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
