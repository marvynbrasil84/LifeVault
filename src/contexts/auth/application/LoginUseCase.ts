import { User } from '../domain/models/User';
import type { LoginInput } from '../domain/models/User';
import type { AuthRepository } from '../domain/ports/AuthRepository';

export class LoginUseCase {
  authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(input: LoginInput) {
    User.validateLoginInput(input);
    const session = await this.authRepository.login(
      input.email.trim().toLowerCase(),
      input.password,
    );
    return session;
  }
}
