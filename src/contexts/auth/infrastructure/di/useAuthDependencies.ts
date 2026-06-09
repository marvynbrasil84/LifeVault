import { useContext } from 'react';
import { AuthDependencyContext } from './AuthDependencyContext';
import type { AuthDependencies } from './AuthDependencyContext';

export function useAuthDependencies(): AuthDependencies {
  const context = useContext(AuthDependencyContext);
  if (!context) {
    throw new Error(
      'useAuthDependencies debe usarse dentro de AuthDependencyProvider',
    );
  }
  return context;
}
