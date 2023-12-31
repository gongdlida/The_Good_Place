import { firstLetterToUpper, handleImages } from '@/catalog/catalogList/container';
import { useEffect, useState } from 'react';

import { ReactSVG } from 'react-svg';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/constants';
import formatNumber from '@/util/formatNumber';

interface ICard {
  catalog: TCatalogInfo;
  type?: 'list' | 'detail';
}

export const Card = ({ catalog, type = 'list' }: ICard) => {
  const navigator = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);
  const [tabDisplay, setTabDisplay] = useState<'flex' | 'hidden'>('hidden');
  const isListType = type === 'list';
  const cardImgStyle = isListType ? 'h-[300px] w-[310px]' : 'h-[700px] w-[700px] border';

  const images = isListType
    ? catalog.images
    : [catalog.representativeImage].concat(catalog.images);

  const imgFitStyle =
    isListType === false && currentImage === 0 ? 'object-contain' : 'object-cover';

  useEffect(() => {
    setCurrentImage(0);
  }, [catalog.Id]);

  return (
    <div
      id='catalog_card_frame'
      className={`flex w-fit flex-col gap-3 ${isListType ? 'cursor-pointer' : ''}`}
      onClick={() => {
        if (isListType) navigator(`${PATH.CATALOG_LIST}/${catalog.Id}`);
      }}
    >
      <div
        id='catalog_img'
        className='relative flex items-center'
        onMouseOut={() => setTabDisplay('hidden')}
        onMouseOver={() => setTabDisplay('flex')}
      >
        <img
          className={`${cardImgStyle}  rounded-lg ${imgFitStyle}`}
          src={images[currentImage]}
        />

        <div
          id='img_counter'
          className='container absolute bottom-4 flex place-content-center gap-2'
        >
          {images.map((_, idx) => {
            const highlight = currentImage === idx ? ' bg-white' : 'bg-grey-700';
            return (
              <button
                onClick={() => {
                  setCurrentImage(idx);
                }}
                key={`img_list_${idx}`}
              >
                <div className={`${highlight} h-[6px] w-[6px] rounded`} />
              </button>
            );
          })}
        </div>

        {isListType === false && (
          <div className='bg-grey-700 absolute bottom-4 right-0 mr-2.5 rounded-md bg-opacity-60'>
            <p className='text-grey-200 text-S/Regular px-4'>{`${currentImage + 1} / ${
              images.length
            }`}</p>
          </div>
        )}

        <div className={`absolute w-full justify-between px-3 opacity-75 ${tabDisplay}`}>
          <button
            onClick={(event) => handleImages(setCurrentImage, images, 'prev', event)}
          >
            <ReactSVG
              src='/assets/icons/Tab.svg'
              beforeInjection={(svg) =>
                svg.setAttribute(
                  'class',
                  'w-[30px] h-[30px] bg-white rounded-full shadow-[2px_2px_6px_rgba(0,0,0,0.1)]',
                )
              }
            />
          </button>
          <button
            onClick={(event) => {
              handleImages(setCurrentImage, images, 'next', event);
            }}
          >
            <ReactSVG
              src='/assets/icons/Tab.svg'
              beforeInjection={(svg) => {
                svg.setAttribute(
                  'class',
                  'w-[30px] h-[30px] rotate-180 bg-white rounded-full shadow-[2px_2px_6px_rgba(0,0,0,0.1)]',
                );
              }}
            />
          </button>
        </div>
      </div>
      {isListType && (
        <div id='catalog_info' className='text-M/Regular flex flex-col'>
          <div className='flex justify-between'>
            <p className='w-[270px] truncate'>{catalog.hotel}</p>
            <div className='flex items-center gap-0.5'>
              <ReactSVG
                src='/assets/icons/Star.svg'
                beforeInjection={(svg) =>
                  svg.setAttribute('class', 'fill-grey-600 w-4 h-4')
                }
              />
              <p>{catalog.grade}</p>
            </div>
          </div>
          <p className='w-[300px] truncate'>{catalog.productName}</p>
          <p>{firstLetterToUpper(catalog.roomType)}</p>
          <p className='text-M/Bold'>
            $ {formatNumber(catalog.price)}
            <span className='text-M/Regular'>/ night</span>
          </p>
        </div>
      )}
    </div>
  );
};
