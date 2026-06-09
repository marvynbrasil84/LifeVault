import { useState, type FormEvent } from 'react';
import { useAuthController } from '../hooks/useAuthController';

interface ForgotPasswordViewProps {
  onNavigateLogin: () => void;
}

export function ForgotPasswordView({ onNavigateLogin }: ForgotPasswordViewProps) {
  const { forgotPassword, isLoading, error } = useAuthController();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await forgotPassword({ email });
      setSent(true);
    } catch {
      // error is already set in the store
    }
  };

  if (sent) {
    return (
      <div>
        <h1>Revisa tu correo</h1>
        <p>
          Si el email está registrado, recibirás un enlace de recuperación.
        </p>
        <button onClick={onNavigateLogin}>Volver al inicio de sesión</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Recuperar contraseña</h1>
      <p>
        Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="forgot-email">Email</label>
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            disabled={isLoading}
          />
        </div>

        {error && <div>{error}</div>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
        </button>
      </form>

      <button onClick={onNavigateLogin} disabled={isLoading}>
        Volver al inicio de sesión
      </button>
    </div>
  );
}
