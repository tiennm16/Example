export interface ReqresUser {
  id: string;
  email: string;
  avatar: string;
}

export type ReqresGetUserResult = {
  data: ReqresUser;
};

export type ReqresUserPaginationResult = {
  page: number;
  data: ReqresUser[];
};
