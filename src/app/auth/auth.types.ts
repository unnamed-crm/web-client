export type Email = string;
export type Token = string;

export type GetVerificationCodePayload = {
  email: Email;
};

type AuthPayload = {
  email: Email;
  password: string;
};

export type RegisterPayload = AuthPayload & {
  verificationCode: number;
};

export type UserDto = {
  id: string;
  created_at: string;
  email: Email;
  avatar_url: string;
};

export type User = Pick<UserDto, 'id' | 'email'> & {
  createdAt: Date;
  avatarUrl: string;
};

type AuthResponse = {
  token: Token;
  user: UserDto;
};

export type RegisterResponse = AuthResponse;

export type LoginPayload = AuthPayload;

export type LoginResponse = AuthResponse;

export type AuthState = {
  isLogin: boolean;
  token: Token;
  user: User | null;
};
