import { useState } from 'react';
import { useInterval } from '@/hooks/useInterval';

interface ICarousel {
  images: string[];
  intervalTime?: number;
}
export const Carousel = ({ images, intervalTime = 10000 }: ICarousel) => {
  const [currentImage, setCurrentImage] = useState(0);

  useInterval(() => {
    handleNext();
  }, intervalTime);

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  return (
    <div className='flex h-full w-full flex-col justify-center'>
      <div className='h-[calc(100vh-80px)] overflow-hidden'>
        <div className='relative mt-[100px] max-h-[700px] overflow-hidden'>
          <img src={images[currentImage]} alt={`이미지 ${currentImage + 1}`} />
          <div className='container absolute bottom-4 flex place-content-center gap-10'>
            {images.map((_, idx) => {
              const highlight =
                currentImage === idx ? ' bg-grey-50 h-4' : 'bg-grey-700 h-3';
              return (
                <button
                  onClick={() => {
                    setCurrentImage(idx);
                  }}
                  key={`carousel_${idx}`}
                >
                  <div className={`w-[100px] rounded-lg ${highlight}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
