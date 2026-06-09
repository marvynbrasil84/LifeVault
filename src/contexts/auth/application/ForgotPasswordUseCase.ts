import { User } from '../domain/models/User';
import type { ForgotPasswordInput } from '../domain/models/User';
import type { AuthRepository } from '../domain/ports/AuthRepository';

export class ForgotPasswordUseCase {
  authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(input: ForgotPasswordInput): Promise<void> {
    User.validateEmail(input.email);
    await this.authRepository.forgotPassword(input.email.trim().toLowerCase());
  }
}
