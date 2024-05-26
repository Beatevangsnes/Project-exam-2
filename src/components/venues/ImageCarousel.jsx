import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const CustomArrow = ({ className, style, onClick, direction }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2 ${direction === 'prev' ? 'left-[-40px]' : 'right-[-40px]'} z-10 cursor-pointer`}
    style={{ ...style }}
    onClick={onClick}
  >
    {direction === 'prev' ? (
      <ChevronLeftIcon className="w-10 h-10 text-gray-900" />
    ) : (
      <ChevronRightIcon className="w-10 h-10 text-gray-900" />
    )}
  </div>
);

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  return (
    <div className="relative image-carousel">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image.url}
              alt={image.alt || `Venue image ${index + 1}`}
              className="w-full h-82 object-cover rounded-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
