export interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
  confirmPassword: string;
}

export class AuthValidationError extends Error {
  field?: string;

  constructor(message: string, field?: string) {
    super(message);
    this.name = 'AuthValidationError';
    this.field = field;
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly createdAt: Date;

  constructor(data: UserData) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.createdAt = data.createdAt;
    Object.freeze(this);
  }

  static create(data: UserData): User {
    return new User(data);
  }

  static validateRegisterInput(input: RegisterInput): void {
    if (!input.name || input.name.trim().length < 2) {
      throw new AuthValidationError(
        'El nombre debe tener al menos 2 caracteres.',
        'name',
      );
    }

    if (!EMAIL_REGEX.test(input.email)) {
      throw new AuthValidationError(
        'El formato del email no es válido.',
        'email',
      );
    }

    if (!PASSWORD_REGEX.test(input.password)) {
      throw new AuthValidationError(
        'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y un número.',
        'password',
      );
    }

    if (input.password !== input.confirmPassword) {
      throw new AuthValidationError(
        'Las contraseñas no coinciden.',
        'confirmPassword',
      );
    }
  }

  static validateLoginInput(input: LoginInput): void {
    if (!input.email.trim()) {
      throw new AuthValidationError('El email es requerido.', 'email');
    }
    if (!input.password) {
      throw new AuthValidationError('La contraseña es requerida.', 'password');
    }
  }

  static validateEmail(email: string): void {
    if (!EMAIL_REGEX.test(email)) {
      throw new AuthValidationError(
        'El formato del email no es válido.',
        'email',
      );
    }
  }

  static validatePassword(password: string): void {
    if (!PASSWORD_REGEX.test(password)) {
      throw new AuthValidationError(
        'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y un número.',
        'password',
      );
    }
  }

  static validateResetPasswordInput(input: ResetPasswordInput): void {
    if (!input.token) {
      throw new AuthValidationError(
        'El token de recuperación es requerido.',
        'token',
      );
    }

    User.validatePassword(input.password);

    if (input.password !== input.confirmPassword) {
      throw new AuthValidationError(
        'Las contraseñas no coinciden.',
        'confirmPassword',
      );
    }
  }
}
