import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const changeImage = (index: number) => {
    setCurrentImage(index);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full">
      <div className="relative h-96 w-full overflow-hidden">
        <AnimatePresence>
          {images.map((image, index) => (
            <motion.div
              key={image}
              className={`absolute top-0 h-full w-full ${
                index === currentImage ? "block" : "hidden"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-full w-full">
                <Image
                  src={image}
                  width={500}
                  height={500}
                  className="object-cover"
                  alt={`Carousel image ${index}`}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          className="absolute left-0 top-1/2 rounded-full bg-white bg-opacity-50 p-2"
          onClick={prevImage}
        >
          &#8249;
        </button>
        <button
          className="absolute right-0 top-1/2 rounded-full bg-white bg-opacity-50 p-2"
          onClick={nextImage}
        >
          &#8250;
        </button>
      </div>
      <div className="mt-4 flex gap-2">
        {images.map((image, index) => (
          <div
            key={image}
            className={`relative h-20 w-1/4 cursor-pointer ${
              index === currentImage ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => changeImage(index)}
          >
            <Image
              src={image}
              layout="responsive"
              width={100}
              height={100}
              objectFit="cover"
              alt={`Thumbnail image ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
