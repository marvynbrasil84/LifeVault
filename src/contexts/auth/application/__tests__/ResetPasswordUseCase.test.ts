import { describe, it, expect, vi } from 'vitest';
import { ResetPasswordUseCase } from '../ResetPasswordUseCase';
import type { AuthRepository } from '../../domain/ports/AuthRepository';
import { AuthValidationError } from '../../domain/models/User';

function createMockRepository(): AuthRepository {
  return {
    register: vi.fn(),
    login: vi.fn(),
    forgotPassword: vi.fn(),
    resetPassword: vi.fn(),
    getSession: vi.fn(),
    logout: vi.fn(),
  };
}

describe('ResetPasswordUseCase', () => {
  it('debe resetear contraseña con datos válidos', async () => {
    const repository = createMockRepository();
    const useCase = new ResetPasswordUseCase(repository);

    vi.mocked(repository.resetPassword).mockResolvedValue(undefined);

    await useCase.execute({
      token: 'valid-token',
      password: 'NewPass1',
      confirmPassword: 'NewPass1',
    });

    expect(repository.resetPassword).toHaveBeenCalledWith(
      'valid-token',
      'NewPass1',
    );
  });

  it('debe rechazar token vacío', async () => {
    const useCase = new ResetPasswordUseCase(createMockRepository());

    await expect(
      useCase.execute({
        token: '',
        password: 'NewPass1',
        confirmPassword: 'NewPass1',
      }),
    ).rejects.toThrow(AuthValidationError);
  });

  it('debe rechazar contraseña débil', async () => {
    const useCase = new ResetPasswordUseCase(createMockRepository());

    await expect(
      useCase.execute({
        token: 'token',
        password: 'weak',
        confirmPassword: 'weak',
      }),
    ).rejects.toThrow(AuthValidationError);
  });

  it('debe rechazar contraseñas que no coinciden', async () => {
    const useCase = new ResetPasswordUseCase(createMockRepository());

    await expect(
      useCase.execute({
        token: 'token',
        password: 'NewPass1',
        confirmPassword: 'NewPass2',
      }),
    ).rejects.toThrow(AuthValidationError);
  });
});
