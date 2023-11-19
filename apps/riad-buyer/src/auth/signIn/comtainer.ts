import type { UseFormSetError, UseFormSetFocus, UseFormSetValue } from 'react-hook-form';
import type { NavigateFunction } from 'react-router-dom';
import { PATH } from '@/routes/constants';
import { signIn } from '@/auth/signIn/api';

export const _signIn = async (
  params: TSignInInfo,
  setError: UseFormSetError<TSignInInfo>,
  setValue: UseFormSetValue<TSignInInfo>,
  setFocus: UseFormSetFocus<TSignInInfo>,
  navigator: NavigateFunction,
) => {
  const res = await signIn(params);
  if (res.status === 'ERROR') {
    setFocus('email');
    ['email', 'password'].forEach((key) => setValue(key as keyof TSignInInfo, ''));

    return setError('email', { message: res.msg });
  }
  return navigator(PATH.MAIN);
};
