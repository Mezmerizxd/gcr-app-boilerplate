import { Carousel as FlowCarousel } from 'flowbite-react';
import React from 'react';

interface CarouselProps {
  images: string[];
}

export const Carousel = ({ images }: CarouselProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className=" w-11/12 h-[200px] sm:h-96 lg:h-[500px] rounded-lg shadow-md shadow-black/40">
        <FlowCarousel slideInterval={5000}>
          {images.map((image, index) => (
            <img className="rounded-lg w-full h-full object-cover object-center" key={index} src={image} alt="..." />
          ))}
        </FlowCarousel>
      </div>
    </div>
  );
};
