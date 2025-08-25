// components/page/buy-now/BuyNowHeader.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BuyNowHeaderProps {
  productSlug: string;
  productName: string;
}

export function BuyNowHeader({ productSlug, productName }: BuyNowHeaderProps) {
  return (
    <div className="mb-8">
      <Link
        href={`/product/${productSlug}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Product
      </Link>
      <h1 className="text-3xl font-bold">Buy Now</h1>
      <p className="text-muted-foreground mt-2">
        Complete your purchase for {productName}
      </p>
    </div>
  );
}