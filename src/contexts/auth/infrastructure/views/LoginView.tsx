import { useState, type FormEvent } from 'react';
import { useAuthController } from '../hooks/useAuthController';

interface LoginViewProps {
  onNavigateRegister: () => void;
  onNavigateForgotPassword: () => void;
  onNavigateDashboard: () => void;
}

export function LoginView({
  onNavigateRegister,
  onNavigateForgotPassword,
  onNavigateDashboard,
}: LoginViewProps) {
  const { login, isLoading, error } = useAuthController();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      onNavigateDashboard();
    } catch {
      // error is already set in the store
    }
  };

  return (
    <div>
      <h1>Iniciar sesión en LifeVault</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="login-password">Contraseña</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            disabled={isLoading}
          />
        </div>

        {error && <div>{error}</div>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>

      <div>
        <button onClick={onNavigateForgotPassword} disabled={isLoading}>
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <p>
        ¿No tienes cuenta?{' '}
        <button onClick={onNavigateRegister} disabled={isLoading}>
          Regístrate
        </button>
      </p>
    </div>
  );
}
