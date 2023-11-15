import type { UseFormSetError, UseFormSetFocus, UseFormSetValue } from 'react-hook-form';
import { NOTIFICATION_MESSAGE } from '@/auth/constants';
import { NavigateFunction } from 'react-router-dom';
import { PATH } from '@/routes/constants';
import { signIn } from '@/auth/signIn/api';

export const _signIn = async (
  params: TSignInInfo,
  setError: UseFormSetError<TSignInInfo>,
  setValue: UseFormSetValue<TSignInInfo>,
  setFocus: UseFormSetFocus<TSignInInfo>,
  navigator: NavigateFunction,
) => {
  const response = await signIn(params);
  if (response.status === 'ERROR') {
    setFocus('email');
    ['email', 'password'].forEach((key) => setValue(key as keyof TSignInInfo, ''));

    return setError('email', { message: NOTIFICATION_MESSAGE.invalidAccount });
  }
  return navigator(PATH.MAIN);
};
