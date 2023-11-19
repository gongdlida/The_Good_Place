import { signUp } from '@/auth/signUp/api';
import { PATH } from '@/routes/constants';
import type { UseFormSetError, UseFormSetFocus, UseFormSetValue } from 'react-hook-form';
import type { NavigateFunction } from 'react-router-dom';
import isTruthy from '@/util/isTruthy';
import { NOTIFICATION_MESSAGE } from '../constants';

export const checkFilledForm = (
  params: TSignUpInfo,
  setError: UseFormSetError<TSignUpInfo>,
  setValue: UseFormSetValue<TSignUpInfo>,
) => {
  const numbers = [
    {
      key: 'businessNumber' as const,
      value: params.businessNumber,
      msg: NOTIFICATION_MESSAGE.invalidBusinessNumber,
    },
    {
      key: 'phoneNumber' as const,
      value: params.phoneNumber,
      msg: NOTIFICATION_MESSAGE.invalidPhone,
    },
  ].filter((number) => number.value.includes('-') === false);

  if (numbers.length > 0) {
    numbers.forEach((number) => {
      setError(number.key, { message: number.msg });
      setValue(number.key, '');
    });
    return;
  }
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
