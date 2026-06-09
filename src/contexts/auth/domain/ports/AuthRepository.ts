import { User } from '../models/User';

export interface AuthSession {
  token: string;
  user: User;
}

export interface AuthRepository {
  register(name: string, email: string, password: string): Promise<AuthSession>;
  login(email: string, password: string): Promise<AuthSession>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  getSession(): Promise<AuthSession | null>;
  logout(): Promise<void>;
}
