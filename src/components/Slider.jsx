import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Slider = () => {
  // Banner sliding effect with manual control
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define slides with content specific to the library project
  const slides = [
    {
      title: "Welcome to the Library",
      description:
        "Explore a world of knowledge with thousands of books at your fingertips.",
      bgClass: "bg-gradient-to-r from-blue-600 to-teal-500",
    },
    {
      title: "New Arrivals",
      description:
        "Check out the latest books added to our collection and stay updated.",
      bgClass: "bg-gradient-to-r from-purple-600 to-pink-500",
    },
    {
      title: "Borrow Books Anytime",
      description:
        "Borrow books online and enjoy a seamless reading experience.",
      bgClass: "bg-gradient-to-r from-green-500 to-yellow-500",
    },
  ];

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Slide navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={`py-8 text-white ${slides[currentSlide].bgClass} relative`}>
      <div className="flex justify-center items-center h-64 md:h-96 rounded-lg overflow-hidden relative">
        <div className="text-center z-10 px-6">
          <h3 className="text-3xl md:text-4xl font-bold">
            {slides[currentSlide].title}
          </h3>
          <p className="mt-2 text-lg md:text-xl">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Manual Navigation Controls with Custom Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-4 hidden md:block rounded-full shadow-xl hover:scale-110 transition duration-300 ease-in-out"
        >
          <FaArrowLeft className="h-8 w-8 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-4 hidden md:block  rounded-full shadow-xl hover:scale-110 transition duration-300 ease-in-out"
        >
          <FaArrowRight className="h-8 w-8 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
