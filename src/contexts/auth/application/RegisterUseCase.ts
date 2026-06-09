import { User } from '../domain/models/User';
import type { RegisterInput } from '../domain/models/User';
import type { AuthRepository } from '../domain/ports/AuthRepository';

export class RegisterUseCase {
  authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(input: RegisterInput) {
    User.validateRegisterInput(input);
    const session = await this.authRepository.register(
      input.name.trim(),
      input.email.trim().toLowerCase(),
      input.password,
    );
    return session;
  }
}
