import { useCallback, useEffect } from 'react';
import { useAuthDependencies } from '../di/useAuthDependencies';
import { useAuthStore } from '../state/auth.store';
import { RegisterUseCase } from '../../application/RegisterUseCase';
import { LoginUseCase } from '../../application/LoginUseCase';
import { ForgotPasswordUseCase } from '../../application/ForgotPasswordUseCase';
import { ResetPasswordUseCase } from '../../application/ResetPasswordUseCase';
import type { RegisterInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '../../domain/models/User';

export function useAuthController() {
  const { authRepository } = useAuthDependencies();
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    setSession,
    clearSession,
    setLoading,
    setError,
  } = useAuthStore();

  useEffect(() => {
    authRepository.getSession().then((session) => {
      if (session) {
        setSession(session.user, session.token);
      }
    });
  }, [authRepository, setSession]);

  const register = useCallback(
    async (input: RegisterInput) => {
      setLoading(true);
      setError(null);
      try {
        const useCase = new RegisterUseCase(authRepository);
        const session = await useCase.execute(input);
        setSession(session.user, session.token);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error al registrar';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [authRepository, setSession, setLoading, setError],
  );

  const login = useCallback(
    async (input: LoginInput) => {
      setLoading(true);
      setError(null);
      try {
        const useCase = new LoginUseCase(authRepository);
        const session = await useCase.execute(input);
        setSession(session.user, session.token);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Email o contraseña incorrectos.';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [authRepository, setSession, setLoading, setError],
  );

  const forgotPassword = useCallback(
    async (input: ForgotPasswordInput) => {
      setLoading(true);
      setError(null);
      try {
        const useCase = new ForgotPasswordUseCase(authRepository);
        await useCase.execute(input);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error al procesar la solicitud.';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [authRepository, setLoading, setError],
  );

  const resetPassword = useCallback(
    async (input: ResetPasswordInput) => {
      setLoading(true);
      setError(null);
      try {
        const useCase = new ResetPasswordUseCase(authRepository);
        await useCase.execute(input);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error al restablecer la contraseña.';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [authRepository, setLoading, setError],
  );

  const logout = useCallback(async () => {
    await authRepository.logout();
    clearSession();
  }, [authRepository, clearSession]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    forgotPassword,
    resetPassword,
    logout,
  };
}
