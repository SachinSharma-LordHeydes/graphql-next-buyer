import { Truck, RotateCcw, Shield } from "lucide-react";

interface DeliveryInfoProps {
  warranty: string;
}

export default function DeliveryInfo({ warranty }: DeliveryInfoProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Truck className="w-5 h-5 text-green-600" />
        <span className="text-sm">Free delivery by tomorrow</span>
      </div>
      <div className="flex items-center gap-3">
        <RotateCcw className="w-5 h-5 text-blue-600" />
        <span className="text-sm">7 days replacement policy</span>
      </div>
      <div className="flex items-center gap-3">
        <Shield className="w-5 h-5 text-purple-600" />
        <span className="text-sm">{warranty || "Warranty information available"}</span>
      </div>
    </div>
  );
}
