type TResponseData = {
  status: TStatus;
  msg: string;
  data: null | any;
};

type TStatus = 'SUCCESS' | 'ERROR';
