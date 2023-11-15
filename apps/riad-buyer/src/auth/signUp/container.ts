import { signUp } from '@/auth/signUp/api';
import { PATH } from '@/routes/constants';
import type { UseFormSetError, UseFormSetFocus } from 'react-hook-form';
import type { NavigateFunction } from 'react-router-dom';
import { isTruthy } from '@/util/isTruthy';

export const checkFilledForm = (params: TSignUpInfo) => {
  return Object.keys(params).every((key) => {
    const _key = key as keyof TSignUpInfo;
    return isTruthy(params[_key]);
  });
};

export const _signUp = async (
  params: TSignUpInfo,
  setError: UseFormSetError<TSignUpInfo>,
  setFocus: UseFormSetFocus<TSignUpInfo>,
  navigator: NavigateFunction,
) => {
  const res = await signUp(params);
  if (res.status === 'ERROR') {
    setError('email', { message: res.msg });
    setFocus('email');
    return;
  }

  navigator(PATH.MAIN);
};
