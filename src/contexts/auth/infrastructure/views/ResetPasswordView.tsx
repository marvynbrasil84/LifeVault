import { useState, type FormEvent } from 'react';
import { useAuthController } from '../hooks/useAuthController';

interface ResetPasswordViewProps {
  token: string;
  onNavigateLogin: () => void;
}

export function ResetPasswordView({ token, onNavigateLogin }: ResetPasswordViewProps) {
  const { resetPassword, isLoading, error } = useAuthController();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await resetPassword({ token, password, confirmPassword });
      setSuccess(true);
    } catch {
      // error is already set in the store
    }
  };

  if (success) {
    return (
      <div>
        <h1>Contraseña actualizada</h1>
        <p>Tu contraseña ha sido restablecida exitosamente.</p>
        <button onClick={onNavigateLogin}>Iniciar sesión</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Nueva contraseña</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reset-password">Nueva contraseña</label>
          <input
            id="reset-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mín. 8 caracteres"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="reset-confirm">Confirmar contraseña</label>
          <input
            id="reset-confirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite la contraseña"
            disabled={isLoading}
          />
        </div>

        {error && <div>{error}</div>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Actualizando...' : 'Restablecer contraseña'}
        </button>
      </form>
    </div>
  );
}
