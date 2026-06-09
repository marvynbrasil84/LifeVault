import { useMemo, type FC } from 'react';
import { CounterDependencyProvider } from './contexts/counter/infrastructure/di/CounterDependencyContext';
import { LocalStorageCounterRepository } from './contexts/counter/infrastructure/adapters/LocalStorageCounterRepository';
import { CounterView } from './contexts/counter/infrastructure/ui/CounterView';
import { ErrorBoundary } from './components/ErrorBoundary';

const App: FC = () => {
  const counterRepository = useMemo(() => new LocalStorageCounterRepository(), []);

  return (
    <ErrorBoundary>
      <CounterDependencyProvider dependencies={{ counterRepository }}>
        <CounterView />
      </CounterDependencyProvider>
    </ErrorBoundary>
  );
};

export default App;
