import { UseFormSetError } from 'react-hook-form';
import { NOTIFICATION_MESSAGE } from '@/auth/constants';
import { NavigateFunction } from 'react-router-dom';
import { PATH } from '@/routes/constants';
import { signIn } from '@/auth/signIn/api';

export const _signIn = async (
  params: TSignInInfo,
  setError: UseFormSetError<TSignInInfo>,
  navigator: NavigateFunction,
) => {
  const response = await signIn(params);

  if (response.status === 'ERROR') {
    return setError('password', { message: NOTIFICATION_MESSAGE.invalidAccount });
  }
  return navigator(PATH.MAIN);
};
