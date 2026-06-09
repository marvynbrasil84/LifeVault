import { useState, type FormEvent } from 'react';
import { useAuthController } from '../hooks/useAuthController';

interface RegisterViewProps {
  onNavigateLogin: () => void;
  onNavigateDashboard: () => void;
}

export function RegisterView({ onNavigateLogin, onNavigateDashboard }: RegisterViewProps) {
  const { register, isLoading, error } = useAuthController();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      await register({ name, email, password, confirmPassword });
      onNavigateDashboard();
    } catch (err) {
      if (err instanceof Error && err.message) {
        setFieldErrors({ form: err.message });
      }
    }
  };

  return (
    <div>
      <h1>Crear cuenta en LifeVault</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre completo</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            disabled={isLoading}
          />
          {fieldErrors.name && <span>{fieldErrors.name}</span>}
        </div>

        <div>
          <label htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            disabled={isLoading}
          />
          {fieldErrors.email && <span>{fieldErrors.email}</span>}
        </div>

        <div>
          <label htmlFor="reg-password">Contraseña</label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mín. 8 caracteres"
            disabled={isLoading}
          />
          {fieldErrors.password && <span>{fieldErrors.password}</span>}
        </div>

        <div>
          <label htmlFor="reg-confirm">Confirmar contraseña</label>
          <input
            id="reg-confirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite la contraseña"
            disabled={isLoading}
          />
          {fieldErrors.confirmPassword && <span>{fieldErrors.confirmPassword}</span>}
        </div>

        {error && !fieldErrors.form && <div>{error}</div>}
        {fieldErrors.form && <div>{fieldErrors.form}</div>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>

      <p>
        ¿Ya tienes cuenta?{' '}
        <button onClick={onNavigateLogin} disabled={isLoading}>
          Inicia sesión
        </button>
      </p>
    </div>
  );
}
