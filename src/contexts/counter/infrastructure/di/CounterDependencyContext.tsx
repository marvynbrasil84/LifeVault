/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type FC, type ReactNode } from 'react';
import type { CounterRepository } from '../../domain/ports/CounterRepository';

interface CounterDependencies {
  counterRepository: CounterRepository;
}

const CounterDependencyContext = createContext<CounterDependencies | null>(null);

export const CounterDependencyProvider: FC<{ dependencies: CounterDependencies; children: ReactNode }> = ({ dependencies, children }) => {
  return (
    <CounterDependencyContext.Provider value={dependencies}>
      {children}
    </CounterDependencyContext.Provider>
  );
};

export const useCounterDependencies = () => {
  const context = useContext(CounterDependencyContext);
  if (!context) {
    throw new Error('useCounterDependencies debe usarse dentro de un CounterDependencyProvider');
  }
  return context;
};
