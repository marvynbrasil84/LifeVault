import { describe, it, expect, vi } from 'vitest';
import { ForgotPasswordUseCase } from '../ForgotPasswordUseCase';
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

describe('ForgotPasswordUseCase', () => {
  it('debe solicitar reseteo con email válido', async () => {
    const repository = createMockRepository();
    const useCase = new ForgotPasswordUseCase(repository);

    vi.mocked(repository.forgotPassword).mockResolvedValue(undefined);

    await useCase.execute({ email: 'JUAN@example.com' });

    expect(repository.forgotPassword).toHaveBeenCalledWith('juan@example.com');
  });

  it('debe rechazar email inválido', async () => {
    const useCase = new ForgotPasswordUseCase(createMockRepository());

    await expect(
      useCase.execute({ email: 'invalido' }),
    ).rejects.toThrow(AuthValidationError);
  });
});
