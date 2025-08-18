import { Button } from "@/components/ui/button";

interface SellerInfoProps {
  sellerName: string;
}

export default function SellerInfo({ sellerName }: SellerInfoProps) {
  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-600">Sold by</span>
          <p className="font-medium text-blue-600">{sellerName}</p>
        </div>
        <Button variant="outline" size="sm">
          View Store
        </Button>
      </div>
    </div>
  );
}
