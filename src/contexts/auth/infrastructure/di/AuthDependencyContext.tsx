import { createContext } from 'react';
import type { AuthRepository } from '../../domain/ports/AuthRepository';

export interface AuthDependencies {
  authRepository: AuthRepository;
}

export const AuthDependencyContext = createContext<AuthDependencies | null>(null);
