import { describe, it, expect, vi } from 'vitest';
import { LoginUseCase } from '../LoginUseCase';
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

describe('LoginUseCase', () => {
  it('debe autenticar con credenciales válidas', async () => {
    const repository = createMockRepository();
    const useCase = new LoginUseCase(repository);

    const mockUser = User.create({
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      createdAt: new Date(),
    });

    vi.mocked(repository.login).mockResolvedValue({
      token: 'token-123',
      user: mockUser,
    });

    const result = await useCase.execute({
      email: 'JUAN@example.com',
      password: 'Password1',
    });

    expect(result.token).toBe('token-123');
    expect(repository.login).toHaveBeenCalledWith(
      'juan@example.com',
      'Password1',
    );
  });

  it('debe rechazar email vacío', async () => {
    const useCase = new LoginUseCase(createMockRepository());

    await expect(
      useCase.execute({ email: '', password: 'Password1' }),
    ).rejects.toThrow(AuthValidationError);
  });

  it('debe rechazar contraseña vacía', async () => {
    const useCase = new LoginUseCase(createMockRepository());

    await expect(
      useCase.execute({ email: 'test@example.com', password: '' }),
    ).rejects.toThrow(AuthValidationError);
  });

  it('debe propagar error del repositorio', async () => {
    const repository = createMockRepository();
    const useCase = new LoginUseCase(repository);

    vi.mocked(repository.login).mockRejectedValue(
      new Error('Credenciales inválidas'),
    );

    await expect(
      useCase.execute({
        email: 'test@example.com',
        password: 'Password1',
      }),
    ).rejects.toThrow('Credenciales inválidas');
  });
});
