import type { AuthRepository, AuthSession } from '../../domain/ports/AuthRepository';
import { User } from '../../domain/models/User';

const STORAGE_KEY = 'lifevault_session';

export class FetchAuthRepository implements AuthRepository {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/auth') {
    this.baseUrl = baseUrl;
  }

  async register(name: string, email: string, password: string): Promise<AuthSession> {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al registrar usuario');
    }

    const data = await response.json();
    return this.toSession(data);
  }

  async login(email: string, password: string): Promise<AuthSession> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Email o contraseña incorrectos.');
    }

    const data = await response.json();
    const session = this.toSession(data);
    this.persistSession(session);
    return session;
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Error al procesar la solicitud.');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password: newPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al restablecer la contraseña.');
    }
  }

  async getSession(): Promise<AuthSession | null> {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
      const data = JSON.parse(raw);
      return this.toSession(data);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  }

  private toSession(data: { token: string; user: { id: string; name: string; email: string; createdAt: string } }): AuthSession {
    return {
      token: data.token,
      user: User.create({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        createdAt: new Date(data.user.createdAt),
      }),
    };
  }

  private persistSession(session: AuthSession): void {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        token: session.token,
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          createdAt: session.user.createdAt.toISOString(),
        },
      }),
    );
  }
}
