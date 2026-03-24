import axios from 'axios';
import { API_BASE_URL } from '../constants';

const API_URL = `${API_BASE_URL}/auth`;

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: 'BUYER' | 'SELLER' | 'ADMIN';
    sellerType?: 'NEW' | 'USED';
    name?: string;
  };
}

export interface SignUpPayload {
  email: string;
  password: string;
  name: string;
  role: 'BUYER' | 'SELLER';
  sellerType?: 'NEW' | 'USED';
}

export interface SignInPayload {
  email: string;
  password: string;
}

class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  async signUp(payload: SignUpPayload): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/signup`, payload);
    this.setTokens(response.data);
    return response.data;
  }

  async signIn(payload: SignInPayload): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/signin`, payload);
    this.setTokens(response.data);
    return response.data;
  }

  private setTokens(data: AuthResponse) {
    localStorage.setItem(this.tokenKey, data.access_token);
    localStorage.setItem(this.userKey, JSON.stringify(data.user));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser() {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.role === role;
  }
}

export const authService = new AuthService();
