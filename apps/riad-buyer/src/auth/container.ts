import { PATH } from '@/routes/constants';

export const convertPathToTitle = (pathname: string) => {
  switch (pathname) {
    case PATH.SIGN_IN:
      return '로그인';
    case PATH.SIGN_UP:
      return '회원가입';
    default:
      return '';
  }
};
