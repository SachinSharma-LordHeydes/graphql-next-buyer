import electronicsDeal from "@/assets/electronics-deal.jpg";
import fashionDiscount from "@/assets/fashion-discount.jpg";
import festivalSale from "@/assets/festival-sale.jpg";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: festivalSale,
    title: "Festival Sale",
    subtitle: "Up to 70% Off",
    description: "Biggest sale of the year on all categories",
  },
  {
    id: 2,
    image: electronicsDeal,
    title: "Electronics Deal",
    subtitle: "Mega Sale",
    description: "Latest gadgets at unbeatable prices",
  },
  {
    id: 3,
    image: fashionDiscount,
    title: "Fashion Discount",
    subtitle: "Up to 50% Off",
    description: "Trendy fashion for every occasion",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] max-h-[600px] overflow-hidden bg-gradient-to-r from-primary to-secondary"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className={`object-cover z-0 transition-all duration-300 ${
                isHovered ? "filter blur-sm" : ""
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
              priority
            />
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: isHovered
                  ? "rgba(0,0,0,0.7)"
                  : "rgba(0,0,0,0)",
              }}
            >
              <div className="text-center text-white px-4 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]">
                <h2
                  className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 drop-shadow-lg transition-all duration-300"
                  style={{
                    transform: isHovered ? "translateY(0)" : "translateY(20px)",
                    opacity: isHovered ? 1 : 0,
                  }}
                >
                  {slide.title}
                </h2>
                <p
                  className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2 text-secondary font-semibold drop-shadow-md transition-all duration-300"
                  style={{
                    transform: isHovered ? "translateY(0)" : "translateY(30px)",
                    opacity: isHovered ? 1 : 0,
                  }}
                >
                  {slide.subtitle}
                </p>
                <p
                  className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 max-w-[90%] mx-auto drop-shadow-md transition-all duration-300"
                  style={{
                    transform: isHovered ? "translateY(0)" : "translateY(40px)",
                    opacity: isHovered ? 1 : 0,
                  }}
                >
                  {slide.description}
                </p>
                <div
                  className="transition-all duration-300"
                  style={{
                    transform: isHovered ? "translateY(0)" : "translateY(50px)",
                    opacity: isHovered ? 1 : 0,
                  }}
                >
                  <Button className="btn-hero text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2 sm:py-3 bg-white text-black hover:bg-gray-200">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-2 sm:p-3 z-10"
      >
        <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
      <Button
        variant="ghost"
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-2 sm:p-3 z-10"
      >
        <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
