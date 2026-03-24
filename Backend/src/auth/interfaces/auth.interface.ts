export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface SignupPayload {
  email: string;
  password: string;
  role: string;
  sellerType?: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}
