export type Email = string;
export type Token = string;

type CodePayload = {
  email: Email;
};

export type GetVerifyCodePayload = CodePayload;

type AuthPayload = {
  email: Email;
  password: string;
};

type CodeDto = {
  code: number;
};

export type RegisterPayload = AuthPayload & CodeDto;

export type UserDto = {
  id: string;
  created_at: Date;
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
  token: Token;
  user: User | null;
};

export type GetRecoveryCodePayload = CodePayload;

export type RecoveryPasswordPayload = AuthPayload & CodeDto;
