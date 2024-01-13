import { Carousel as FlowCarousel } from 'flowbite-react';
import React from 'react';

interface CarouselProps {
  images: string[];
  className?: string;
}

const Carousel = ({ images, className }: CarouselProps) => {
  return (
    <div className={`w-full max-w-6xl flex justify-center items-center mx-auto ${className}`}>
      <div className="w-11/12 h-[200px] sm:h-96 lg:h-[500px] rounded-lg shadow-sm shadow-accent-dark/40">
        <FlowCarousel>
          {images.map((image, index) => (
            <img
              className="rounded-lg w-full h-full object-cover object-center"
              key={index}
              src={image}
              alt="..."
              loading="lazy"
            />
          ))}
        </FlowCarousel>
      </div>
    </div>
  );
};

export default Carousel;
