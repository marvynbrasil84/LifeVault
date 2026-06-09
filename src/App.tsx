import { type FC } from 'react';
import { CounterDependencyProvider } from './contexts/counter/infrastructure/di/CounterDependencyContext';
import { LocalStorageCounterRepository } from './contexts/counter/infrastructure/adapters/LocalStorageCounterRepository';
import { CounterView } from './contexts/counter/infrastructure/ui/CounterView';

const counterRepository = new LocalStorageCounterRepository();

const App: FC = () => {
  return (
    <CounterDependencyProvider dependencies={{ counterRepository }}>
      <CounterView />
    </CounterDependencyProvider>
  );
};

export default App;
