import { InputFiledChip } from '@/components/inputFieldChip/AlertIcon';
import { ICON_STATUS } from '@/components/inputFieldChip/type';

import { useForm } from 'react-hook-form';
import { NOTIFICATION_MESSAGE } from '@/auth/constants';
import { Link, useNavigate } from 'react-router-dom';

import { REGEX_PATTERN } from '@/auth/constants';
import { PATH } from '@/routes/constants';
import { _signIn } from '@/auth/signIn/comtainer';
import { ErrorMessage } from '@hookform/error-message';
import { _signUp, checkFilledForm } from '@/auth/signUp/container';

export const SignUp = () => {
  const navigator = useNavigate();

  const {
    register,
    setError,
    setValue,
    setFocus,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<TSignUpInfo>({
    mode: 'onChange',
  });

  return (
    <section
      //   autoComplete='off'
      className='w-full space-y-8'
      //   onSubmit={handleSubmit((userInfo, event) => {
      //     event?.preventDefault();

      //   })}
    >
      <div id='sign_up_info' className='flex w-full flex-col justify-start space-y-8'>
        <div id='name_input' className='inputCustom-group'>
          <label className='inputCustom-label'>이름</label>
          <div className='inputCustom-textbox-wrap'>
            <input
              autoComplete='off'
              className={`inputCustom-textbox w-full ${errors?.name ? 'error' : ''}`}
              placeholder={NOTIFICATION_MESSAGE.emptyName}
              {...register('name', {
                required: NOTIFICATION_MESSAGE.emptyName,
                pattern: {
                  value: REGEX_PATTERN.name,
                  message: NOTIFICATION_MESSAGE.invalidName,
                },
              })}
            />
            <InputFiledChip
              status={errors?.name ? ICON_STATUS.ERROR : undefined}
              iconSize={5}
            />
          </div>
          <ErrorMessage
            errors={errors}
            name='name'
            render={({ message }) => <p className='inputCustom-helptext'>{message}</p>}
          />
        </div>

        <div id='email_input' className='inputCustom-group'>
          <label className='inputCustom-label'>이메일</label>
          <div className='inputCustom-textbox-wrap'>
            <input
              autoComplete='off'
              className={`inputCustom-textbox w-full ${errors?.email ? 'error' : ''}`}
              type='email'
              placeholder={NOTIFICATION_MESSAGE.emptyEmail}
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

          <ErrorMessage
            errors={errors}
            name='email'
            render={({ message }) => <p className='inputCustom-helptext'>{message}</p>}
          />
        </div>

        <div className='space-y-2'>
          <div id='password_input' className='inputCustom-group'>
            <label className='inputCustom-label'>비밀번호</label>

            <div className='inputCustom-textbox-wrap'>
              <input
                autoComplete='off'
                className={`inputCustom-textbox w-full ${
                  errors?.password ? 'error' : ''
                }`}
                type='password'
                placeholder={NOTIFICATION_MESSAGE.emtpyPassword}
                {...register('password', {
                  required: NOTIFICATION_MESSAGE.emtpyPassword,
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
            <ErrorMessage
              errors={errors}
              name='password'
              render={({ message }) => <p className='inputCustom-helptext'>{message}</p>}
            />
          </div>

          <div id='check_password_input' className='inputCustom-group'>
            <div className='inputCustom-textbox-wrap'>
              <input
                autoComplete='off'
                className={`inputCustom-textbox w-full ${
                  errors?.passwordChecked ? 'error' : ''
                }`}
                type='password'
                placeholder={NOTIFICATION_MESSAGE.emtpyCheckPassword}
                {...register('passwordChecked', {
                  required: NOTIFICATION_MESSAGE.emtpyCheckPassword,
                  validate: (value: string) =>
                    value === getValues('password') || '비밀번호가 일치하지 않아요.',
                })}
              />
              <InputFiledChip
                status={errors?.passwordChecked ? ICON_STATUS.ERROR : undefined}
                iconSize={5}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name='passwordChecked'
              render={({ message }) => <p className='inputCustom-helptext'>{message}</p>}
            />
          </div>
        </div>

        <div id='phoneNumber_input' className='inputCustom-group'>
          <label className='inputCustom-label'>핸드폰 번호</label>
          <div className='inputCustom-textbox-wrap'>
            <input
              autoComplete='off'
              className={`inputCustom-textbox w-full ${
                errors?.phoneNumber ? 'error' : ''
              }`}
              //   type='number'
              placeholder={NOTIFICATION_MESSAGE.emptyPhoneNumber}
              {...register('phoneNumber', {
                required: NOTIFICATION_MESSAGE.emptyPhoneNumber,
                pattern: {
                  // : 모든 글자 8자리 이상 입력
                  value: REGEX_PATTERN.phoneNumber,
                  message: NOTIFICATION_MESSAGE.invalidPhone,
                },
                onChange: (event) => {
                  event.target.value = event.target.value
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
                  setValue('phoneNumber', event.target.value);
                  REGEX_PATTERN.phoneNumber.test(event.target.value) &&
                    clearErrors('phoneNumber');
                },
              })}
            />
            <InputFiledChip
              status={errors?.phoneNumber ? ICON_STATUS.ERROR : undefined}
              iconSize={5}
            />
          </div>
          <ErrorMessage
            errors={errors}
            name='phoneNumber'
            render={({ message }) => <p className='inputCustom-helptext'>{message}</p>}
          />
        </div>

        <div id='businessNumber_input' className='inputCustom-group'>
          <label className='inputCustom-label'>사업자 등록번호</label>
          <div className='inputCustom-textbox-wrap'>
            <input
              autoComplete='off'
              className={`inputCustom-textbox w-full ${
                errors?.businessNumber ? 'error' : ''
              }`}
              placeholder={NOTIFICATION_MESSAGE.emtpyBusinessNumber}
              {...register('businessNumber', {
                required: NOTIFICATION_MESSAGE.emtpyBusinessNumber,
                pattern: {
                  // : 모든 글자 8자리 이상 입력
                  value: REGEX_PATTERN.businessNumber,
                  message: NOTIFICATION_MESSAGE.invalidBusinessNumber,
                },
                onChange: (event) => {
                  event.target.value = event.target.value
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{3})(\d{2})(\d{5})$/, `$1-$2-$3`);
                  setValue('businessNumber', event.target.value);
                  REGEX_PATTERN.businessNumber.test(event.target.value) &&
                    clearErrors('businessNumber');
                },
              })}
            />
            <InputFiledChip
              status={errors?.businessNumber ? ICON_STATUS.ERROR : undefined}
              iconSize={5}
            />
          </div>
          <ErrorMessage
            errors={errors}
            name='businessNumber'
            render={({ message }) => <p className='inputCustom-helptext'>{message}</p>}
          />
        </div>
      </div>

      <div className='flex w-full flex-col'>
        <button
          type='submit'
          className='btn-xl-submit-outlined w-full'
          onClick={() => {
            const userInfo = getValues();
            checkFilledForm(userInfo) && _signUp(userInfo, setError, setFocus, navigator);
          }}
        >
          회원가입
        </button>

        <div className='mt-8 flex items-center justify-center text-center'>
          <div className='text-M/Regular text-grey-700 flex gap-4'>
            이미 계정이 있으신가요?
            <Link to={PATH.SIGN_IN}>
              <p className=' text-M/Bold text-orange-500'>로그인 하러가기</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
