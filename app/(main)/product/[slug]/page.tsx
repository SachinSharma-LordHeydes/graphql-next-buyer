"use client";

import { useCart } from "@/app/(main)/page";
import { ADD_TO_CART, REMOVE_FROM_CART } from "@/client/caart/cart.mutations";
import { GET_CART_PRODUCT_IDS } from "@/client/caart/cart.queries";
import { GET_PRODUCT_BY_SLUG } from "@/client/product/product.queries";
import Breadcrumb from "@/components/page/product/Breadcrumb";
import CartActions from "@/components/page/product/CartActions";
import DeliveryInfo from "@/components/page/product/DeliveryInfo";
import ProductGallery from "@/components/page/product/ProductGallery";
import ProductInfo from "@/components/page/product/ProductInfo";
import ProductPageSkeleton from "@/components/page/product/ProductPageSkeleton";
import ProductTabs from "@/components/page/product/ProductTabs";
import QuantitySelector from "@/components/page/product/QuantitySelector";
import RelatedProducts from "@/components/page/product/RelatedProducts";
import SellerInfo from "@/components/page/product/SellerInfo";
import WishlistShareButtons from "@/components/page/product/WishlistShareButtons";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@apollo/client";
import {
  Check,
  ShoppingCart,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

// Mock data constants (kept inline for simplicity, can be moved to separate file if data grows)
const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "iPhone 15 Pro Max",
    image: "/iphone-15-pro-max.png",
    images: [
      "/iphone-15-pro-max.png",
      "/iphone-15-pro-max.png",
      "/iphone-15-pro-max.png",
    ],
    rating: 4.5,
    price: 1199,
    originalPrice: 1299,
    category: "electronics",
    description:
      "The iPhone 15 Pro Max features a titanium design, A17 Pro chip, and advanced camera system with 5x telephoto zoom.",
    features: [
      "6.7-inch Super Retina XDR display",
      "A17 Pro chip with 6-core GPU",
      "Pro camera system with 48MP main camera",
      "5x telephoto zoom",
      "Action Button",
      "USB-C connector",
      "Up to 29 hours video playback",
    ],
    specifications: {
      Display: "6.7-inch Super Retina XDR",
      Chip: "A17 Pro",
      Storage: "256GB, 512GB, 1TB",
      Camera: "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      Battery: "Up to 29 hours video playback",
      "Operating System": "iOS 17",
    },
    inStock: true,
    seller: "Apple Store",
    warranty: "1 Year Limited Warranty",
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    image: "/samsung-galaxy-s24-ultra.png",
    images: [
      "/samsung-galaxy-s24-ultra.png",
      "/samsung-galaxy-s24-ultra.png",
      "/samsung-galaxy-s24-ultra.png",
    ],
    rating: 4.4,
    price: 1099,
    originalPrice: 1199,
    category: "electronics",
    description:
      "The Galaxy S24 Ultra combines cutting-edge AI features with S Pen functionality and a powerful camera system.",
    features: [
      "6.8-inch Dynamic AMOLED 2X display",
      "Snapdragon 8 Gen 3 processor",
      "200MP main camera with AI zoom",
      "Built-in S Pen",
      "5000mAh battery",
      "IP68 water resistance",
      "One UI 6.1 with Galaxy AI",
    ],
    specifications: {
      Display: "6.8-inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Gen 3",
      Storage: "256GB, 512GB, 1TB",
      Camera: "200MP Main, 50MP Periscope, 12MP Ultra Wide",
      Battery: "5000mAh with 45W fast charging",
      "Operating System": "Android 14 with One UI 6.1",
    },
    inStock: true,
    seller: "Samsung Official",
    warranty: "1 Year Manufacturer Warranty",
  },
  {
    id: 3,
    title: "MacBook Pro M3",
    image: "/macbook-pro-m3.png",
    images: [
      "/macbook-pro-m3.png",
      "/macbook-pro-m3.png",
      "/macbook-pro-m3.png",
    ],
    rating: 4.8,
    price: 1999,
    originalPrice: 2199,
    category: "electronics",
    description:
      "The MacBook Pro with M3 chip delivers exceptional performance for professionals and creators.",
    features: [
      "14-inch Liquid Retina XDR display",
      "Apple M3 chip with 8-core CPU",
      "Up to 22 hours battery life",
      "16GB unified memory",
      "512GB SSD storage",
      "Three Thunderbolt 4 ports",
      "1080p FaceTime HD camera",
    ],
    specifications: {
      Display: "14-inch Liquid Retina XDR",
      Chip: "Apple M3 with 8-core CPU",
      Memory: "16GB unified memory",
      Storage: "512GB SSD",
      Battery: "Up to 22 hours",
      "Operating System": "macOS Sonoma",
    },
    inStock: true,
    seller: "Apple Authorized Reseller",
    warranty: "1 Year Limited Warranty",
  },
  {
    id: 4,
    title: "Nike Air Max 270",
    image: "/nike-air-max-270.png",
    images: [
      "/nike-air-max-270.png",
      "/nike-air-max-270.png",
      "/nike-air-max-270.png",
    ],
    rating: 4.3,
    price: 150,
    originalPrice: 180,
    category: "fashion",
    description:
      "The Nike Air Max 270 features Nike's biggest heel Air unit yet for all-day comfort and style.",
    features: [
      "Large heel Air unit for maximum cushioning",
      "Breathable mesh upper",
      "Rubber outsole with waffle pattern",
      "Heel pull tab for easy on/off",
      "Foam midsole for lightweight comfort",
      "Available in multiple colorways",
    ],
    specifications: {
      Upper: "Mesh and synthetic materials",
      Midsole: "Foam with Air Max unit",
      Outsole: "Rubber with waffle pattern",
      Closure: "Lace-up",
      Weight: "Approximately 300g",
      Care: "Spot clean with damp cloth",
    },
    inStock: true,
    seller: "Nike Official Store",
    warranty: "2 Year Manufacturing Defect Warranty",
  },
  {
    id: 5,
    title: "Sony WH-1000XM5",
    image: "/sony-wh-1000xm5.png",
    images: [
      "/sony-wh-1000xm5.png",
      "/sony-wh-1000xm5.png",
      "/sony-wh-1000xm5.png",
    ],
    rating: 4.6,
    price: 399,
    originalPrice: 449,
    category: "electronics",
    description:
      "Industry-leading noise canceling headphones with exceptional sound quality and all-day comfort.",
    features: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Quick charge: 3 min = 3 hours playback",
      "Multipoint connection",
      "Speak-to-chat technology",
      "Touch sensor controls",
      "Premium comfort and sound",
    ],
    specifications: {
      Driver: "30mm dome type",
      "Frequency Response": "4Hz-40,000Hz",
      "Battery Life": "Up to 30 hours",
      Charging: "USB-C quick charge",
      Weight: "Approximately 250g",
      Connectivity: "Bluetooth 5.2, NFC",
    },
    inStock: true,
    seller: "Sony Electronics",
    warranty: "1 Year Limited Warranty",
  },
  {
    id: 6,
    title: "Adidas Ultraboost 22",
    image: "/adidas-ultraboost-22.png",
    images: [
      "/adidas-ultraboost-22.png",
      "/adidas-ultraboost-22.png",
      "/adidas-ultraboost-22.png",
    ],
    rating: 4.4,
    price: 180,
    originalPrice: 220,
    category: "fashion",
    description:
      "The Ultraboost 22 features responsive BOOST midsole and Primeknit upper for ultimate running comfort.",
    features: [
      "BOOST midsole for energy return",
      "Primeknit upper for adaptive fit",
      "Continental rubber outsole",
      "Linear Energy Push system",
      "Torsion System for midfoot support",
      "Made with recycled materials",
    ],
    specifications: {
      Upper: "Primeknit textile",
      Midsole: "BOOST foam",
      Outsole: "Continental rubber",
      Drop: "10mm",
      Weight: "Approximately 320g",
      Sustainability: "Made with recycled content",
    },
    inStock: true,
    seller: "Adidas Official",
    warranty: "6 Month Manufacturing Defect Warranty",
  },
];

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    user: "John D.",
    rating: 5,
    date: "2024-01-15",
    comment:
      "Excellent product! Exceeded my expectations in every way. Highly recommended.",
    verified: true,
  },
  {
    id: 2,
    user: "Sarah M.",
    rating: 4,
    date: "2024-01-10",
    comment:
      "Great quality and fast shipping. Very satisfied with my purchase.",
    verified: true,
  },
  {
    id: 3,
    user: "Mike R.",
    rating: 5,
    date: "2024-01-08",
    comment: "Amazing value for money. Works perfectly and looks great!",
    verified: false,
  },
];

