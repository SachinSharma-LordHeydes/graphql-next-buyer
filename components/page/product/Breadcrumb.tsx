import Link from "next/link";

interface BreadcrumbProps {
  product: any;
}

export default function Breadcrumb({ product }: BreadcrumbProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <span className="capitalize">{product.category?.name}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>
    </div>
  );
}
