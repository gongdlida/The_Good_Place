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
  number: string;
};
