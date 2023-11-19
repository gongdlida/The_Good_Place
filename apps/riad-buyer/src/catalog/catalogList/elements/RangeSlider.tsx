import { useEffect, useState, useRef } from 'react';
import './rangeSlider.css';
import formatNumber from '@/util/formatNumber';

interface IRangeSlider {
  min: number;
  max: number;
  onChange: Function;
  title: string;
  rangePrice: TPrice;
}

export const RangeSlider = ({ min, max, onChange, title, rangePrice }: IRangeSlider) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(rangePrice.min);
  const maxValRef = useRef(rangePrice.max);

  const range = useRef<HTMLDivElement>(null);

  const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  const rangeStyle = 'pointer-events-none absolute h-0 w-[500px] outline-none';

  return (
    <section>
      <div className='flex flex-col px-6 py-10'>
        <p className='text-XL/Bold text-start'>{title}</p>
        <div className='flex w-full items-center justify-center p-5'>
          <input
            type='range'
            min={rangePrice.min}
            max={rangePrice.max}
            value={minVal}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxVal - 1);
              setMinVal(value);
              minValRef.current = value;
            }}
            className={`${rangeStyle} thumb z-[3]`}
            style={{ zIndex: minVal > max - 100 ? '5' : '' }}
          />
          <input
            type='range'
            min={rangePrice.min}
            max={rangePrice.max}
            value={maxVal}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal + 1);
              setMaxVal(value);
              maxValRef.current = value;
            }}
            className={`${rangeStyle} thumb z-[4]`}
          />

          <div className='relative w-[500px] overflow-x-clip'>
            <div className='absolute z-[1] h-[5px] w-[500px] rounded-[3px] bg-orange-400' />
            <div
              ref={range}
              className='absolute z-[1] h-[5px] w-[500px] rounded-[3px] bg-orange-400'
            />
            <div className='text-M/Medium absolute left-0 mt-5'>
              $ {formatNumber(minVal)}
            </div>
            <div className='text-M/Medium absolute right-0 mt-5'>
              $ {formatNumber(maxVal)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
