import { type FC } from 'react';
import { useCounterController } from './useCounterController';

export const CounterView: FC = () => {
  const { value, isLoading, increment, decrement } = useCounterController();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Contador Hexagonal</h2>
      <div style={{ fontSize: '3rem', margin: '20px 0' }}>
        {isLoading ? 'Cargando...' : value}
      </div>
      <div>
        <button onClick={decrement} disabled={isLoading} style={{ marginRight: '10px' }}>
          Restar
        </button>
        <button onClick={increment} disabled={isLoading}>
          Sumar
        </button>
      </div>
    </div>
  );
};
