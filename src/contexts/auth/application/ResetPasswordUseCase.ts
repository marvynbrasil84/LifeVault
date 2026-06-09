import { User } from '../domain/models/User';
import type { ResetPasswordInput } from '../domain/models/User';
import type { AuthRepository } from '../domain/ports/AuthRepository';

export class ResetPasswordUseCase {
  authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(input: ResetPasswordInput): Promise<void> {
    User.validateResetPasswordInput(input);
    await this.authRepository.resetPassword(input.token, input.password);
  }
}
