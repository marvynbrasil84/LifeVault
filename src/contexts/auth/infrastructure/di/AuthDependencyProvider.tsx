import { type ReactNode } from 'react';
import { AuthDependencyContext } from './AuthDependencyContext';
import { FetchAuthRepository } from '../adapters/FetchAuthRepository';

export function AuthDependencyProvider({ children }: { children: ReactNode }) {
  const authRepository = new FetchAuthRepository();

  return (
    <AuthDependencyContext.Provider value={{ authRepository }}>
      {children}
    </AuthDependencyContext.Provider>
  );
}
