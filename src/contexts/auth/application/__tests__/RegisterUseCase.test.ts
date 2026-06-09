import { describe, it, expect, vi } from 'vitest';
import { RegisterUseCase } from '../RegisterUseCase';
import type { AuthRepository } from '../../domain/ports/AuthRepository';
import { User } from '../../domain/models/User';
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

describe('RegisterUseCase', () => {
  it('debe registrar un usuario con datos válidos', async () => {
    const repository = createMockRepository();
    const useCase = new RegisterUseCase(repository);

    const mockUser = User.create({
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      createdAt: new Date(),
    });

    vi.mocked(repository.register).mockResolvedValue({
      token: 'token-123',
      user: mockUser,
    });

    const result = await useCase.execute({
      name: 'Juan Pérez',
      email: 'JUAN@example.com',
      password: 'Password1',
      confirmPassword: 'Password1',
    });

    expect(result.token).toBe('token-123');
    expect(result.user.email).toBe('juan@example.com');
    expect(repository.register).toHaveBeenCalledWith(
      'Juan Pérez',
      'juan@example.com',
      'Password1',
    );
  });

  it('debe rechazar nombre muy corto', async () => {
    const useCase = new RegisterUseCase(createMockRepository());

    await expect(
      useCase.execute({
        name: 'A',
        email: 'test@example.com',
        password: 'Password1',
        confirmPassword: 'Password1',
      }),
    ).rejects.toThrow(AuthValidationError);
  });

  it('debe rechazar email inválido', async () => {
    const useCase = new RegisterUseCase(createMockRepository());

    await expect(
      useCase.execute({
        name: 'Juan Pérez',
        email: 'invalido',
        password: 'Password1',
        confirmPassword: 'Password1',
      }),
    ).rejects.toThrow(AuthValidationError);
  });

  it('debe rechazar contraseña débil', async () => {
    const useCase = new RegisterUseCase(createMockRepository());

    await expect(
      useCase.execute({
        name: 'Juan Pérez',
        email: 'test@example.com',
        password: 'weak',
        confirmPassword: 'weak',
      }),
    ).rejects.toThrow(AuthValidationError);
  });

  it('debe rechazar contraseñas que no coinciden', async () => {
    const useCase = new RegisterUseCase(createMockRepository());

    await expect(
      useCase.execute({
        name: 'Juan Pérez',
        email: 'test@example.com',
        password: 'Password1',
        confirmPassword: 'Password2',
      }),
    ).rejects.toThrow(AuthValidationError);
  });
});
