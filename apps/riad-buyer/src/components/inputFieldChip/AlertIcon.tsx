import { ReactSVG } from 'react-svg';
import { ICON_STATUS, TInputTimeIcon } from '@/components/inputFieldChip/type';
import { getIconElements } from '@/components/inputFieldChip/container';

interface IInputFiledChip {
  status?: ICON_STATUS;
  iconSize?: number;
  time?: TInputTimeIcon;
}

export const InputFiledChip = ({ status, iconSize = 4, time }: IInputFiledChip) => {
  const { iconPath, iconStyle } = getIconElements(status);

  return (
    <>
      {time ? (
        <span className='absolute right-4 top-3 inline-block w-1/6 text-right text-orange-500'>
          {time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}
        </span>
      ) : (
        <ReactSVG
          src={iconPath}
          className='inputCustom-icon'
          beforeInjection={(svg) => {
            svg.setAttribute('class', `w-${iconSize} h-${iconSize} ${iconStyle}`);
          }}
        />
      )}
    </>
  );
};
