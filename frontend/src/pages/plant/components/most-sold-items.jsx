import React, { useState } from "react";

const Carousel = ({ items, visibleItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.floor(items.length / visibleItems))
    );
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out space-x-16"
        style={{
          transform: `translateX(-${(currentIndex * 100) / visibleItems}%)`,
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex-shrink-0 w-${100 / visibleItems}%`}
          >
            <div className="border rounded-lg p-4 shadow-md">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleBack}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full shadow-md"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-md"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
