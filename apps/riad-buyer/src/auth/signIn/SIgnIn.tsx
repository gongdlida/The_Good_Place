import { InputFiledChip } from '@/components/inputFieldChip/AlertIcon';
import { ICON_STATUS } from '@/components/inputFieldChip/type';

import { useForm } from 'react-hook-form';
import { NOTIFICATION_MESSAGE } from '@/auth/constants';
import { Link, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { useSessionStorage } from '@/api/useSessionStorage';
import user_info from '@/auth/fixtures/user.account.json';
import { CACHING_KEY } from '@/api/constants';

import { REGEX_PATTERN } from '@/auth/constants';
import { PATH } from '@/routes/constants';
import { _signIn } from '@/auth/signIn/comtainer';

export const SignIn = () => {
  const navigator = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<TSignInInfo>({
    mode: 'onChange',
  });

  useEffect(() => {
    // 로그인 구현을 위한 데이터 삽입
    const users = useSessionStorage.getItem(CACHING_KEY.ALL_USERS);
    if (users === null) useSessionStorage.setItem(CACHING_KEY.ALL_USERS, user_info);
  }, []);

  return (
    <form
      className='w-full space-y-8'
      onSubmit={handleSubmit((userInfo) =>
        _signIn(userInfo, setError, setValue, setFocus, navigator),
      )}
    >
      <section id='account_info' className='flex w-full flex-col justify-start space-y-4'>
        <div id='email_input' className='inputCustom-group'>
          <label className='inputCustom-label'>이메일</label>
          <div className='inputCustom-textbox-wrap'>
            <input
              className={`inputCustom-textbox w-full ${errors?.email ? 'error' : ''}`}
              type='email'
              placeholder='이메일'
              {...register('email', {
                required: NOTIFICATION_MESSAGE.emptyEmail,
                pattern: {
                  value: REGEX_PATTERN.eamil,
                  message: NOTIFICATION_MESSAGE.invalidEmail,
                },
              })}
            />
            <InputFiledChip
              status={errors?.email ? ICON_STATUS.ERROR : undefined}
              iconSize={5}
            />
          </div>
          {errors?.email?.message && (
            <p className='inputCustom-helptext'>{errors?.email?.message}</p>
          )}
        </div>

        <div id='password_input' className='inputCustom-group'>
          <label className='inputCustom-label'>비밀번호</label>
          <div className='inputCustom-textbox-wrap'>
            <input
              className={`inputCustom-textbox w-full ${errors?.password ? 'error' : ''}`}
              type='password'
              placeholder='비밀번호를 입력해주세요.'
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  // : 모든 글자 8자리 이상 입력
                  value: REGEX_PATTERN.password,
                  message: '비밀번호는 8자리 이상 입력해주세요.',
                },
              })}
            />
            <InputFiledChip
              status={errors?.password ? ICON_STATUS.ERROR : undefined}
              iconSize={5}
            />
          </div>
          {errors?.password?.message && (
            <p className='inputCustom-helptext'>{errors?.password?.message}</p>
          )}
        </div>
      </section>

      <div className='flex w-full flex-col gap-5'>
        <button type='submit' className='btn-xl-submit-filled w-full'>
          로그인
        </button>

        <Link to={PATH.SIGN_UP}>
          <button type='submit' className='btn-xl-submit-outlined w-full'>
            회원가입 하기
          </button>
        </Link>
      </div>
    </form>
  );
};
