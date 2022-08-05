export type Email = string;
export type Token = string;

export interface GetVerificationCodePayload {
  email: Email;
}

interface AuthPayload {
  email: Email;
  password: string;
}

export interface RegisterPayload extends AuthPayload {
  verificationCode: number;
}

export interface User {
  id: string;
  created_at: Date;
  email: Email;
  avatar_url: string;
}

interface AuthResponse {
  token: Token;
  user: User;
}

export interface RegisterResponse extends AuthResponse {}

export interface LoginPayload extends AuthPayload {}

export interface LoginResponse extends AuthResponse {}

export interface AuthState {
  isLoginned: boolean;
  token: Token;
  user: User | null;
}
