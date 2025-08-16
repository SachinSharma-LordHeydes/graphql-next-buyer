"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Plus,
  Minus,
  Shield,
  Truck,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

// Mock product data (same as main page)
const mockProducts = [
  {
    id: 1,
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

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number.parseInt(params.id as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  const product = mockProducts.find((p) => p.id === productId);

  // Note: useEffect removed since we're not importing it

  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const toggleWishlist = () => {
    setAddedToWishlist(!addedToWishlist);
  };

  const relatedProducts = mockProducts
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border">
              <img
                src={product.images[selectedImage] || product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                  <Star
                        key={i}
                        className={`w-5 h-5 fill-current ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">
                    ({product.rating})
                  </span>
                </div>
                <span className="text-gray-600">|</span>
                <span className="text-green-600 font-medium">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${product.originalPrice}
              </span>
              <Badge variant="destructive" className="text-sm">
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                % OFF
              </Badge>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Key Features */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={addToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {addedToCart ? "Added to Cart!" : "Add to Cart"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={toggleWishlist}
                  className={
                    addedToWishlist ? "text-red-500 border-red-500" : ""
                  }
                >
                  <Heart
                    className={`w-5 h-5 ${
                      addedToWishlist ? "fill-current" : ""
                    }`}
                  />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-sm ">Free delivery by tomorrow</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <span className="text-sm">7 days replacement policy</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-sm">{product.warranty}</span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-600">Sold by</span>
                  <p className="font-medium text-blue-600">{product.seller}</p>
                </div>
                <Button variant="outline" size="sm">
                  View Store
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="features">All Features</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-2 border-b border-gray-100"
                        >
                          <span className="font-medium text-gray-700">
                            {key}
                          </span>
                          <span className="text-gray-900">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{product.rating}</div>
                    <div className="flex justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 fill-current ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      Based on 127 reviews
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.user}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 fill-current ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                >
                  <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-medium text-sm mb-2 line-clamp-2">
                        {relatedProduct.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 fill-current ${
                                i < Math.floor(relatedProduct.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({relatedProduct.rating})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                          ${relatedProduct.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${relatedProduct.originalPrice}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
