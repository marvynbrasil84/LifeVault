import { useState } from 'react';
import type { FC } from 'react';
import { AuthDependencyProvider } from './contexts/auth/infrastructure/di/AuthDependencyProvider';
import { useAuthController } from './contexts/auth/infrastructure/hooks/useAuthController';
import { LoginView } from './contexts/auth/infrastructure/views/LoginView';
import { RegisterView } from './contexts/auth/infrastructure/views/RegisterView';
import { ForgotPasswordView } from './contexts/auth/infrastructure/views/ForgotPasswordView';
import { ResetPasswordView } from './contexts/auth/infrastructure/views/ResetPasswordView';

type AuthView = 'login' | 'register' | 'forgot-password' | 'reset-password' | 'dashboard';

const AuthRouter: FC = () => {
  const [view, setView] = useState<AuthView>('login');
  const [resetToken, setResetToken] = useState<string>('');
  const { isAuthenticated, logout, user } = useAuthController();

  const navigateTo = (v: AuthView) => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (v === 'reset-password' && token) {
      setResetToken(token);
    }
    setView(v);
  };

  if (isAuthenticated || view === 'dashboard') {
    return (
      <div>
        <h1>LifeVault Dashboard</h1>
        {user && <p>Bienvenido, {user.name}</p>}
        <button onClick={() => { logout(); setView('login'); }}>Cerrar sesión</button>
      </div>
    );
  }

  switch (view) {
    case 'register':
      return (
        <RegisterView
          onNavigateLogin={() => navigateTo('login')}
          onNavigateDashboard={() => navigateTo('dashboard')}
        />
      );
    case 'forgot-password':
      return (
        <ForgotPasswordView
          onNavigateLogin={() => navigateTo('login')}
        />
      );
    case 'reset-password':
      return (
        <ResetPasswordView
          token={resetToken}
          onNavigateLogin={() => navigateTo('login')}
        />
      );
    default:
      return (
        <LoginView
          onNavigateRegister={() => navigateTo('register')}
          onNavigateForgotPassword={() => navigateTo('forgot-password')}
          onNavigateDashboard={() => navigateTo('dashboard')}
        />
      );
  }
};

const App: FC = () => {
  return (
    <AuthDependencyProvider>
      <AuthRouter />
    </AuthDependencyProvider>
  );
};

export default App;
