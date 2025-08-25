// hooks/useBuyNow.ts
import { useState } from "react";

export function useBuyNow() {
  const [step, setStep] = useState<"address" | "payment" | "summary">("address");
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleAddressSaved = (newAddress: any) => {
    setSelectedAddress(newAddress);
    setStep("payment");
    setShowAddressForm(false);
  };

  const handleAddressCancel = () => {
    // Reset to address selection mode
    setSelectedAddress(null);
    setShowAddressForm(false);
  };

  const handleUseDefaultAddress = () => {
    setStep("payment");
  };

  const handleSelectAddress = (address: any) => {
    setSelectedAddress(address);
    // Don't auto-advance, let user review and confirm
  };

  const handlePaymentMethodSelect = (method: any) => {
    setSelectedPaymentMethod(method);
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    setIsProcessingPayment(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessingPayment(false);
    setStep("summary");
  };

  const handleBackToAddress = () => {
    setStep("address");
  };

  const handleBackToPayment = () => {
    setStep("payment");
  };

  return {
    step,
    selectedAddress,
    showAddressForm,
    selectedPaymentMethod,
    isProcessingPayment,
    setSelectedAddress,
    setShowAddressForm,
    handleAddressSaved,
    handleAddressCancel,
    handleUseDefaultAddress,
    handleSelectAddress,
    handlePaymentMethodSelect,
    handlePaymentSubmit,
    handleBackToAddress,
    handleBackToPayment,
  };
}