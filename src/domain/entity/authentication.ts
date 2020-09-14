export interface SignInResult {
  token: string;
  fromLocal: boolean;
}

export interface Credential {
  email: string;
  password: string;
}
