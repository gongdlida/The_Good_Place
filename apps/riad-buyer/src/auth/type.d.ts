type TSignInInfo = {
  email: string;
  password: string;
};

type TUserInfoResponse = {
  users: TUserInfo[];
};

type TUserInfo = {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  businessNumber: string;
};

type TSignUpInfo = {
  email: string;
  name: string;
  password: string;
  passwordChecked: string;
  phoneNumber: string;
  businessNumber: string;
};

type TSignUpPayload = {
  email: string;
  name: string;
  password: string;
  passwordChecked?: string;
  phoneNumber: string;
  businessNumber: string;
};
