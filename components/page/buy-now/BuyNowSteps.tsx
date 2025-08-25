// BuyNowSteps.tsx
"use client";
import { Truck, CreditCard, ShieldCheck } from "lucide-react";

export function BuyNowSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, name: "Shipping", icon: Truck },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Review", icon: ShieldCheck },
  ];

  return (
    <div className="mb-8 flex justify-center space-x-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                isCompleted
                  ? "bg-green-500 border-green-500 text-white"
                  : isActive
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                isActive
                  ? "text-blue-500"
                  : isCompleted
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            >
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 ml-4 ${
                  isCompleted ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
