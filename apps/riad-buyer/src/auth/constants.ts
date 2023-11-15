export const NOTIFICATION_MESSAGE = {
  emptyEmail: '이메일을 입력해주세요.',
  emtpyPassword: '비밀번호를 입력해주세요.',
  invalidAccount: '이메일 혹은 비밀번호가 잘못되었습니다.',
  emtpyConfirmPassword: '비밀번호 확인란을 입력해주세요',
  emptyPhoneNumber: '휴대폰 번호를 입력해주세요',
  emptyPhoneVerify: '휴대폰 인증을 완료해주세요',
  whiteSpace: '비밀번호에 공백은 사용할 수 없어요.',
  emptyTerms: '이용약관과 개인정보 수집에 동의해주세요.',
  invalidVerification: '인증번호가 올바르지 않아요',
  invalidEmail: '올바른 이메일 형식으로 입력해주세요.',
  invalidPhone: '올바른 휴대폰번호를 입력해주세요.',
  successChangePassword: '비밀번호가 정상적으로 변경되었어요.',
  invalidPasswordType: '숫자, 특수문자, 영문 포함 8자리 이상으로 입력해주세요.',
};

export const REGEX = {
  eamil:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^.{8,}$/,
};
