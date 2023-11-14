import { NOTIFICATION_MESSAGE } from '@/auth/constants';
import { useSessionStorage } from '@/api/useSessionStorage';
import { CACHING_KEY } from '@/api/constants';

export const URL = {
  SIGN_IN: 'get_user_info',
  SIGN_UP: 'register_user_info',
};

const checkUserInfo = async (
  url: string,
  params: TSignInInfo,
): Promise<TResponseData> => {
  const { users } = useSessionStorage.getItem(url) as TUserInfoResponse;
  const { email, password } = params;
  const userData = users.find((userInfo) => userInfo.email === email);

  if (userData && userData.password === password) {
    useSessionStorage.setItem(CACHING_KEY.USER_INFO, userData);
    return await { status: 'SUCCESS', msg: '', data: userData };
  }
  return await { status: 'ERROR', msg: NOTIFICATION_MESSAGE.invalidAccount, data: null };
};

export const signIn = async (params: TSignInInfo) => {
  try {
    return await checkUserInfo(URL.SIGN_UP, params);
  } catch (error) {
    console.error(error);
    throw new Error('signIn');
  }
};
