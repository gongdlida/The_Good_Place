import { ICON_STATUS } from '@/components/inputFieldChip/type';

export const getIconElements = (status: ICON_STATUS | undefined) => {
  const elements = { iconPath: '', iconStyle: '' };

  if (status === ICON_STATUS.ERROR) {
    elements.iconStyle = 'fill-red-600';
    elements.iconPath = '/assets/icons/ExclamationCircle.svg';
  } else if (status === ICON_STATUS.COMPLETED) {
    elements.iconStyle = 'fill-green-600';
    elements.iconPath = '/assets/icons/Check.svg';
  }
  return elements;
};
