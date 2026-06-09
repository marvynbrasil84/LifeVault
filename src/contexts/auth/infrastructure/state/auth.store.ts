import { create } from 'zustand';
import type { User } from '../../domain/models/User';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  setSession: (user: User, token: string) => void;
  clearSession: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setSession: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
      error: null,
    }),

  clearSession: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    }),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
