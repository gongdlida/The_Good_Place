import { NOTIFICATION_MESSAGE } from '@/auth/constants';
import { useSessionStorage } from '@/api/useSessionStorage';
import { CACHING_KEY } from '@/api/constants';

const checkUserInfo = async (params: TSignUpInfo): Promise<TResponseData> => {
  const userInfo = useSessionStorage.getItem(CACHING_KEY.ALL_USERS) as TUserInfoResponse;
  const _params = Object.assign({}, params) as TSignUpPayload;
  delete _params.passwordChecked;

  const { email } = params;
  const userData = userInfo.users.find((userInfo) => userInfo.email === email);

  if (userData) {
    return await {
      status: 'ERROR',
      msg: NOTIFICATION_MESSAGE.existedAccount,
      data: null,
    };
  }
  useSessionStorage.setItem(CACHING_KEY.USER_INFO, _params);
  postUserInfo(userInfo, _params);
  return await { status: 'SUCCESS', msg: '', data: userData };
};

const postUserInfo = (userInfo: TUserInfoResponse, _params: TSignUpPayload) => {
  let _userInfo = structuredClone(userInfo);
  _userInfo.users = _userInfo.users.concat(_params);
  useSessionStorage.setItem(CACHING_KEY.ALL_USERS, _userInfo);
};

export const signUp = async (params: TSignUpInfo) => {
  try {
    return await checkUserInfo(params);
  } catch (error) {
    console.error(error);
    throw new Error('signIn');
  }
};
