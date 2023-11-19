import { useState } from 'react';
import { useInterval } from '@/hooks/useInterval';
import { ReactSVG } from 'react-svg';
import { handleImages } from '@/home/container';

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
      <div className='relative max-h-[700px]'>
        <img
          className='h-[500px] w-[1330px] rounded-lg object-cover'
          src={images[currentImage]}
        />
        <div
          className={`absolute top-[250px] flex w-full justify-between px-10 opacity-90`}
        >
          <button onClick={() => handleImages(setCurrentImage, images, 'prev')}>
            <ReactSVG
              src='/assets/icons/Tab.svg'
              beforeInjection={(svg) =>
                svg.setAttribute('class', 'w-[50px] h-[50px] bg-white rounded-full')
              }
            />
          </button>
          <button
            onClick={() => {
              handleImages(setCurrentImage, images, 'next');
            }}
          >
            <ReactSVG
              src='/assets/icons/Tab.svg'
              beforeInjection={(svg) => {
                svg.setAttribute(
                  'class',
                  'w-[50px] h-[50px] rotate-180 bg-white rounded-full',
                );
              }}
            />
          </button>
        </div>
        <div className='container absolute bottom-[-30px] flex place-content-center gap-10'>
          {images.map((_, idx) => {
            const highlight =
              currentImage === idx ? ' bg-grey-900 h-4' : 'bg-grey-500 h-3';

            return (
              <button
                onClick={() => {
                  setCurrentImage(idx);
                }}
                key={`carousel_${idx}`}
              >
                <div className={`h-4 w-4 rounded-lg ${highlight}`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