type CartStatus =
  | "idle"
  | "adding"
  | "removing"
  | "added"
  | "removed"
  | "error";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [quantity, setQuantity] = useState(1);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [status, setStatus] = useState<CartStatus>("idle");
  const [isHovered, setIsHovered] = useState(false);
  const [optimisticCartItems, setOptimisticCartItems] = useState<Set<string>>(new Set());

  const { data: cartData, loading: cartLoading } = useQuery(
    GET_CART_PRODUCT_IDS,
    {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
      notifyOnNetworkStatusChange: false,
    }
  );

  const cartProductIds = useMemo(() => {
    if (!cartData?.getMyCart) return new Set<string>();
    return new Set(
      cartData.getMyCart.map((item: any) => item.variant.product.id)
    );
  }, [cartData?.getMyCart]);

  const cartCtx = useCart?.() as
    | { cartItems?: Set<string>; loading?: boolean }
    | undefined;

  const cartItems =
    cartProductIds.size > 0
      ? cartProductIds
      : cartCtx?.cartItems ?? new Set<string>();
  const finalCartLoading = cartLoading || !!cartCtx?.loading;

  useEffect(() => {
    setOptimisticCartItems(cartItems);
  }, [cartItems]);

  const {
    data: productData,
    loading: productDataLoading,
    error: productDataError,
  } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: {
      slug,
    },
  });

  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART_PRODUCT_IDS }],
    onCompleted: () => {
      setStatus("added");
      setTimeout(() => setStatus("idle"), 2000);
    },
    onError: (error) => {
      console.error("Add to cart error:", error);
      setStatus("error");
      // Revert optimistic update
      setOptimisticCartItems(cartItems);
      setTimeout(() => setStatus("idle"), 2000);
    },
  });

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [{ query: GET_CART_PRODUCT_IDS }],
    onCompleted: () => {
      setStatus("removed");
      setTimeout(() => setStatus("idle"), 2000);
    },
    onError: (error) => {
      console.error("Remove from cart error:", error);
      setStatus("error");
      // Revert optimistic update
      setOptimisticCartItems(cartItems);
      setTimeout(() => setStatus("idle"), 2000);
    },
  });

  // Extract product data safely
  const product = productData?.getProductBySlug;

  // Define these variables outside of conditional rendering
  // Use default/fallback values when data isn't available
  const averageRating = useMemo(() => {
    if (!product?.reviews?.length) return 0;
    return (
      product.reviews.reduce(
        (sum: number, review: any) => sum + review.rating,
        0
      ) / product.reviews.length
    );
  }, [product?.reviews]);

  const defaultVariant = useMemo(() => {
    if (!product?.variants) return null;
    return (
      product.variants.find((variant: any) => variant.isDefault) ||
      product.variants[0]
    );
  }, [product?.variants]);

  const inStock = useMemo(() => {
    return defaultVariant ? defaultVariant.stock > 0 : false;
  }, [defaultVariant]);

  const sellerName = useMemo(() => {
    if (!product) return "Unknown Seller";
    return (
      product.brand?.name ||
      (product.seller
        ? `${product.seller.firstName || ""} ${
            product.seller.lastName || ""
          }`.trim()
        : "Unknown Seller")
    );
  }, [product]);

  const sortedImages = useMemo(() => {
    if (!product?.images) return [];
    const images = Array.isArray(product.images)
      ? [...product.images]
      : [product.images];
    return images.sort(
      (a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    );
  }, [product?.images]);

  // Memoize computed cart values - this hook will now ALWAYS run
  const productCartData = useMemo(() => {
    const variantId = defaultVariant?.id;
    const isInCart = product
      ? optimisticCartItems.has(product.id || "")
      : false;
    const isLoading =
      status === "adding" || status === "removing" || finalCartLoading;
    const isDisabled = !variantId || isLoading || !inStock;

    return { variantId, isInCart, isLoading, isDisabled };
  }, [
    defaultVariant?.id,
    optimisticCartItems,
    product?.id,
    status,
    finalCartLoading,
    inStock,
  ]);

  const handleAdd = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (productCartData.isDisabled) return;

      // Optimistic update - immediately show as added
      setOptimisticCartItems((prev) => new Set([...prev, product.id]));
      setStatus("adding");

      try {
        await addToCart({
          variables: {
            variantId: productCartData.variantId,
            quantity: quantity,
          },
        });
      } catch (err) {
        // Error handling is done in onError callback
      }
    },
    [
      productCartData.isDisabled,
      productCartData.variantId,
      addToCart,
      product?.id,
      quantity,
    ]
  );

  const handleRemove = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (productCartData.isDisabled) return;

      // Optimistic update - immediately show as removed
      const newSet = new Set(optimisticCartItems);
      newSet.delete(product?.id || "");
      setOptimisticCartItems(newSet);
      setStatus("removing");

      try {
        await removeFromCart({
          variables: { variantId: productCartData.variantId },
        });
      } catch (err) {
        // Error handling is done in onError callback
      }
    },
    [
      productCartData.isDisabled,
      removeFromCart,
      productCartData.variantId,
      product?.id,
      optimisticCartItems,
    ]
  );

  // Button content based on status
  const getButtonContent = () => {
    switch (status) {
      case "adding":
        return {
          text: "Adding...",
          icon: <ShoppingCart className="w-5 h-5 animate-spin" />,
        };
      case "removing":
        return {
          text: "Removing...",
          icon: <X className="w-5 h-5 animate-spin" />,
        };
      case "added":
        return { text: "Added!", icon: <Check className="w-5 h-5" /> };
      case "removed":
        return { text: "Removed!", icon: <Check className="w-5 h-5" /> };
      case "error":
        return { text: "Try again", icon: <X className="w-5 h-5" /> };
      default:
        if (productCartData.isInCart) {
          return {
            text: isHovered ? "Remove from Cart" : "In Cart",
            icon: <Check className="w-5 h-5" />,
          };
        }
        return {
          text: "Add to Cart",
          icon: <ShoppingCart className="w-5 h-5" />,
        };
    }
  };

  const buttonContent = getButtonContent();

  const toggleWishlist = () => {
    setAddedToWishlist(!addedToWishlist);
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== slug && p.category === productData?.category
  ).slice(0, 4);

  // Handle loading and error states after all hooks have been called
  if (productDataLoading) {
    return <ProductPageSkeleton />;
  }

  if (productDataError) {
    return <div>Error: {productDataError.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb product={product} />

      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ProductGallery images={sortedImages} productName={product.name} />

          <div className="space-y-4">
            <ProductInfo
              product={product}
              averageRating={averageRating}
              inStock={inStock}
              defaultVariant={defaultVariant}
            />

            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            
            <div className="flex gap-4">
              <Button size="lg" className="flex-1">
                Buy Now
              </Button>
              <CartActions
                productCartData={productCartData}
                status={status}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
                buttonContent={buttonContent}
              />
              <WishlistShareButtons
                addedToWishlist={addedToWishlist}
                toggleWishlist={toggleWishlist}
              />
            </div>
            
            <DeliveryInfo warranty={product.warranty} />
            
            <SellerInfo sellerName={sellerName} />
          </div>
        </div>

        <ProductTabs averageRating={averageRating} mockReviews={mockReviews} />
        
        {relatedProducts.length > 0 && (
          <RelatedProducts relatedProducts={relatedProducts} />
        )}
      </div>
    </div>
  );
}
